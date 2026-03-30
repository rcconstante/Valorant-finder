import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdInterstitialProps {
  onClose: () => void;
}

export default function AdInterstitial({ onClose }: AdInterstitialProps) {
  const adRef = useRef<HTMLModElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }

    // Auto-close after 5 seconds
    timerRef.current = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg mx-4 bg-surface-container p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="font-label text-[9px] text-on-surface-variant uppercase tracking-widest">
            Advertisement
          </span>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors font-headline font-bold text-sm uppercase tracking-tighter"
          >
            Skip →
          </button>
        </div>
        <div className="min-h-[250px] flex items-center justify-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-9875484924472518"
            data-ad-slot="1241588229"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
