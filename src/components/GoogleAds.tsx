import Script from 'next/script';
import { GADS_ID } from '@/lib/gtag';

/** Google Ads 全域網站代碼（gtag.js），放在 layout 全站載入 */
export default function GoogleAds() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GADS_ID}');`}
      </Script>
    </>
  );
}
