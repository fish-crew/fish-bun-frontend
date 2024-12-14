import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import DropdownSelector from "../../../components/dropdownSelector/DropdownSelector";
import checkPattern from "../../../assets/checkPattern.png";

const AddPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({}); // 선택된 옵션 객체
  const flavors = [
    "피자 붕어빵",
    "두부 붕어빵",
    "타코야끼 붕어빵",
    "팥붕어",
    "슈크림 붕어",
    "두부 붕어빵",
    "타코야끼 붕어빵",
    "팥붕어",
    "슈크림 붕어",
    "두부 붕어빵",
    "타코야끼 붕어빵",
    "팥붕어",
    "슈크림 붕어",
    "두부 붕어빵",
    "타코야끼타코야끼 붕어빵",
    "팥붕어",
    "슈크림 붕어",
  ]; // 드롭다운 옵션

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
    formData.append("image", imageFile); // 'image' 키로 이미지 파일 추가

    // 붕어빵 옵션 데이터 추가
    formData.append("options", JSON.stringify(selectedOptions)); // JSON으로 변환해 추가

    // FormData 내용을 출력
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("/api/fish-bun/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("서버 응답이 실패했습니다.");
      }

      const result = await response.json();
      alert("등록되었습니다.");
      console.log("서버 응답:", result);
    } catch (error) {
      console.error("전송 중 오류:", error);
      alert("전송 중 오류가 발생했습니다.");
    }

    navigate(`/register/successPage`);
  };

  return (
    <div
      className="flex flex-col items-center p-6 bg-gray-100 overflow-auto relative w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${checkPattern})`,
      }}
    >
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
        <DropdownSelector options={flavors} onSelect={handleOptionSelect} />

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
