import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdBannerProps {
  slot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

const PLACEHOLDER_SLOTS = [''];

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // Don't render anything if the slot is a placeholder
  const isPlaceholder = PLACEHOLDER_SLOTS.includes(slot);

  useEffect(() => {
    if (isPlaceholder) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded (adblocker or dev mode)
    }

    // Check if ad actually rendered content
    const timer = setTimeout(() => {
      if (adRef.current && adRef.current.offsetHeight > 0) {
        setAdLoaded(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isPlaceholder]);

  // Don't render placeholder slots at all
  if (isPlaceholder) return null;

  return (
    <div className={`ad-container ${!adLoaded ? 'hidden' : ''} ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-9875484924472518"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
