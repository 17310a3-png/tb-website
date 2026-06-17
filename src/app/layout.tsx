import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://tb-website.zeabur.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: '統包先生 MR.TURNKEY｜讓裝修變得更清楚',
  description:
    '統包先生以住宅裝修為核心，整合設計、工程發包、施工管理與售後服務。透明流程、專業分工、安心交付。舊屋翻新、商業空間、室內裝修。',
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/assets/favicon.ico', sizes: 'any' },
      { url: '/assets/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    siteName: '統包先生 MR.TURNKEY',
    title: '統包先生 MR.TURNKEY｜讓裝修變得更清楚',
    description:
      '住宅裝修整合服務品牌。整合設計、工程發包、施工管理與售後服務，用透明流程把複雜的裝修，變成更清楚、更安心的體驗。',
    url: '/',
    images: [{ url: '/assets/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '統包先生 MR.TURNKEY｜讓裝修變得更清楚',
    description: '住宅裝修整合服務品牌。透明流程、專業分工、安心交付。',
    images: ['/assets/og-image.jpg'],
  },
  verification: {
    google: 'FsJqkETDMlGZNGcLd-bLi9GKg0f0ZUGmroBQ1-Wog5o',
  },
};

export const viewport: Viewport = {
  themeColor: '#1C1B1B',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: '統包先生 MR.TURNKEY',
  description: '住宅裝修整合服務品牌，整合設計、工程發包、施工管理與售後服務。',
  url: SITE,
  logo: `${SITE}/assets/logo/mark-white.png`,
  image: `${SITE}/assets/og-image.jpg`,
  priceRange: '$$',
  areaServed: ['台北市', '新北市', '桃園市', '新竹市', '新竹縣', '台中市'],
  knowsAbout: ['舊屋翻新', '商業空間', '室內裝修', '預售屋客變', '工程發包管理', '完工驗收售後'],
  department: [
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 新北市五股店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '新北市', streetAddress: '五股區新五路二段341號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 台北市東門店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '台北市', streetAddress: '中正區信義路二段129號2樓' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 新北市板橋店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '新北市', streetAddress: '板橋區四川路一段268號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 新竹市光復店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '新竹市', streetAddress: '東區光復路二段194巷16號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 桃園慈文店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '桃園市', streetAddress: '桃園區慈文路470號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 台中烏日店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '台中市', streetAddress: '烏日區三榮路一段75號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 台中水南店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '台中市', streetAddress: '西屯區中清路二段1409號' } },
    { '@type': 'HomeAndConstructionBusiness', name: '統包先生 桃園龜山店', address: { '@type': 'PostalAddress', addressCountry: 'TW', addressRegion: '桃園市', streetAddress: '龜山區文化七路182巷26弄1號' } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
