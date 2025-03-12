import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDebateListData } from "../../api/service";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";

export default function DebateList() {
  const navigate = useNavigate();
  const [debateList, setDebateList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchDebateListData();

      if (response.result === "success" && response.statusCode === "200") {
        setDebateList(response.data); // 상태 업데이트
      } else {
        console.error("서버 응답 실패:", response);
        showAlert("데이터를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 데이터 가져오기 실패:", error);
    }
  };

  // useEffect를 사용해 fetchData 실행
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="main-area flex flex-grow flex-col w-full bg-repeat-y bg-[length:100%] bg-left-top"
      style={{
        height: "calc(100vh - 4dvh - 90px)",
      }}
    >
      <AlertModal />
      <div className="w-full bg-white h-[6dvh] flex justify-between items-center border-b border-[rgb(211,211,211)]">
        <button
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => navigate("/main")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-chevron-left w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
        <img
          className="h-[inherit] p-2"
          src="/assets/webp/logoBalck.webp"
          alt="붕어빵 탐험대"
          onClick={() => navigate("/loadingPage")}
        />
        <button className="w-10 h-10 flex items-center justify-center"></button>
      </div>
      <div className="w-full z-10">
        <img
          className=""
          src="/assets/webp/debateHeader.webp"
          alt="붕어빵 잡담소 타이틀"
        />
      </div>
      <div className="flex flex-grow flex-col w-full p-3 pt-1 overflow-y-auto">
        {debateList.map((item, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md border-2 p-3 flex mb-3 active:scale-95 active:bg-[#fceef2] bg-white border-[#aa757e] border-dashed"
            onClick={() => navigate(`/debatePost/${item.id}`)}
          >
            <div className="flex w-80 flex-col items-start pe-3">
              <div className="text-sz25 pb-1 text-[#62212b] text-start">
                {item.title}
              </div>
              <div className="w-full flex justify-between text-[#d4d4d4]">
                <div className="flex items-center text-sz20">
                  <img
                    className="w-4 h-4"
                    src="/assets/webp/cal-bun-empty.webp"
                    alt="붕어"
                  />
                  <div className="  ps-1">{item.voteCount}</div>
                </div>
                {/* <div className="">게시일 {item.regDate.split("T")[0]}</div> */}
              </div>
            </div>
            <div className="flex w-20 h-full items-center ">
              <div className="p-1 px-2 bg-[#d19198] rounded-full text-white">
                참여하기
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 w-full flex justify-center">
        <button
          className="bg-[#d19198] active:bg-white active:text-[#d19198] text-white 
 py-2 px-6 rounded-full text-sz25 tracking-[.25em] w-72"
        >
          주제 추천하기
        </button>
      </div>
    </div>
  );
}
