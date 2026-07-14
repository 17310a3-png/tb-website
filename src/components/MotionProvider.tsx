'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/** 全站 framer-motion 設定：尊重使用者的 prefers-reduced-motion（transform 動畫停用） */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
