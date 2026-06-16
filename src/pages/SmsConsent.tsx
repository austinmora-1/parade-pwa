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

        <h1 className="font-display text-3xl font-bold mb-2">SMS Messaging Terms & Consent</h1>
        <p className="text-sm text-muted-foreground mb-8">Last updated: June 16, 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Program Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              Parade ("we", "us") operates an SMS messaging program to help users coordinate with friends. By opting in, you agree to receive SMS text messages related to your Parade account, including: friend invitations, plan invitations and reminders, RSVP updates, trip notifications, account verification codes, and account-related notifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Opt In</h2>
            <p className="text-muted-foreground leading-relaxed">
              You opt in to receive SMS messages from Parade by providing your mobile phone number during account signup, in your profile settings, or by accepting an invitation sent to your phone number. By submitting your phone number, you expressly consent to receive SMS messages from Parade at that number.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Message Frequency</h2>
            <p className="text-muted-foreground leading-relaxed">
              Message frequency varies based on your activity and the activity of your friends. You may receive messages when you are invited to plans, when plans you are part of are updated, or when reminders are due.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Message and Data Rates</h2>
            <p className="text-muted-foreground leading-relaxed">
              Message and data rates may apply. Parade does not charge for SMS messages, but your mobile carrier's standard messaging rates will apply to every message sent or received. Contact your carrier for pricing details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Opt Out</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can cancel the SMS service at any time by replying <strong>STOP</strong> to any message you receive from us. After you send STOP, we will send you a confirmation message and you will no longer receive SMS messages from Parade. You can also remove your phone number from your profile in the app at any time.
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
              Parade's SMS program is supported by major US carriers, including AT&T, T-Mobile, Verizon, Sprint, US Cellular, and others. Carriers are not liable for delayed or undelivered messages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We will not share, sell, or rent your mobile phone number or SMS opt-in information to any third party for marketing purposes. Phone numbers are used solely to deliver the messages described above. For more information about how we handle your data, see our <a href="/privacy" className="text-primary underline">Privacy Policy</a>.
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
