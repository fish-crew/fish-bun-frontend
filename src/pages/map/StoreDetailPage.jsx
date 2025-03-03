import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Map from "../../components/map/Map";
import Marker from "../../components/map/Marker";
import JornalList from "../../components/map/JornalList";

import { useDispatch } from "react-redux";
import { setRegisterStore } from "../../redux/slices/map";

import { fetchStoreDetail } from "../../api/map";
import { calculateDistance } from "../../utils";

import { useSelector } from "react-redux";

const StoreDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);
  const [store, setStore] = useState({});

  const toggleBookmark = () => {
    // TODO: bookmark 추가 api 호출
  };

  const handleModify = () => {
    dispatch(setRegisterStore(store));
    navigate("/map/register");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const distance = calculateDistance(
    store?.lat,
    store?.lng,
    userLocation?.lat,
    userLocation?.lng
  );

  useEffect(() => {
    if (id) {
      fetchStoreDetail(id).then(({ data }) => {
        setStore(data);
      });
    }
  }, [id]);

  return (
    <div className="bg-white p-2.5 overflow-auto h-full">
      <div className="flex flex-col items-start px-2 mb-1 font-hakgyo">
        <hr
          className="w-1/4 mx-auto border-2 rounded-full border-gray-400"
          onClick={handleGoBack}
        />
        <div className="flex justify-between items-start mt-3 w-full">
          <div className="flex items-center gap-1 w-4/6">
            <h2 className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-2/3">
              {store.name}
            </h2>
            <button onClick={toggleBookmark} className="min-w-[24px]">
              {/* TODO: 즐겨찾기 추가 api 호출 */}
              {true ? (
                <img
                  src="/assets/webp/cal-bun.webp"
                  alt="full-icon"
                  width={24}
                  height={24}
                />
              ) : (
                <img
                  src="/assets/webp/cal-bun-empty.webp"
                  alt="empty-icon"
                  width={24}
                  height={24}
                />
              )}
            </button>
          </div>
          <button
            className="text-xs text-gray-400 hover:text-gray-600"
            onClick={handleModify}
          >
            수정하기
          </button>
        </div>
        <p className="text-xs text-gray-800">{store.address}</p>
        <div className="flex justify-between w-full">
          <p className="text-xs text-point-color mb-3">
            탐험까지 거리 <span className="font-bold">{distance}</span>
          </p>
          <div className="bg-point-color text-white rounded-full h-fit text-[0.65rem] leading-3 font-bold px-2 py-1">{`최초 발견자 : ${
            store.nickname || "팥붕이"
          }`}</div>
        </div>

        <>
          <div className="border-2 border-dashed border-[#b7d3e4] w-full p-2">
            {store.lat && store.lng && (
              <div className="w-full h-[160px]">
                <Map
                  setMap={setMap}
                  location={{ lat: store.lat, lng: store.lng }}
                  draggable={false}
                  zoomControl={false}
                />
                <Marker
                  map={map}
                  location={{ lat: store.lat, lng: store.lng }}
                  markerType="default"
                />
              </div>
            )}
            <p className="text-xs text-gray-800 mt-2 text-start">
              {store.detail}
            </p>
          </div>
          <div className="w-full flex gap-5 items-center justify-center p-8">
            {[...Array(3)].map((_, index) => (
              <img
                key={index}
                src="/assets/webp/dots.webp"
                alt="•"
                className="text-[#1069b0] w-4 h-4"
              />
            ))}
          </div>
        </>
        <div className="flex gap-1 justify-between w-full">
          <span className="text-xs text-gray-800">해당 탐험지에 등록된</span>
          <div className="flex gap-3 text-xs text-gray-800">
            <span className="text-sz14 text-gray-800 cursor-pointer">
              일지
              <span className="text-point-color font-bold">
                {store.journal || 0}
              </span>
            </span>
            <span className="text-sz14 text-gray-800">
              즐겨찾기
              <span className="text-point-color font-bold">
                {store.likes || 0}
              </span>
            </span>
          </div>
        </div>

        {/* TODO: 리뷰 정보 확인 필요 */}
        {/* review */}
        {store.journal && <JornalList journal={store?.journal} />}
      </div>
    </div>
  );
};

export default StoreDetailPage;
