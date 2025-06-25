import { useEffect, useRef, useState } from 'react';

interface Building {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

interface KakaoMapProps {
  selectedBuilding: Building | null;
  buildings: Building[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

export function KakaoMap({ selectedBuilding }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [kakaoMapLoaded, setKakaoMapLoaded] = useState(false);

  // Kakao Maps SDK 로딩
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setKakaoMapLoaded(true);
      return;
    }

    if (!document.getElementById('kakao-map-script')) {
      const script = document.createElement('script');
      script.id = 'kakao-map-script';
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c23504c948ab2cfda6d653e64c974bba&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          setKakaoMapLoaded(true);
        });
      };
    }
  }, []);

  // 지도 렌더링 및 업데이트
  useEffect(() => {
    if (!kakaoMapLoaded || !mapContainer.current || !selectedBuilding) return;

    const kakao = window.kakao;
    const position = new kakao.maps.LatLng(selectedBuilding.lat, selectedBuilding.lng);

    // 지도 초기화 (최초 1회)
    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainer.current, {
        center: position,
        level: 4,
      });
    }

    // resize 이벤트 강제 발생
    kakao.maps.event.trigger(mapRef.current, 'resize');

    // 중심 좌표 이동
    mapRef.current.setCenter(position);

    // 마커 없으면 생성, 있으면 위치만 이동
    if (!markerRef.current) {
      markerRef.current = new kakao.maps.Marker({
        position,
        map: mapRef.current,
      });
    } else {
      markerRef.current.setPosition(position);
    }

    // 인포윈도우도 매번 갱신
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;font-size:12px;">${selectedBuilding.name}</div>`,
    });

    kakao.maps.event.addListener(markerRef.current, 'click', () => {
      infowindow.open(mapRef.current, markerRef.current);
    });

  }, [kakaoMapLoaded, selectedBuilding]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    ></div>
  );
}