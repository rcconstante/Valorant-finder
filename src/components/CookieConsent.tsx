import { useState, useEffect } from 'react';

const CONSENT_KEY = 'quicklobby_ad_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-[90] p-4 bg-surface-container border-t-2 border-primary-container">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="font-headline font-bold text-sm text-on-surface uppercase tracking-tighter mb-1">
            This site uses cookies
          </p>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed">
            We use Google AdSense to display ads, which may place cookies on your device. By continuing, you consent to the use of cookies for advertising purposes. See our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Protocol</a> for details.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2 bg-surface-container-high text-on-surface-variant font-headline font-bold uppercase text-xs tracking-tighter hover:bg-surface-container-highest transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-primary-container text-on-primary-container font-headline font-bold uppercase text-xs tracking-tighter hover:bg-primary transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
