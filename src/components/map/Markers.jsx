import { useCallback, useEffect } from "react";

export default function Markers({ map, stores, handleSelectedMarker }) {
  const loadKakaoMarkers = useCallback(() => {
    if (map && stores) {
      stores.forEach((store) => {
        // 마커 이미지
        const imageSrc = "/assets/webp/bun-frame-filled.webp";
        const imageSize = new window.kakao.maps.Size(30, 30);

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );

        const markerPosition = new window.kakao.maps.LatLng(
          store.lat,
          store.lng
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.addListener("click", () => {
          handleSelectedMarker(store);
        });

        marker.setMap(map);
      });
    }
  }, [map, stores, handleSelectedMarker]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers]);
  return <></>;
}
