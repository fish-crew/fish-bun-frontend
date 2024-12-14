import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import paperOnCheckB from '../../../assets/paperOnCheckB.jpg';
import paperOnBlueCheckT from '../../../assets/paperOnBlueCheckT.jpg';
import diaryLineBlue from '../../../assets/diaryLineBlue.png'

function ReportPage() {
  const navigate = useNavigate();
  const [newBungeobbangsName, setnewBungeobbangsName] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setnewBungeobbangsName(value); // 상태 업데이트
  };

  // 서버로 보내기
  const handleSubmit = () => {
    // 입력값이 공란인지 확인
    if (!newBungeobbangsName.trim()) {
      alert("뿡어빵의 이름을 입력해주세요.");
      return;
    }

    // 입력값이 정상인 경우 처리
    // 서버 요청 로직 추가

    //메인 페이지로 네비게이트
    alert("제보가 완료되었습니다.\n감사합니다.");
    navigate('/main');
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      <div className="w-full h-max">
        <img src={paperOnBlueCheckT} alt="상단 배너" />
      </div>
      <div
        className="flex flex-col justify-between h-full items-center bg-cover bg-center relative"
        style={{ backgroundImage: `url(${paperOnCheckB})` }}
      >
        <div className="absolute top-[30%]">
          <input
            type="text"
            name="newBungeobbangsName"
            placeholder="뿡어빵 이름을 입력하세요."
            onChange={handleInputChange}
            className="text-sz40 bg-transparent outline-none w-80 py-5"
            style={{
              border: 'none',
              borderBottom: '2px solid transparent',
              backgroundImage: `url(${diaryLineBlue})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom left',
              backgroundSize: '100% auto',
              textAlign: 'center',
            }}
          />
          <div className="text-sz25 text-gray-700 pt-1">
            이름은 쉼표로 구분해주세요!<br />
            ex) 팥 붕어빵, 슈크림 붕어빵
          </div>
          <button
            className="mt-20 bg-[#505985] {/*hover:text-[#505985]*/} text-white border-4 font-bold py-2 px-6 rounded-full w-72 text-sz35 tracking-[.25em]"
            // hover 안한 이유는 공백 입력 되었을 때 확인 글자 사라짐
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
