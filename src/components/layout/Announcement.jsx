'use client';

import { useState } from 'react';
import { X, BellRing } from 'lucide-react';

export default function Announcement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 text-primary-content relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-full shrink-0 animate-pulse">
            <BellRing size={18} className="text-primary" />
          </div>
          <p className="text-sm font-medium leading-relaxed max-w-4xl">
            <strong className="font-bold text-primary mr-1">Zeweno Update:</strong>
            Form4 imtixaanaadkooda waxyar udhiman oo maadooyinka qaar waa dhameestiranyihiin oo kafaaideso asxaabtaadana lawadaag sidoo kale 8aad wax ayaa udhiman lkn websiteka save gareeso asxaabtadana lawadaag saacadaha soo aadan 8aad waa loo dhameestiraya from team zeweno.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="p-1.5 hover:bg-primary/20 rounded-lg transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X size={18} className="text-primary/70 hover:text-primary" />
        </button>
      </div>
    </div>
  );
}
