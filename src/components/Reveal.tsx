'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

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

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * 滾動進場動畫（2026-11-26 改：內容預設看得到）。
 * 伺服器輸出的 HTML 不帶 opacity:0，JS 沒載入或很慢時內容照樣顯示、不拖慢 LCP。
 * 掛載後只有「還在畫面下方」的元素才先藏起來，捲到時再淡入；已在畫面內的直接顯示，不會閃。
 */
export function useReveal<T extends Element>(y = 28, delay = 0, duration = 0.7) {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      controls.set({ opacity: 0, y });
      setArmed(true);
    }
    // 只在掛載時判斷一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (armed && inView) controls.start({ opacity: 1, y: 0, transition: { duration, delay, ease: EASE } });
  }, [armed, inView, controls, delay, duration]);

  return { ref, controls };
}

export default function Reveal({ children, y = 28, delay = 0, className, as = 'div' }: Props) {
  const { ref, controls } = useReveal<HTMLDivElement>(y, delay);
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag ref={ref} className={className} initial={false} animate={controls}>
      {children}
    </MotionTag>
  );
}
