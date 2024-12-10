import React, { useState, useRef } from "react";

function ImageUpload() {
  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기
  const fileInputRef = useRef(null); // 파일 입력 필드 참조

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일

    if (!file) {
      alert("파일을 선택하지 못했습니다. 사진 보관함 또는 카메라 권한을 확인해주세요.");
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
    <div className="w-64 h-64 flex flex-col justify-center items-center border-2 border-dashed border-gray-300 rounded-lg bg-white">
      {imagePreview ? (
        <div className="w-full h-full relative">
          {/* 미리보기 이미지 */}
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          {/* 삭제 버튼 */}
          <button
            onClick={resetFileInput} // 초기화 함수 호출
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full pl-0.5 w-6 h-6"
          >
            X
          </button>
        </div>
      ) : (
        <label htmlFor="image-upload" className="flex flex-col items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-13 w-13 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p className="mt-2 text-gray-600 text-sz25">사진을 추가해주세요</p>
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
