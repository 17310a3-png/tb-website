'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { reportConversion } from '@/lib/gtag';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** 轉換來源標籤，例：surveycake / line-contact / line-float */
  source: string;
  children: ReactNode;
};

/** 點擊時回報 Google Ads 轉換的 <a>。連結都是 target=_blank 開新分頁，不需延遲導頁。 */
export default function ConversionLink({ source, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        reportConversion(source);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
