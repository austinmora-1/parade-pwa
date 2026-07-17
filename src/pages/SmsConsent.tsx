import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Public SMS opt-in / proof-of-consent page.
 *
 * Submitted to Twilio as the "Proof of consent (opt-in)" URL for toll-free
 * verification. It walks through exactly how a user consents to receive the
 * one-time verification code (the only SMS Parade sends), and surfaces every
 * disclosure carriers look for: program/sender identity, message type and
 * frequency, "message and data rates may apply", and STOP/HELP instructions.
 */
export default function SmsConsent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" className="mb-6 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <h1 className="font-display text-3xl font-bold mb-2">SMS Terms & Opt-In Consent</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 16, 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Program Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Parade ("we", "our", or "us") sends a one-time passcode (OTP) via SMS to verify
              your phone number when you create an account or sign in. This is a transactional,
              account-verification program only — we do not send marketing or promotional text
              messages through it. The verification code is the only message you will receive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How You Opt In</h2>
            <p className="text-muted-foreground leading-relaxed">
              Consent to receive the verification SMS is collected directly within the Parade
              app and web sign-up flow. No phone number is ever purchased, uploaded, or
              pre-filled — you enter it yourself. The opt-in flow is:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
              <li>You open Parade and reach the "Get started" sign-up screen.</li>
              <li>You type your own mobile phone number into the "Phone number" field.</li>
              <li>
                Directly beneath the field, you see the consent disclosure (quoted in Section 3)
                stating that tapping the button means you agree to receive a verification code
                by SMS.
              </li>
              <li>You tap <strong>"Send code"</strong>, which submits your number and triggers the SMS.</li>
              <li>You receive the one-time code and enter it to finish verifying.</li>
            </ol>

            {/* Visual reproduction of the in-app sign-up screen the user sees. */}
            <div className="mt-6 rounded-2xl border bg-muted/30 p-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-4">
                What the sign-up screen looks like
              </p>
              <div className="mx-auto max-w-xs rounded-2xl border bg-background p-5 shadow-sm">
                <p className="font-display text-lg font-semibold">Get started</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Sign up or sign in with your phone number.
                </p>
                <label className="block text-sm font-medium mb-1">Phone number</label>
                <div className="rounded-xl border px-3 py-2 text-sm text-muted-foreground mb-3">
                  +1 (555) 123-4567
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground mb-3">
                  By tapping "Send code," you agree to receive a one-time verification code from
                  Parade via SMS. Message and data rates may apply. Message frequency varies.
                  Reply STOP to opt out or HELP for help. See our{' '}
                  <span className="underline">Privacy Policy</span> and{' '}
                  <span className="underline">SMS Terms</span>.
                </p>
                <div className="rounded-xl bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground">
                  Send code
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Consent Disclosure Shown at Sign-Up</h2>
            <p className="text-muted-foreground leading-relaxed">
              The following text is displayed beneath the phone number field, immediately above
              the "Send code" button, on both the iOS app and the web sign-up screen:
            </p>
            <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground leading-relaxed">
              By tapping "Send code," you agree to receive a one-time verification code from
              Parade via SMS. Message and data rates may apply. Message frequency varies. Reply
              STOP to opt out or HELP for help. See our{' '}
              <Link to="/privacy" className="text-primary hover:underline not-italic">Privacy Policy</Link>{' '}
              and{' '}
              <Link to="/sms-consent" className="text-primary hover:underline not-italic">SMS Terms</Link>.
            </blockquote>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Consent to receive these messages is not a condition of any purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Message Content & Frequency</h2>
            <p className="text-muted-foreground leading-relaxed">
              Messages are sent only in response to your own request to verify your number, so
              frequency varies and depends entirely on how often you sign in. A typical message
              reads:
            </p>
            <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground leading-relaxed">
              Your Parade verification code is 123456. It expires in 10 minutes. Reply STOP to opt out.
            </blockquote>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Message & Data Rates</h2>
            <p className="text-muted-foreground leading-relaxed">
              Message and data rates may apply. Charges depend on your wireless plan and carrier;
              please contact your carrier for details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Opt-Out and Help</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out of the verification SMS program at any time by replying{' '}
              <strong>STOP</strong> to any message you receive from us. After you send STOP, we
              will send one confirmation message and will not send further texts. Note that
              opting out means you will no longer be able to verify your phone number to sign in.
              For help, reply <strong>HELP</strong> to any message, or contact us at{' '}
              <a href="mailto:support@helloparade.app" className="text-primary hover:underline">
                support@helloparade.app
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Mobile information collected for SMS verification is used solely to deliver the
              one-time passcode and is never sold or shared with third parties for marketing
              purposes. See our{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{' '}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this SMS program, please contact us at{' '}
              <a href="mailto:support@helloparade.app" className="text-primary hover:underline">
                support@helloparade.app
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
