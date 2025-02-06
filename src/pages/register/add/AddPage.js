import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import DropdownSelector from "../../../components/dropdownSelector/DropdownSelector";
import { fetchFlavorData, postRegisterData } from "../../../api/service.js";

// 커스텀 훅: sessionStorage에서 플래그 확인 후 삭제
function useAccessGuard() {
  // lazy initializer를 사용해 초기 allowed 값을 sessionStorage에서 읽어옵니다.
  const [allowed] = useState(() => {
    return sessionStorage.getItem("addPageAllowed") === "true";
  });

  useEffect(() => {
    // 초기 렌더링 이후(다음 tick)에 sessionStorage의 플래그를 제거합니다.
    const timer = setTimeout(() => {
      sessionStorage.removeItem("addPageAllowed");
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return allowed;
}

const AddPage = () => {
  const [selectedOptions, setSelectedOptions] = useState({}); // 선택된 옵션 객체
  const [flavors, setFlavors] = useState([]); // data 값만 저장
  const [flavorsList, setFlavorsList] = useState([]); // data 값만 저장
  const [dateToSend, setDateToSend] = useState(""); // 서버로 전송할 날짜 저장
  const navigate = useNavigate();
  const location = useLocation(); // URL 파라미터 가져오기

  // URL 파라미터에서 날짜 가져오기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paramDate = queryParams.get("date");

    if (paramDate) {
      setDateToSend(paramDate); // URL 파라미터로 전달된 날짜를 사용
    } else {
      const today = new Date();

      // 한국 시간(UTC+9) 적용
      const koreaTimeOffset = 9 * 60 * 60 * 1000;
      const localToday = new Date(today.getTime() + koreaTimeOffset);

      // YYYY-MM-DD 형식으로 변환
      const formattedToday = localToday.toISOString().split("T")[0];

      setDateToSend(formattedToday); // 오늘 날짜를 기본값으로 설정
    }
  }, [location]);

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

  // 커스텀 훅으로 접근 플래그 확인 (버튼 클릭 시 true여야 함)
  const allowed = useAccessGuard();

  // allowed 값이 false면 URL로 직접 접근한 경우이므로 /main으로 리다이렉트
  if (!allowed) {
    return <Navigate to="/main" replace />;
  }

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevOptions) => {
      // 이미 선택된 옵션인지 확인
      if (prevOptions[option]) {
        return prevOptions; // 이미 선택된 경우 추가하지 않음
      }
      return { ...prevOptions, [option]: 1 }; // 새 옵션 추가, 기본 수량 1
    });

    // 스크롤 동작
    setTimeout(() => {
      const scrollArea = document.querySelector(".overflow-y-auto");
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }, 0);
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

  //서버로 보내기
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

    formData.append("flavors", JSON.stringify(flavorsToSend));
    formData.append("date", dateToSend);

    try {
      const result = await postRegisterData(formData);
      console.log(result);
      const id = result.data; // 서버에서 받은 ID 값 (예: 81)

      alert("등록되었습니다.");
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
    <div className="w-full flex-grow flex flex-col overflow-y-auto">
      <div className="w-full h-max">
        <img src="/assets/webp/paperOnCheckT.webp" alt="상단 배너" />
      </div>
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-[#1069b0] hover:bg-gray-300 z-10 "
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
      <div
        className="w-full flex flex-col flex-grow bg-cover px-3 pb-3"
        style={{ backgroundImage: "url('/assets/webp/paperOnCheckB.webp')" }}
      >
        <div className="text-center text-title font-medium text-[#1069b0]">
          사진을 추가해주세요
        </div>
        <div className="text-center text-sz25 mb-4 text-gray-700">
          등록은 하루에 한번만 가능합니다.
        </div>
        <div className="flex flex-col flex-grow w-full items-center overflow-y-auto">
          {/* 이미지 업로드 컴포넌트 */}
          <ImageUpload />

          {/* 드롭다운 선택 컴포넌트 */}
          <DropdownSelector
            options={flavorsList}
            onSelect={handleOptionSelect}
          />

          {/* 선택된 옵션 표시 */}
          <div className="mt-4 w-72 flex flex-col flex-grow ">
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
                      <span className="text-sz25">
                        {selectedOptions[option]}
                      </span>
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
        <div className="">
          <button
            className="mt-4 bg-[#1069b0] hover:bg-white hover:text-[#1069b0] text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em] w-72"
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
