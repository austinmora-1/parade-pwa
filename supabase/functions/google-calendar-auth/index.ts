import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    // Use getUser() instead of getClaims() which doesn't exist in Supabase JS v2
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Auth error:', userError)
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 401, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    const userId = user.id

    const clientId = Deno.env.get('GOOGLE_CLIENT_ID')
    if (!clientId) {
      return new Response(JSON.stringify({ error: 'Google OAuth not configured' }), { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      })
    }

    // Optional body: { mobile?: boolean, returnUrl?: string } — when iOS
    // initiates the flow it sets mobile:true. For mobile we send the
    // OAuth callback directly to THIS project's edge function (so tokens
    // land in the same Supabase project the iOS app reads from), instead
    // of bouncing through the web PWA which may live on a different
    // project entirely.
    let mobile = false
    let returnUrl: string | null = null
    if (req.method === 'POST') {
      try {
        const body = await req.json().catch(() => ({}))
        mobile = !!body?.mobile
        if (typeof body?.returnUrl === 'string') returnUrl = body.returnUrl
      } catch {
        // ignore body parse errors
      }
    }

    const appOrigin = req.headers.get('origin') || 'https://helloparade.app'
    // Mobile callers: bypass the PWA. Land directly on this project's
    // google-calendar-callback edge function so tokens are written to
    // the same Supabase project iOS later polls for status.
    const supabaseFunctionUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/google-calendar-callback`
    const redirectUri = mobile
      ? supabaseFunctionUrl
      : `${appOrigin}/google-callback`
    // Minimal scope to reduce Google policy blocks (read events only)
    const scope = 'https://www.googleapis.com/auth/calendar.readonly'

    // Include the origin AND the redirect_uri actually sent to Google
    // — google-calendar-callback must echo the SAME value when
    // exchanging the code for tokens.
    const state = btoa(JSON.stringify({ userId, origin: appOrigin, mobile, returnUrl, redirectUri }))
    
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', clientId)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scope)
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent select_account')
    authUrl.searchParams.set('state', state)

    console.log('Generated auth URL for user:', userId, 'redirect:', redirectUri)

    return new Response(JSON.stringify({ authUrl: authUrl.toString() }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: unknown) {
    console.error('Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
