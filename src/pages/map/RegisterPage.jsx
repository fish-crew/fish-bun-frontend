import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FaMap, FaCheck } from "react-icons/fa";

import Header from "../../components/header/Header";
import { AddressSearch, CurrentLocationSearch } from "../../components/map";
import AlertModal, { showAlert } from "../../components/modals/AlertModal";

import { useSelector, useDispatch } from "react-redux";
import { INITIAL_STORE, setRegisterStore } from "../../redux/slices/map";

import { postStoreInfo, patchStoreInfo } from "../../api/map";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const dispatch = useDispatch();
  const { registerStore } = useSelector((state) => state.map);

  const [store, setStore] = useState(registerStore || INITIAL_STORE);
  const handleAddress = (address) => {
    setStore({ ...store, address });
  };

  const geocoderCallback = (address) => (result, status) => {
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
            showAlert("가게 정보가 수정되었습니다.", handleBack);
          } else {
            showAlert("가게 정보 수정에 실패했습니다. 다시 시도해주세요.");
          }
        });
      } else {
        postStoreInfo(updatedStore).then((response) => {
          if (response.statusCode === "200") {
            showAlert("가게 정보가 등록되었습니다.", handleBack);
          } else {
            showAlert("가게 등록에 실패했습니다. 다시 시도해주세요.");
          }
        });
      }
    } else {
      console.error("좌표 변환에 실패했습니다. 상태: " + status);
    }
  };

  const handleBack = () => {
    dispatch(setRegisterStore(INITIAL_STORE));
    navigate("/map");
  };

  const onSubmit = (data) => {
    const address = data.address + data.detailAddress;
    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, geocoderCallback(address));
  };

  return (
    <div className="w-full md:max-w-[calc(100vh_*_10/19.5)] h-full bg-white main-area">
      <AlertModal />
      <Header handleBack={handleBack} />
      <div className="flex justify-between items-center mt-6 px-4">
        <CurrentLocationSearch handleAddress={handleAddress} />
        <button
          className="flex items-center gap-1 mr-2 text-gray-800 hover:text-black text-sm py-2 px-4 rounded"
          onClick={() => navigate("/map/register/map-selection")}
        >
          <FaMap size={14} className="text-gray-600" />
          지도에서 선택
        </button>
      </div>
      <form
        className="flex flex-col gap-2 space-y-4 mt-4 px-4"
        onSubmit={handleSubmit(onSubmit)}
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
              {...register("address", { required: true })}
              value={store.address}
              onChange={(e) => setStore({ ...store, address: e.target.value })}
              readOnly
            />
            <AddressSearch setAddress={handleAddress} />
          </div>
          {errors.address && (
            <span className="text-red-500 text-xs">주소를 입력해주세요</span>
          )}
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <label htmlFor="detailAddress" className="text-sm">
            상세주소
          </label>
          <input
            type="text"
            placeholder="상세주소를 입력해주세요"
            className="border-b w-full"
            {...register("detailAddress")}
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
            {...register("name")}
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
            {...register("detail")}
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
