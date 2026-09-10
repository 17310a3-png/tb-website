// Google Ads 全域網站代碼 + 轉換追蹤（行銷公司 2026-09-10 提供）
// 代碼本身是公開的（會出現在 HTML 裡），不算機密；env 只是方便換帳號。
export const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || 'AW-18429852534';
export const GADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL || '8KscCPu3gPIcEPb2hNRE';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** 回報一次 Google Ads 轉換（預約諮詢意圖：點 SurveyCake 表單 / LINE） */
export function reportConversion(source: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: `${GADS_ID}/${GADS_CONVERSION_LABEL}`,
    event_category: 'lead',
    event_label: source,
  });
}
