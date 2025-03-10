import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDebatePostData } from "../../api/service";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";
import VoteComponent from "../../components/Vote/VoteComponent.jsx";

const DebatePost = () => {
  const { postid } = useParams(); // URL에서 postid 가져오기
  const navigate = useNavigate();

  const [postContent, setPostContent] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetchDebatePostData(postid);

      if (response.result === "success" && response.statusCode === "200") {
        setPostContent(response.data); // 상태 업데이트
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

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate(-1);
  };

  return (
    <div
      className="main-area flex flex-grow flex-col w-full bg-repeat-y bg-[length:100%] bg-left-top"
      style={{
        height: "calc(100vh - 4dvh - 90px)",
        backgroundImage: "url('/assets/webp/debateWall.webp')",
      }}
    >
      <AlertModal />
      <div className="w-full bg-white h-[6dvh] flex justify-between items-center border-b border-[rgb(211,211,211)]">
        <button
          className="w-10 h-10 flex items-center justify-center"
          onClick={() => navigate("/debateList")}
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
      <div className="w-full flex flex-grow flex-col px-5 pt-10 pb-0 items-center ">
        <img
          src="/assets/webp/debatePostHeader.webp"
          alt="•"
          className="text-[#1069b0] w-60 "
        />
        <div className=" h-full p-5 flex flex-col text-start bg-white w-full ">
          <div className="w-full text-sz30">{postContent.title}</div>
          {/* <div className="w-full text-[#aa757e]">{postContent.contents}</div> */}
          <div className="text-sz20 text-[#b4b4b4]">
            1개 선택 가능, 435명 참여
          </div>
          {postContent && (
            <VoteComponent
              options={[
                postContent.firstOption || "옵션 1",
                postContent.secondOption || "옵션 2",
              ]}
            />
          )}

          <div className="w-full flex gap-5 items-center justify-center p-8">
            <img
              src="/assets/webp/cal-bun-darkPink.webp"
              alt="•"
              className="text-[#1069b0] w-4 h-4"
            />
            <img
              src="/assets/webp/cal-bun-darkPink.webp"
              alt="•"
              className="text-[#1069b0] w-4 h-4"
            />
            <img
              src="/assets/webp/cal-bun-darkPink.webp"
              alt="•"
              className="text-[#1069b0] w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebatePost;
