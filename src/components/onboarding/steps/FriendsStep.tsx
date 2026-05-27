import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../OnboardingWizard';
import { Users, Share2 } from 'lucide-react';
import { ShareLinkDialog } from '@/components/share/ShareLinkDialog';
import { useAuth } from '@/hooks/useAuth';

interface FriendsStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export function FriendsStep({ data }: FriendsStepProps) {
  const { user } = useAuth();
  const [shareOpen, setShareOpen] = useState(false);

  const firstName = data.firstName?.trim() || 'A friend';

  const inviteUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set('ref', firstName);
    if (user?.id) params.set('from', user.id);
    return `${window.location.origin}/invite?${params.toString()}`;
  }, [firstName, user?.id]);

  const shareMessage = `Hey! I just joined Parade — it's a calmer way to make plans with friends. Join me:`;
  const emailSubject = `${firstName} invited you to Parade`;

  return (
    <div>
      <div className="text-center mb-4">
        <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-display text-xl font-bold mb-1">
          Invite Your Friends
        </h1>
        <p className="text-sm text-muted-foreground">
          Parade is better with friends. Share your link via iMessage, WhatsApp, or anywhere you chat.
        </p>
      </div>

      <Button
        onClick={() => setShareOpen(true)}
        size="lg"
        className="w-full gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share invite link
      </Button>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Or skip and bring people along whenever.
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-muted/50 p-2.5">
        <span className="text-sm">🎉</span>
        <p className="text-xs text-muted-foreground">
          You're all set! Click "Get Started" to start using Parade.
        </p>
      </div>

      <ShareLinkDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title="Join me on Parade"
        shareMessage={shareMessage}
        emailSubject={emailSubject}
        generateLink={async () => inviteUrl}
      />
    </div>
  );
}
