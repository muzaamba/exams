'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner({ slot, format = 'auto', responsive = 'true' }) {
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once and avoid errors in dev if no width
    if (initialized.current) return;
    
    const timeout = setTimeout(() => {
      try {
        if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true;
        }
      } catch (err) {
        console.warn('AdSense initialization skipped or failed:', err.message);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [slot]);

  return (
    <div className="w-full overflow-hidden my-6 flex justify-center bg-surface/30 rounded-xl p-2 border border-border/50 min-h-[90px]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minWidth: '250px' }}
        data-ad-client="ca-pub-6478474654625002"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

