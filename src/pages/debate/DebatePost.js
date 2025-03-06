import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";

const DebatePost = () => {
  const { postid } = useParams(); // URL에서 postid 가져오기

  const navigate = useNavigate();

  //   const [debateList, setDebateList] = useState([]);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetchDebateListData();

  //       if (response.result === "success" && response.statusCode === "200") {
  //         setDebateList(response.data); // 상태 업데이트
  //       } else {
  //         console.error("서버 응답 실패:", response);
  //         showAlert("데이터를 가져오는 데 실패했습니다.");
  //       }
  //     } catch (error) {
  //       console.error("서버 데이터 가져오기 실패:", error);
  //     }
  //   };

  //   // ✅ useEffect를 사용해 fetchData 실행
  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const handleClose = () => {
    //메인 페이지로 네비게이트
    navigate(-1);
  };

  return <div className="">{postid}</div>;
};

export default DebatePost;
