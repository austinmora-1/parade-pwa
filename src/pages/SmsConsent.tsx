import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
            <h2 className="text-xl font-semibold mb-3">Program Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Parade ("we", "us") sends a one-time passcode (OTP) via SMS to verify your phone
              number when you create an account or sign in. This is a transactional,
              account-verification program only — we do not send marketing or promotional text
              messages through it. The verification code is the only message you will receive.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Opt In</h2>
            <p className="text-muted-foreground leading-relaxed">
              You opt in within the Parade app and web sign-up flow. No phone number is ever
              purchased, uploaded, or pre-filled — you enter it yourself. The flow is:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
              <li>You open Parade and reach the "Get started" sign-up screen.</li>
              <li>You type your own mobile phone number into the "Phone number" field.</li>
              <li>
                Directly beneath the field you see the consent disclosure (quoted below) stating
                that tapping the button means you agree to receive a verification code by SMS.
              </li>
              <li>You tap <strong>"Send code"</strong>, which submits your number and triggers the SMS.</li>
              <li>You receive the one-time code and enter it to finish verifying.</li>
            </ol>

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
            <h2 className="text-xl font-semibold mb-3">Consent Disclosure Shown at Sign-Up</h2>
            <p className="text-muted-foreground leading-relaxed">
              The following text is displayed beneath the phone number field, immediately above
              the "Send code" button, on both the iOS app and the web sign-up screen:
            </p>
            <blockquote className="mt-2 border-l-4 border-primary pl-4 italic text-muted-foreground leading-relaxed">
              By tapping "Send code," you agree to receive a one-time verification code from
              Parade via SMS. Message and data rates may apply. Message frequency varies. Reply
              STOP to opt out or HELP for help. See our{' '}
              <a href="/privacy" className="text-primary underline not-italic">Privacy Policy</a>{' '}
              and{' '}
              <a href="/sms-consent" className="text-primary underline not-italic">SMS Terms</a>.
            </blockquote>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Consent to receive these messages is not a condition of any purchase or of using
              Parade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Message Content & Frequency</h2>
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
            <h2 className="text-xl font-semibold mb-3">Message and Data Rates</h2>
            <p className="text-muted-foreground leading-relaxed">
              Message and data rates may apply. Parade does not charge for SMS messages, but your
              mobile carrier's standard messaging rates will apply. Contact your carrier for
              pricing details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Opt Out</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can opt out at any time by replying <strong>STOP</strong> to any message you
              receive from us. After you send STOP, we will send one confirmation message and you
              will no longer receive SMS messages from Parade. Note that opting out means you will
              no longer be able to verify your phone number to sign in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Help</h2>
            <p className="text-muted-foreground leading-relaxed">
              For help, reply <strong>HELP</strong> to any message, or email us at <a href="mailto:support@helloparade.app" className="text-primary underline">support@helloparade.app</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Supported Carriers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Parade's SMS program is supported by major US carriers, including AT&T, T-Mobile,
              Verizon, US Cellular, and others. Carriers are not liable for delayed or undelivered
              messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will not share, sell, or rent your mobile phone number or SMS opt-in information
              to any third party for marketing purposes. Phone numbers are used solely to deliver
              the one-time verification code described above. For more information, see our <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions about our SMS program? Email <a href="mailto:support@helloparade.app" className="text-primary underline">support@helloparade.app</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
