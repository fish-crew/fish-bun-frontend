import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchDebatePostData,
  postDebateComment,
  fetchDebateCommentsData,
  postCommentLikes,
  deleteComment,
  patchComment,
} from "../../api/service";
import AlertModal, { showAlert } from "../../components/modals/AlertModal.js";
import VoteComponent from "../../components/Vote/VoteComponent.jsx";
import { useSelector } from "react-redux";
import ImageConfetti from "../../components/animations/ImageConfetti.jsx";

const DebatePost = () => {
  const { postid, postId } = useParams(); // URL에서 postid 가져오기
  const [contents, setContents] = useState(""); // 댓글 저장
  const [postContent, setPostContent] = useState([]); // 단일 게시글 조회
  const [commentsList, setCommentsList] = useState([]); // 게시글 댓글 조회
  const nickname = useSelector((state) => state.user.nickname); // Redux 상태에서 닉네임 가져오기
  const [showConfetti, setShowConfetti] = useState(false);

  // 댓글 수정
  const userId = useSelector((state) => state.user.id); // Redux 상태에서 닉네임 가져오기
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 추가
  const [editedContent, setEditedContent] = useState(""); // 편집 내용 상태 추가
  const [editingId, setEditingId] = useState(""); // 편집 모드 상태 추가
  const contentsRef = useRef(""); // 댓글 입력값을 상태가 아닌 ref로 관리
  const editedContentRef = useRef(""); // 댓글 수정 입력값을 관리할 ref

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!postid) {
      showAlert("등록된 게시물을 찾을 수 없습니다.");
      return;
    }

    try {
      const response = await fetchDebatePostData(postid);
      const commentsInfo = await fetchDebateCommentsData(postid);

      if (response.result === "success" && response.statusCode === "200") {
        setPostContent(response.data); // 상태 업데이트
      } else {
        console.error("서버 응답 실패:", response);
        showAlert("데이터를 가져오는 데 실패했습니다.");
      }

      if (
        commentsInfo.result === "success" &&
        commentsInfo.statusCode === "200"
      ) {
        setCommentsList(commentsInfo.data); // 상태 업데이트
        // console.log(commentsInfo.data);
      } else {
        console.error("서버 응답 실패:", commentsInfo);
        showAlert("데이터를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("서버 데이터 가져오기 실패:", error);
    }
  }, [postid]);

  // useEffect를 사용해 fetchData 실행
  useEffect(() => {
    fetchData();
  }, [postid]);

  // 저장 버튼 핸들러
  const handleSave = async () => {
    const newContents = contentsRef.current.trim();
    if (!newContents) {
      showAlert("내용을 입력하세요.");
      return;
    }

    setContents(newContents); // 저장 버튼 클릭 시 상태 업데이트

    try {
      await postDebateComment(postid, newContents);
      showAlert("댓글이 등록되었습니다.", async () => {
        contentsRef.current = ""; // 입력값 초기화
        setContents(""); // 상태 초기화
        fetchData(); // 최신 데이터 가져오기
      });
    } catch (error) {
      console.error("등록 실패", error);
      showAlert("등록 실패");
    }
  };

  const handleLike = async (commentId) => {
    try {
      await postCommentLikes(commentId);

      setCommentsList((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            const newLikeYN = comment.likeYN === "Y" ? "N" : "Y";
            const newLikeCount =
              newLikeYN === "Y" ? comment.likeCount + 1 : comment.likeCount - 1;

            // 좋아요가 "Y"로 변경될 때만 confetti 효과 실행
            if (newLikeYN === "Y") {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 1000);
            }

            return { ...comment, likeYN: newLikeYN, likeCount: newLikeCount };
          }
          return comment;
        })
      );
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);

      showAlert("댓글이 삭제되었습니다.", async () => {
        await fetchData(); // 최신 댓글 데이터 가져오기
      });
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      showAlert("댓글 삭제에 실패했습니다.");
    }
  };

  // 편집 모드 핸들러
  const handleEdit = (id, contents) => {
    setIsEditing(true);
    setEditingId(id);
    setEditedContent(contents);
  };

  const handleCancleEdit = () => {
    setIsEditing(false); // 편집 모드 종료
    setEditingId(null); // 편집 대상 초기화
    setEditedContent(""); // 입력 필드 초기화
    fetchData(); // 최신 댓글 데이터 가져오기
  };

  const handleEditSave = async (commentId) => {
    const newEditedContent = editedContentRef.current.trim();
    if (!newEditedContent) {
      showAlert("수정할 내용을 입력하세요.");
      return;
    }

    try {
      await patchComment(commentId, newEditedContent);
      showAlert("댓글이 수정되었습니다.", async () => {
        editedContentRef.current = ""; // 수정 입력값 초기화
        fetchData(); // 최신 데이터 가져오기
      });
    } catch (error) {
      console.error("댓글 수정 실패", error);
      showAlert("댓글 수정에 실패했습니다.");
    }
  };
  return (
    <div
      className="main-area flex flex-grow flex-col w-full bg-repeat-y bg-[length:100%] bg-left-top bg-[#e9e0dc] relative"
      style={{
        height: "calc(100vh - 4dvh - 90px)",
      }}
    >
      <div className="w-full h-full fixed pointer-events-none z-50">
        <ImageConfetti
          isActive={showConfetti}
          imageUrls={[
            "/assets/webp/bunglogLogo.webp",
            "/assets/webp/heart.webp ",
          ]}
        />
      </div>
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
              fillRule="evenodd"
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
      <div
        className="w-full flex flex-grow flex-col px-5 pt-8 pb-0 items-center overflow-y-auto"
        style={{
          height: "calc(100vh - 4dvh - 90px)",
        }}
      >
        <img
          src="/assets/webp/debatePostHeader.webp"
          alt="•"
          className="w-60"
        />
        <div className="rounded-t-xl flex-grow p-5 pt-7 flex flex-col text-start bg-white w-full">
          {/* <button
            className="bg-black text-white rounded-full p-3 mb-5"
            onClick={sendVote}
          >
            소켓 전송 테스트 버튼
          </button> */}
          <div className="w-full text-sz30 px-1">{postContent.title}</div>
          <div className="text-sz20 px-1">{postContent.contents}</div>

          <div className="w-full flex items-center text-[#b4b4b4] text-[1.8dvh]">
            게시 {postContent?.regDate?.split(/\s|&nbsp;/)[0] || ""}
          </div>
          {postContent.fileUrls && postContent.fileUrls.length > 0 && (
            <div className="whitespace-nowrap flex gap-2 py-2 scrollbar-hide items-center">
              {postContent.fileUrls && postContent.fileUrls.length > 0 && (
                <div className="overflow-x-auto whitespace-nowrap flex gap-2 p-2 scrollbar-hide">
                  {postContent.fileUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`첨부 이미지 ${index + 1}`}
                      className="h-40 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          {postContent && (
            <VoteComponent
              options={[postContent.firstOption, postContent.secondOption]}
              postid={postid}
              selectedVote={postContent.selectedOption}
              firstOptionCount={postContent.firstOptionCount}
              secondOptionCount={postContent.secondOptionCount}
              // onVote={sendVote}
            />
          )}

          <div className="px-1 pt-10">
            <span className="text-[#aa757e] font-bold">
              {commentsList.length}
            </span>
            명이 나눈 잡담
          </div>
          <div className="border-[0.5px] p-2 mb-5">
            <div className="pb-1 ps-1 font-bold">{nickname}</div>
            <textarea
              defaultValue={contentsRef.current}
              onChange={(e) => (contentsRef.current = e.target.value)}
              className="w-full textarea border-[0.5px] p-2 focus:border-[#b4b4b4]
              focus:ring-1 focus:ring-[#ffe6e9] focus:outline-none 
             focus:text-black
              "
              placeholder="주제에 대한 의견을 적어보세요."
            />
            <div className="w-full flex justify-end">
              <button
                onClick={handleSave}
                className="bg-[#aa757e] active:bg-white active:text-[#aa757e] text-white 
 py-1 px-2 rounded-md tracking-[.25em] text-sz20
 "
              >
                등록하기
              </button>
            </div>
          </div>
          <div className="relative w-full h-full"></div>
          {commentsList
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col border-t-2 border-dashed py-3 px-1"
              >
                <div className="w-full flex flex-col">
                  <div className="w-full flex justify-between">
                    <div className="font-bold">{item.userNickname}</div>
                    {userId === item.userId ? (
                      <div className="flex gap-x-2 items-center text-sz20 text-[#b4b4b4]">
                        <button
                          onClick={() => handleEdit(item.id, item.contents)}
                          className="active:bg-white active:text-[#aa757e]"
                        >
                          수정
                        </button>

                        <button
                          onClick={() => handleDeleteComment(item.id)}
                          className="active:bg-white active:text-[#aa757e]"
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-[#b4b4b4] text-[1.8dvh]">
                    {item.regDate.split(".")[0]}
                  </div>
                </div>
                {isEditing && item.id === editingId ? (
                  <div className="w-full">
                    <textarea
                      defaultValue={editedContentRef.current}
                      onChange={(e) =>
                        (editedContentRef.current = e.target.value)
                      }
                      className="w-full textarea border-[0.5px] p-2 focus:border-[#b4b4b4]
                  focus:ring-1 focus:ring-[#ffe6e9] focus:outline-none 
                 focus:text-black
                  "
                    />
                    <div className="w-full flex justify-end gap-x-2">
                      <button
                        onClick={handleCancleEdit}
                        className="active:bg-[#aa757e] bg-white text-[#aa757e] active:text-white 
   py-1 px-2 rounded-md tracking-[.25em] text-sz20 border-[0.5px]
   "
                      >
                        취소하기
                      </button>
                      <button
                        onClick={() => handleEditSave(item.id)}
                        className="bg-[#aa757e] active:bg-white active:text-[#aa757e] text-white 
   py-1 px-2 rounded-md tracking-[.25em] text-sz20
   "
                      >
                        수정하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <div className="break-all ">{item.contents}</div>
                    <button
                      onClick={() => handleLike(item.id)}
                      className="flex w-full justify-end items-center gap-2 active:bg-white active:text-[#aa757e]"
                    >
                      <div>
                        <img
                          src={
                            item.likeYN === "Y"
                              ? "/assets/webp/heart-bun-pink.webp"
                              : "/assets/webp/heart-bun-gray.webp"
                          }
                          alt="•"
                          className="text-[#1069b0] w-5"
                        />
                      </div>
                      <div className="text-[1.5dvh] text-[#aa757e] font-bold">
                        {item.likeCount}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DebatePost;
