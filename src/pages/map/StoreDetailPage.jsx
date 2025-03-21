import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import { Map, Marker, JornalList, Like } from "../../components/map";

import { useDispatch, useSelector } from "react-redux";
import { setRegisterStore } from "../../redux/slices/map";

import { fetchStoreDetail } from "../../api/map";
import { calcaulateDistanceWithUnit } from "../../utils";

const DEFAULT_STORE_NAME = "붕어빵";
const DEFAULT_NICKNAME = "팥붕이";

const StoreDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userLocation } = useSelector((state) => state.map);

  const [map, setMap] = useState(null);
  const [store, setStore] = useState({});

  const handleModify = () => {
    dispatch(setRegisterStore(store));
    navigate("/map/register");
  };

  const handleRefetch = useCallback(() => {
    fetchStoreDetail(id).then(({ data }) => {
      setStore(data);
    });
  }, [id]);

  useEffect(() => {
    if (id) {
      handleRefetch();
    }
  }, [id, handleRefetch]);

  return (
    <div className="bg-white overflow-hidden">
      <Header />
      <div className="flex flex-col items-start font-hakgyo py-2 px-4 overflow-auto h-[calc(100vh-200px)]">
        <div className="flex justify-between items-start mt-3 w-full">
          <div className="flex items-center gap-1 w-4/6">
            <h2 className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap max-w-2/3">
              {store?.name || DEFAULT_STORE_NAME}
            </h2>
            <Like store={store} refetch={handleRefetch} />
          </div>
          <button
            className="text-xs text-gray-400 hover:text-gray-600"
            onClick={handleModify}
          >
            수정하기
          </button>
        </div>
        <p className="text-xs text-gray-800">{store?.address}</p>
        <div className="flex justify-between w-full">
          <p className="text-xs text-point-color mb-3">
            탐험까지 거리
            <span className="font-bold">
              {calcaulateDistanceWithUnit(
                store?.lat,
                store?.lng,
                userLocation?.lat,
                userLocation?.lng
              )}
            </span>
          </p>
          <div className="bg-point-color text-white rounded-full h-fit text-[0.65rem] leading-3 font-bold px-2 py-1">{`최초 발견자 : ${
            store?.nickname || DEFAULT_NICKNAME
          }`}</div>
        </div>

        <div className="border-2 border-dashed border-[#b7d3e4] w-full p-2">
          {store?.lat && store?.lng && (
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
          {store?.detail && (
            <pre className="text-xs text-gray-800 mt-2 text-start text-wrap break-words">
              {store.detail}
            </pre>
          )}
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

        <div className="flex gap-1 justify-between w-full">
          <span className="text-xs text-gray-800">해당 탐험지에 등록된</span>
          <div className="flex gap-3 text-xs text-gray-800">
            <span className="text-sz14 text-gray-800 cursor-pointer">
              일지
              <span className="text-point-color font-bold">
                {store?.details?.length || 0}
              </span>
            </span>
            <span className="text-sz14 text-gray-800">
              즐겨찾기
              <span className="text-point-color font-bold">
                {store?.likes || 0}
              </span>
            </span>
          </div>
        </div>
        {store?.details && <JornalList journal={store.details} />}
      </div>
    </div>
  );
};

export default StoreDetailPage;
