'use client';

import { useEffect } from 'react';

export default function AdBanner({ slot, format = 'auto', responsive = 'true' }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden my-6 flex justify-center bg-surface/30 rounded-xl p-2 border border-border/50">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6478474654625002"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
