import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaChevronLeft, FaMap, FaCheck } from "react-icons/fa";

import AddressSearch from "../../components/map/AddressSearch";
import CurrentLocationSearch from "../../components/map/CurrentLocationSearch";

import { useSelector, useDispatch } from "react-redux";
import { INITIAL_STORE, setRegisterStore } from "../../redux/slices/map";

import { postStoreInfo, patchStoreInfo } from "../../api/map";

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { registerStore } = useSelector((state) => state.map);

  const [store, setStore] = useState(registerStore || INITIAL_STORE);

  const gocoderCallback = (address) => (result, status) => {
    if (status === "OK") {
      dispatch(
        setRegisterStore({ ...store, lat: result[0].y, lng: result[0].x })
      );

      const updatedStore = {
        detail: store.detail,
        lat: result[0].y,
        lng: result[0].x,
        name: store.name,
        address,
      };

      if (registerStore?.id) {
        patchStoreInfo(registerStore.id, updatedStore).then((response) => {
          if (response.statusCode === "200") {
            alert("가게 정보가 수정되었습니다.");
            handleBack();
          } else {
            alert("가게 정보 수정에 실패했습니다. 다시 시도해주세요.");
          }
        });
      } else {
        postStoreInfo(updatedStore).then((response) => {
          if (response.statusCode === "200") {
            alert("가게 정보가 등록되었습니다.");
            handleBack();
          } else {
            alert("가게 등록에 실패했습니다. 다시 시도해주세요.");
          }
        });
      }
    } else {
      console.error("좌표 변환에 실패했습니다. 상태: " + status);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //주소 정보로 좌표 구하는 로직
    const geocoder = new window.kakao.maps.services.Geocoder();
    const address = e.target.address.value + e.target.detailAddress.value;
    geocoder.addressSearch(address, gocoderCallback(address));
  };

  const handleBack = () => {
    dispatch(setRegisterStore(INITIAL_STORE));
    navigate("/map");
  };

  return (
    <div className="fixed top-0 w-full md:max-w-[calc(100vh_*_10/19.5)] h-full bg-white z-10 py-4 px-2">
      <div className="flex items-center">
        <FaChevronLeft size={20} onClick={handleBack} />
        <div className="w-full h-full bg-white">붕어빵 가게 등록</div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <CurrentLocationSearch
          setAddress={(address) => setStore({ ...store, address })}
        />
        <button
          className="flex items-center gap-1 mr-2 text-gray-800 hover:text-black text-sm py-2 px-4 rounded"
          onClick={() => navigate("/map/register/map-selection")}
        >
          <FaMap size={14} className="text-gray-600" />
          지도에서 선택
        </button>
      </div>
      <form
        className="flex flex-col gap-2 space-y-4 mt-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start w-full">
          <label htmlFor="address" className="text-sm">
            가게 주소
          </label>
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="주소를 검색해주세요"
              className="border-b w-full"
              name="address"
              value={store.address}
              onChange={(e) => setStore({ ...store, address: e.target.value })}
              readOnly
            />
            <AddressSearch
              setAddress={(address) => setStore({ ...store, address })}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label htmlFor="detailAddress" className="text-sm">
            상세주소
          </label>
          <input
            type="text"
            placeholder="상세주소를 입력해주세요"
            className="border-b w-full"
            name="detailAddress"
          />
        </div>

        <div className="flex flex-col items-start gap-2 w-full">
          <label htmlFor="name" className="text-sm">
            가게명
          </label>
          <input
            type="text"
            placeholder="붕어빵"
            className="border-b w-full"
            name="name"
            value={store.name}
            onChange={(e) => setStore({ ...store, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label htmlFor="bungeoBbang" className="text-sm">
            상세정보
          </label>
          <input
            type="text"
            placeholder="붕어빵 가게의 정보를 입력해주세요"
            className="border-b w-full"
            name="detail"
            value={store.detail}
            onChange={(e) => setStore({ ...store, detail: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center bg-blue-500 rounded-md py-2 px-4 text-sm text-white shadow-sm hover:bg-blue-600"
          >
            <FaCheck size={14} className="mr-2" />
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
