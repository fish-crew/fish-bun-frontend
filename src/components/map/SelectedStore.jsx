import React from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setRegisterStore, setSelectedStore } from "../../redux/slices/map";

import { postStoreLikes } from "../../api/map";

import { calcaulateDistanceWithUnit } from "../../utils";

const SelectedStore = ({ storeId, refetch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userLocation, stores } = useSelector((state) => state.map);

  const store = stores.find(({ id }) => id === storeId);

  const handleNavigate = () => {
    if (store?.id) {
      navigate(`/map/store/${store.id}`);
    }
  };

  const toggleBookmark = () => {
    if (store?.id) {
      postStoreLikes({ storeId: store.id }).then((response) => {
        if (response.statusCode === "200" && refetch) {
          refetch();
        } else {
          alert("가게 좋아요를 누르는 데 실패했습니다.");
        }
      });
    }
  };

  const handleModify = () => {
    dispatch(setRegisterStore(store));
    navigate("/map/register");
  };

  const distance = calcaulateDistanceWithUnit(
    store?.lat,
    store?.lng,
    userLocation?.lat,
    userLocation?.lng
  );

  return (
    <div
      className={`absolute bottom-0 w-full bg-white p-2.5 shadow-t transition-transform duration-300 ease-in-out transform rounded-t-xl drop-shadow-smGray z-10 overflow-auto`}
      onTouchMove={(e) => {
        if (e.touches[0].clientY < e.target.offsetTop) {
          handleNavigate();
        } else {
          dispatch(setSelectedStore(null));
        }
      }}
    >
      <div className="flex flex-col items-start px-2 mb-1 font-hakgyo">
        <hr
          className="w-1/4 mx-auto border-2 rounded-full border-gray-400"
          onClick={handleNavigate}
        />
        <div className="flex justify-between items-start w-full mt-3">
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-bold">붕어빵</h2>
            <button onClick={toggleBookmark}>
              {store?.likeYn === "Y" ? (
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
        <p className="text-xs text-gray-800">{store?.address}</p>
        <div className="flex justify-between w-full">
          <p className="text-xs text-point-color mb-3">
            탐험까지 거리 <span className="font-bold">{distance}</span>
          </p>
        </div>

        <div className="flex gap-1 justify-between w-full">
          <span className="text-xs text-gray-800">해당 탐험지에 등록된</span>
          <div className="flex gap-3 text-xs text-gray-800">
            <span
              className="text-sz14 text-gray-800 cursor-pointer"
              onClick={handleNavigate}
            >
              일지
              <span className="text-point-color font-bold">
                {store?.diaryCount || 0}
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
      </div>
    </div>
  );
};

export default SelectedStore;
