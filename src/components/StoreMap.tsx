'use client';

import { useEffect, useRef } from 'react';
import type { Store } from '@/lib/stores';

/** 首頁門市據點右側的 Google 地圖（Maps JavaScript API）。
 *  - 深色主題用 styles JSON（不需 Map ID），圖釘用品牌黃 SVG
 *  - 9 間店全部放圖釘，`active` 那間放大並置中；點圖釘也會切換左邊清單（onPick）
 *  - 金鑰：NEXT_PUBLIC_GOOGLE_MAPS_KEY（瀏覽器金鑰，referrer 已限官網網域）；沒有金鑰時 Locations 會改用 iframe */

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || '';
export const mapsEnabled = !!KEY;

// 品牌深色主題：黑底、暗灰道路、水域深藍，隱藏商家 POI 與公車站，路名淺灰
const DARK_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#1c1b1b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#a9a49c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#161514' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#46433d' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#cfc9bf' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#20241f' }, { visibility: 'on' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#302e2b' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#232220' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#948f87' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#46433d' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#302e2b' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#cfc9bf' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#2a2826' }, { visibility: 'on' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f1418' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#5e6a73' }] },
];

const pinSvg = (scale: number) =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${32 * scale}" height="${42 * scale}" viewBox="0 0 32 42">
      <path d="M16 0C7.2 0 0 7.1 0 15.8 0 27.6 16 42 16 42s16-14.4 16-26.2C32 7.1 24.8 0 16 0z" fill="#F9B91B"/>
      <circle cx="16" cy="15.5" r="6" fill="#1C1B1B"/>
    </svg>`,
  );

type GMaps = typeof google.maps;
declare global {
  interface Window { __tbMapsReady?: () => void }
}
let loader: Promise<GMaps> | null = null;
/** 用官方 callback 參數等 API 就緒（頁面上另有 Google Ads 的 gtag 也會建立 window.google，不能靠 onload 猜） */
function loadMaps(): Promise<GMaps> {
  if (typeof window === 'undefined') return Promise.reject(new Error('ssr'));
  if (window.google?.maps?.Map) return Promise.resolve(window.google.maps);
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      window.__tbMapsReady = () => {
        const gm = window.google.maps;
        Promise.all([gm.importLibrary('maps'), gm.importLibrary('marker')]).then(() => resolve(gm)).catch(reject);
      };
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}&v=weekly&language=zh-TW&region=TW&loading=async&callback=__tbMapsReady`;
      s.async = true;
      s.onerror = () => reject(new Error('Google Maps 載入失敗'));
      document.head.appendChild(s);
    });
  }
  return loader;
}

export default function StoreMap({ stores, active, onPick }: { stores: Store[]; active: number; onPick: (i: number) => void }) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const onPickRef = useRef(onPick);
  onPickRef.current = onPick;

  // 建地圖 + 9 個圖釘（一次）
  useEffect(() => {
    let cancelled = false;
    loadMaps()
      .then((gm) => {
        if (cancelled || !elRef.current || mapRef.current) return;
        const map = new gm.Map(elRef.current, {
          center: { lat: stores[active].lat, lng: stores[active].lng },
          zoom: 15,
          styles: DARK_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          backgroundColor: '#1c1b1b',
        });
        mapRef.current = map;
        markersRef.current = stores.map((s, i) => {
          const m = new gm.Marker({
            map,
            position: { lat: s.lat, lng: s.lng },
            title: s.name,
            icon: { url: pinSvg(1), scaledSize: new gm.Size(32, 42), anchor: new gm.Point(16, 42) },
          });
          m.addListener('click', () => onPickRef.current(i));
          return m;
        });
      })
      .catch((e) => console.error('[StoreMap]', e));
    return () => { cancelled = true; };
    // stores 是靜態資料；active 初始值只用在第一次置中
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 切換門市：平移 + 放大該圖釘
  useEffect(() => {
    const map = mapRef.current;
    const gm = window.google?.maps;
    if (!map || !gm) return;
    const s = stores[active];
    map.panTo({ lat: s.lat, lng: s.lng });
    if ((map.getZoom() ?? 0) < 15) map.setZoom(15);
    markersRef.current.forEach((m, i) => {
      const big = i === active;
      m.setIcon({ url: pinSvg(big ? 1.4 : 1), scaledSize: new gm.Size(big ? 45 : 32, big ? 59 : 42), anchor: new gm.Point(big ? 22.5 : 16, big ? 59 : 42) });
      m.setZIndex(big ? 10 : 1);
    });
  }, [active, stores]);

  return <div ref={elRef} className="loc-gmap" role="region" aria-label={`${stores[active].name} 地圖`} />;
}
