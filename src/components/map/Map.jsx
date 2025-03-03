import { useCallback, useEffect, useState } from "react";

import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "../../redux/slices/map";

export default function Map({
  setMap,
  location,
  zoom,
  draggable = true,
  zoomControl = true,
}) {
  // 최초 1회 렌더링을 위한 조건
  const [mapLoaded, setMapLoaded] = useState(false);

  const loadKakaoMap = useCallback(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          location?.lat ?? DEFAULT_LAT,
          location?.lng ?? DEFAULT_LNG
        ),
        level: zoom ?? DEFAULT_ZOOM,
        draggable,
        zoomControl,
      };

      const map = new window.kakao.maps.Map(container, options);
      setMap(map);
      setMapLoaded(true);
    });
  }, [location, zoom, draggable, zoomControl, setMap]);

  useEffect(() => {
    if (!mapLoaded) {
      loadKakaoMap();
    }
  }, [mapLoaded, loadKakaoMap]);

  return <div id="map" className="w-full h-full bg-black"></div>;
}
