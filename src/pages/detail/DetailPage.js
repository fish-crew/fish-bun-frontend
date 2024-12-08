import React from 'react';
import { useParams } from 'react-router-dom';
import diaryPhotoBox from '../../assets/diaryPhotoBox.png'
import diaryLine from '../../assets/diaryLine.png'

function DetailsPage() {
  const { id } = useParams(); // 경로에서 날짜 가져오기

  return (
    <div>
      <h1>상세 페이지</h1>
      <p>선택된 날짜: {id}</p>
      <div className="flex justify-center mx-3 h-[30dvh]">
        <img src={diaryPhotoBox} alt="diaryPhotoBox" className="" />
      </div>
      <div className="flex justify-center mt-12 mx-3 h-[1dvh]">
        <img src={diaryLine} alt="diaryLine" className="" />
      </div>
      <div className="flex justify-center mt-12 mx-3 h-[1dvh]">
        <img src={diaryLine} alt="diaryLine" className="" />
      </div>
      <div className="flex justify-center mt-12 mx-3 h-[1dvh]">
        <img src={diaryLine} alt="diaryLine" className="" />
      </div>
      <div className="flex justify-center mt-12 mx-3 h-[1dvh]">
        <img src={diaryLine} alt="diaryLine" className="" />
      </div>

    </div>
  );
}

export default DetailsPage;
