import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ElephantLoader } from '@/components/ui/ElephantLoader';

export default function GoogleCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');

    if (error) {
      setStatus('error');
      setErrorMsg(error);
      return;
    }

    if (!code || !state) {
      setStatus('error');
      setErrorMsg('Missing authorization parameters');
      return;
    }

    // Decode state to check for mobile-initiated flow.
    // The auth edge function base64-encodes JSON: { userId, origin, mobile?, returnUrl? }
    let isMobile = false;
    let returnUrl: string | null = null;
    try {
      const decoded = JSON.parse(atob(state));
      isMobile = !!decoded.mobile;
      if (typeof decoded.returnUrl === 'string') returnUrl = decoded.returnUrl;
    } catch {
      // ignore — fall back to web redirect
    }
    const targetUrl = returnUrl || (isMobile ? 'parade://calendar-connected?ok=1' : '/settings?calendar=connected');

    // Forward to edge function
    supabase.functions
      .invoke('google-calendar-callback', {
        body: { code, state },
      })
      .then(({ data, error: fnError }) => {
        if (fnError || data?.error) {
          setStatus('error');
          setErrorMsg(fnError?.message || data?.error || 'Connection failed');
        } else {
          setStatus('success');
          // For MOBILE: iOS WKWebView silently blocks programmatic
          // `window.location.href = 'parade://...'` for custom schemes,
          // so ASWebAuthenticationSession never sees the navigation and
          // never auto-dismisses. The workaround is to synthesize a user
          // gesture by creating a hidden <a href="parade://..."> and
          // calling .click() — iOS treats this as a real link click and
          // routes the custom scheme through the scheme handler, which
          // triggers ASWebAuthSession's auto-dismiss.
          //
          // For WEB: regular SPA navigation is fine.
          setTimeout(() => {
            if (isMobile && targetUrl.startsWith('parade://')) {
              try {
                const a = document.createElement('a');
                a.href = targetUrl;
                a.rel = 'noopener';
                // Don't open in a new tab — we want the SAME WebView to
                // attempt the nav so ASWebAuthSession can intercept it.
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                // Belt-and-suspenders: try window.location too in case
                // the anchor click is also blocked on some iOS variant.
                setTimeout(() => {
                  try { window.location.href = targetUrl; } catch {}
                }, 200);
              } catch (e) {
                window.location.href = targetUrl;
              }
            } else {
              window.location.href = targetUrl;
            }
          }, isMobile ? 400 : 1500);
        }
      })
      .catch((err) => {
        setStatus('error');
        setErrorMsg(err.message || 'Connection failed');
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4 p-8">
        {status === 'loading' && (
          <>
            <ElephantLoader fullscreen={false} />
            <h1 className="text-xl font-semibold">Connecting your calendar...</h1>
            <p className="text-muted-foreground">Please wait while we finish setting up.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
            <h1 className="text-xl font-semibold">Calendar Connected!</h1>
            <p className="text-muted-foreground">Redirecting you back...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-xl font-semibold">Connection Failed</h1>
            <p className="text-muted-foreground">{errorMsg}</p>
            <a href="/settings" className="text-primary hover:underline text-sm">
              Return to Settings
            </a>
          </>
        )}
      </div>
    </div>
  );
}
