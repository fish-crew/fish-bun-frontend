import { useCallback, useEffect, useRef } from "react";

export default function Marker({ map, location, markerType = "default" }) {
  const previousMarker = useRef(null);

  const loadKakaoMarker = useCallback(() => {
    if (map && location) {
      let imageSrc;
      switch (markerType) {
        case "user":
          imageSrc = "/assets/png/blueCat.png";
          break;
        case "new":
          imageSrc = "/assets/png/unknownWithLine.png";
          break;
        default:
          imageSrc = "/assets/webp/bun-frame-filled.webp";
      }

      const imageSize = new window.kakao.maps.Size(30, 30);
      const markerOffset = new window.kakao.maps.Point(
        imageSize.width / 2,
        imageSize.height / 2
      );

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        markerOffset
      );

      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng
      );

      const marker = new window.kakao.maps.Marker({
        map,
        position: markerPosition,
        image: markerImage,
      });

      if (previousMarker.current) {
        previousMarker.current.setMap(null);
      }
      previousMarker.current = marker;
    }
  }, [map, location, markerType]);

  useEffect(() => {
    loadKakaoMarker();
  }, [loadKakaoMarker]);
  return <></>;
}
