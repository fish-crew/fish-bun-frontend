import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import DropdownSelector from "../../../components/dropdownSelector/DropdownSelector";

import { fetchFlavorData, postRegisterData } from "../../../api/service.js";

const AddPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({}); // 선택된 옵션 객체
  const [flavors, setFlavors] = useState([]); // data 값만 저장
  const [flavorsList, setFlavorsList] = useState([]); // data 값만 저장

  useEffect(() => {
    const getFlavors = async () => {
      try {
        const response = await fetchFlavorData(); // 서버 전체 응답
        const flavorsData = response.data; // 응답 데이터 저장

        setFlavors(flavorsData); // 상태에 전체 데이터 저장

        // "미확인 붕어빵" 분리
        const unknownFlavor = flavorsData.find(
          (item) => item.flavor === "미확인 붕어빵"
        );
        const filteredFlavors = flavorsData.filter(
          (item) => item.flavor !== "미확인 붕어빵"
        );

        // seq 기준 정렬
        const sortedFlavors = filteredFlavors.sort((a, b) => a.seq - b.seq);

        // 마지막에 "미확인 붕어빵" 추가
        const finalFlavors = unknownFlavor
          ? [...sortedFlavors, unknownFlavor]
          : sortedFlavors;

        // flavor 값만 추출
        const flavorNames = finalFlavors.map((item) => item.flavor);

        setFlavorsList(flavorNames); // 상태 업데이트
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    getFlavors();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => {
      // 이미 선택된 옵션인지 확인
      if (prevOptions[option]) {
        return prevOptions; // 이미 선택된 경우 추가하지 않음
      }
      return { ...prevOptions, [option]: 1 }; // 새 옵션 추가, 기본 수량 1
    });
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      delete newOptions[option]; // 선택 해제
      return newOptions;
    });
  };

  const handleQuantityChange = (option, change) => {
    setSelectedOptions((prevOptions) => {
      const newQuantity = Math.max(prevOptions[option] + change, 1); // 최소 수량 1
      return { ...prevOptions, [option]: newQuantity };
    });
  };

  //서버로 보내기 (나중에 수정)
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!Object.keys(selectedOptions).length) {
      alert("옵션을 선택해주세요.");
      return;
    }

    const formData = new FormData();

    // 이미지 추가
    const imageFile = document.querySelector("#image-upload").files[0];
    if (!imageFile) {
      alert("이미지를 업로드해주세요.");
      return;
    }
    formData.append("picture", imageFile);

    // 선택된 옵션 변환
    const flavorsToSend = Object.keys(selectedOptions)
      .map((optionName) => {
        const flavor = flavors.find((flavor) => flavor.flavor === optionName); // flavorId 찾기
        if (!flavor) {
          console.error(`Flavor not found for option: ${optionName}`);
          return null;
        }
        return { flavorId: flavor.id, count: selectedOptions[optionName] };
      })
      .filter(Boolean); // null 값 제거

    // 옵션 데이터를 JSON으로 변환 후 FormData에 추가
    formData.append("flavors", JSON.stringify(flavorsToSend));

    // FormData 디버깅용 출력
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const result = await postRegisterData(formData);
      const id = result.data;
      alert("등록되었습니다.");
      console.log("서버 응답:", result);

      navigate(`/register/successPage/${id}`);
    } catch (error) {
      console.error("전송 중 오류:", error);
      alert("전송 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate("/main");
  };

  return (
    <div
      className="flex flex-col items-center justify-around p-6 bg-gray-100 overflow-auto relative w-full h-full bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/webp/checkPattern.webp')" }}
    >
      <div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-[#650000] hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white stroke-[3px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="text-center text-title font-medium text-white drop-shadow-title drop-shadow-xlRed">
        사진을 추가해주세요
      </div>
      <div className="text-center text-sz25 mb-4 text-white drop-shadow-smRed">
        등록은 하루에 한번만 가능합니다.
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto w-full items-center">
        {/* 이미지 업로드 컴포넌트 */}
        <ImageUpload />

        {/* 드롭다운 선택 컴포넌트 */}
        <DropdownSelector options={flavorsList} onSelect={handleOptionSelect} />

        {/* 선택된 옵션 표시 */}
        <div className="mt-4 w-72">
          <div className="space-y-1">
            {Object.keys(selectedOptions).map((option) => (
              <div
                key={option}
                className="flex items-center justify-between p-2 border rounded-md bg-white shadow"
              >
                <span className="text-sz25 font-medium w-60 break-normal">
                  {option}
                </span>

                <div className="flex items-center justify-end w-40">
                  <div className="flex items-center gap-2">
                    {/* 수량 감소 버튼 */}
                    <button
                      onClick={() => handleQuantityChange(option, -1)}
                      className="items-center justify-center border rounded-full mx-2 font-bold"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 p-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 12h14"
                        />
                      </svg>
                    </button>
                    {/* 수량 표시 */}
                    <span className="text-sz25">{selectedOptions[option]}</span>
                    {/* 수량 증가 버튼 */}
                    <button
                      onClick={() => handleQuantityChange(option, 1)}
                      className="items-center justify-center border rounded-full mx-2 font-bold "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 p-1"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleRemoveOption(option)}
                    className="w-6 h-6 rounded-full flex items-center justify-center ml-1 pl-0.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-5 text-gray-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 제출 버튼 */}
      <button
        className="mt-4 bg-[#630000] hover:bg-white hover:text-[#630000] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
        onClick={handleSubmit}
      >
        확인
      </button>
    </div>
  );
};

export default AddPage;
