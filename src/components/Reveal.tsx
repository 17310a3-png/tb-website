'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** 進場位移方向 */
  y?: number;
  /** 延遲（秒） */
  delay?: number;
  className?: string;
  /** 包裹元素的 tag */
  as?: 'div' | 'section' | 'li';
};

/** 滾動進場動畫包裝（取代原本 IntersectionObserver fade-up） */
export default function Reveal({ children, y = 28, delay = 0, className, as = 'div' }: Props) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
