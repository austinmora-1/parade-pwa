import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Users, MessageCircle, CheckCircle2 } from "lucide-react";
import { ConfettiBackground } from "@/components/landing/ConfettiBackground";
import { ParadeWordmark } from "@/components/ui/ParadeWordmark";
import { ElephantLoader } from "@/components/ui/ElephantLoader";
import paradeElephantLogo from "@/assets/parade-elephant-logo.png";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Invite = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading, signUp } = useAuth();
  const inviterName = searchParams.get("ref") || "A friend";
  const inviterUserId = searchParams.get("from") || null;

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/friends", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Pre-flight: check username uniqueness
    const { data: usernameAvailable, error: checkError } = await supabase.rpc(
      'check_username_available',
      { p_username: signupName.trim() }
    );
    if (checkError || !usernameAvailable) {
      toast.error(checkError ? 'Could not verify username.' : 'That username is already taken.');
      setIsLoading(false);
      return;
    }
    const { data, error } = await signUp(signupEmail, signupPassword, signupName);
    if (error) {
      const msg = error.message || '';
      if (/already registered|already exists|user.*exists/i.test(msg)) {
        toast.error('An account with this email already exists.');
      } else {
        toast.error(msg);
      }
    } else {
      const newUserId = data?.user?.id;
      if (newUserId) {
        // Fire-and-forget Loops sync
        supabase.functions.invoke('sync-user-to-loops', { body: { user_id: newUserId } }).catch(() => {});

        // Auto-create friendship with the inviter
        if (inviterUserId) {
          // Create bidirectional friendship: inviter → new user (connected)
          supabase.from('friendships').insert({
            user_id: inviterUserId,
            friend_user_id: newUserId,
            friend_name: signupName || signupEmail.split('@')[0],
            status: 'connected',
          }).then(() => {});

          // Create reciprocal: new user → inviter (connected)
          supabase.from('friendships').insert({
            user_id: newUserId,
            friend_user_id: inviterUserId,
            friend_name: decodeURIComponent(inviterName),
            status: 'connected',
          }).then(() => {});

          // Notify the inviter via push
          const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
          supabase.auth.getSession().then(({ data: sessionData }) => {
            const token = sessionData?.session?.access_token;
            if (token) {
              fetch(`https://${projectId}.supabase.co/functions/v1/send-push-notification`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user_id: inviterUserId,
                  title: '🎉 Your friend joined Parade!',
                  body: `${signupName || signupEmail.split('@')[0]} just signed up and you're now connected!`,
                  url: '/friends',
                }),
              }).catch(() => {});
            }
          });
        }
      }
      toast.success("Account created! Let's get you set up.");
      navigate("/onboarding");
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <ElephantLoader fullscreen={false} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Soft confetti backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <ConfettiBackground count={60} />
      </div>
      {/* Warm radial wash — matches Landing */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top, hsl(var(--primary-glow) / 0.25) 0%, transparent 55%), radial-gradient(ellipse at bottom right, hsl(var(--secondary) / 0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 py-12">
        {/* Logo + Wordmark */}
        <motion.div
          className="mb-6 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={paradeElephantLogo} alt="Parade" className="h-20 w-20 mb-3" />
          <ParadeWordmark size="lg" />
        </motion.div>

        {/* Invitation Header */}
        <motion.div
          className="text-center mb-6 max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1
            className="font-display text-foreground text-4xl sm:text-5xl tracking-[-0.02em] mb-2"
            style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 900 }}
          >
            You're <span className="text-primary">invited!</span>
          </h1>
          <p className="text-foreground/75 text-base">
            <span className="font-semibold text-foreground">{decodeURIComponent(inviterName)}</span> wants to make plans with you on Parade
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-md space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Benefits */}
          <div className="space-y-2.5">
            {[
              { icon: Calendar, title: "Share your availability", desc: "Let friends know when you're free" },
              { icon: Users, title: "See when friends are free", desc: "Find the perfect time to hang out" },
              { icon: MessageCircle, title: "Plan without the hassle", desc: "No more endless group chats" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-3 rounded-2xl bg-card/70 backdrop-blur-sm border border-border/60">
                <item.icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sign-up Form */}
          <Card className="border-border bg-card shadow-soft">
            <CardHeader className="text-center pb-3">
              <CardTitle className="text-lg">Create Your Account</CardTitle>
              <CardDescription>Sign up to join and start making plans</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="invite-name" className="text-sm">Display Name</Label>
                  <Input
                    id="invite-name"
                    type="text"
                    placeholder="Your name"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="invite-email" className="text-sm">Email</Label>
                  <Input
                    id="invite-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="invite-password" className="text-sm">Password</Label>
                  <Input
                    id="invite-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-base font-medium py-5 rounded-full mt-2 shadow-md"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Join the Parade'}
                </Button>
              </form>

              {/* How it works */}
              <div className="mt-5 pt-4 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-2.5 text-center">How it works:</p>
                <div className="space-y-2">
                  {[
                    "Create your free account",
                    "Set up your availability & connect calendars",
                    "Add friends and start making plans!",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <p className="text-xs text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Already have an account */}
          <p className="text-xs text-center text-muted-foreground">
            Already have an account?{' '}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </button>
          </p>

          <p className="text-xs text-center text-muted-foreground/70">
            Free to use • No credit card required
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Invite;
