import React, { useEffect, useState } from 'react';
import { ShoppingBasket } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  ...rest
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [src]);

  if (!src || errored) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-white text-[#16193a]/50 p-4 text-center ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || 'Product image'}
      >
        <ShoppingBasket className="w-8 h-8 mb-2 stroke-[1.3]" />
        <span className="text-xs font-medium tracking-tight max-w-[16ch] truncate">
          {fallbackLabel || alt || 'WACO Market'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
      {...rest}
    />
  );
}
