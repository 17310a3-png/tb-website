import Script from 'next/script';

/** Google 代碼管理工具（GTM）容器，2026-11-12 行銷顧問（c2me）提供。
 *  GA4 等追蹤碼在 GTM 後台設定，不用改網站。
 *  ⚠️ Google Ads 轉換（AW-18429852534）仍由 GoogleAds.tsx 直接發；若之後在 GTM 也設 Ads 轉換代碼會重複計算，要擇一。 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TFBT9HW7';

export default function GoogleTagManager() {
  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** 無 JS 時的備援，放在 <body> 最前面 */
export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
    </noscript>
  );
}
