import { useState } from 'react';
import { Shield } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackLabel,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#161B28] via-[#111520] to-[#080A0F] border border-white/10 p-6 text-center ${className}`}
      >
        <Shield className="h-8 w-8 text-[#FF5500]" strokeWidth={1.75} aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-[#94A3B8]">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
