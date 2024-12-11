import React, { useState, useRef } from "react";
import addPicBtn from "../../assets/addPicBtn.png";

function ImageUpload() {
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기
  const fileInputRef = useRef(null); // 파일 입력 필드 참조

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일

    if (!file) {
      alert(
        "파일을 선택하지 못했습니다. 사진 보관함 또는 카메라 권한을 확인해주세요."
      );
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setImagePreview(URL.createObjectURL(file)); // 미리보기 이미지 설정
  };

  const resetFileInput = () => {
    setImagePreview(null); // 미리보기 상태 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 파일 입력 필드 값 초기화
    }
  };

  return (
    <div className="w-72 h-32 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg bg-white drop-shadow-xlRedLight">
      {imagePreview ? (
        <div className="w-full h-full flex justify-center">
          {/* 미리보기 이미지 */}
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="h-full rounded-lg"
          />
          {/* 삭제 버튼 */}
          <button
            onClick={resetFileInput} // 초기화 함수 호출
            className="absolute top-2 right-2 text-white rounded-full pl-0.5 w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 bg-[#630000] rounded-full p-0.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          className="flex flex-col h-32 items-center cursor-pointer p-4"
        >
          <img src={addPicBtn} alt="icon" className="pl-3 h-20" />
          <p className="text-gray-400 text-sz25">사진을 추가해주세요</p>
        </label>
      )}
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        ref={fileInputRef} // ref로 파일 입력 필드 참조
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUpload;
