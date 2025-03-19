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
import { getCookie } from "../../api/cookie.js";
import ImageConfetti from "../../components/animations/ImageConfetti.jsx";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { CompatClient, Stomp } from "@stomp/stompjs";

const DebatePost = () => {
  const { postid, postId } = useParams(); // URL에서 postid 가져오기
  const [contents, setContents] = useState(""); // 댓글 저장
  const [postContent, setPostContent] = useState([]); // 단일 게시글 조회
  const [commentsList, setCommentsList] = useState([]); // 게시글 댓글 조회
  const nickname = useSelector((state) => state.user.nickname); // Redux 상태에서 닉네임 가져오기
  const fireworkRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // 댓글 수정
  const userId = useSelector((state) => state.user.id); // Redux 상태에서 닉네임 가져오기
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태 추가
  const [editedContent, setEditedContent] = useState(""); // 편집 내용 상태 추가
  const [editingId, setEditingId] = useState(""); // 편집 모드 상태 추가
  // 투표
  const stompClientRef = useRef(null); // STOMP 클라이언트 저장
  const [agreeCount, setAgreeCount] = useState(0);
  const [disagreeCount, setDisagreeCount] = useState(0);

  const [votes, setVotes] = useState(0);

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
  }, [postid]); // postid가 변경될 때만 다시 선언

  // useEffect를 사용해 fetchData 실행
  useEffect(() => {
    fetchData();
  }, [postid]); // postid가 변경될 때마다 실행

  // Websocket 연결 테스트 코드

  const socketUrl = "http://192.168.0.173:8080/ws";
  // const socketUrl = "https://bunglog.me/api/ws";

  // const socket = new WebSocket("ws://localhost:3000/ws");
  // socket.onopen = () => console.log("✅ WebSocket 연결 성공!");
  // socket.onerror = (error) => console.error("❌ WebSocket 오류:", error);

  // WebSocket 연결 및 구독 설정  *1번 ***
  // const stompClient = useRef(null);
  // useEffect(() => {
  //   const initializeWebSocket = async () => {
  //     console.log("🔄 STOMP 클라이언트 활성화 시작...");

  //     if (stompClient.current) {
  //       console.log("🔻 기존 STOMPSockJS 클라이언트 비활성화 중...");
  //       await stompClient.current.deactivate(); // 완전히 종료될 때까지 대기
  //       console.log("✅ 기존 STOMP 클라이언트 종료 완료");
  //     }

  //     const socket = new SockJS(socketUrl);
  //     stompClient.current = Stomp.over(socket);
  //     stompClient.current.debug = console.log; // 디버깅 로그 추가

  //     stompClient.current.connect(
  //       {},
  //       (frame) => {
  //         console.log(" WebSo✅cket 연결 성공!", frame);

  //         stompClient.subscribe(`/topic/vote/${postId}`, function (message) {
  //           console.log("Received: " + message.body);
  //         });
  //       },
  //       (error) => {
  //         console.error("❌ WebSocket 연결 실패", error);
  //       }
  //     );
  //   };

  //   initializeWebSocket();

  //   return () => {
  //     if (stompClient.current) {
  //       console.log("🔻 STOMP 클라이언트 완전 종료...");
  //       stompClient.current.disconnect();
  //       stompClient.current = null;
  //     }
  //   };
  // }, [postId]);

  // WebSocket 연결 및 구독 설정  *2번 안되는 듯
  // useEffect(() => {
  //   const socket = new SockJS(socketUrl);
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     reconnectDelay: 5000, // 자동 재연결
  //     onConnect: () => {
  //       console.log("Connected to WebSocket");
  //       stompClient.subscribe(`/topic/vote/${postId}`, (message) => {
  //         if (message.body) {
  //           // setVoteData(JSON.parse(message.body));
  //         }
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error("Broker reported error: ", frame.headers["message"]);
  //       console.error("Additional details: ", frame.body);
  //     },
  //   });

  //   stompClient.activate();

  //   return () => {
  //     stompClient.deactivate();
  //   };
  // }, [postId]);

  // WebSocket 연결 및 구독 설정  *3번 *** 최근
  const client = useRef(null);
  useEffect(() => {
    console.log("Initializing WebSocket connection...");

    if (client.current) {
      console.warn(
        "⚠️ Existing WebSocket client found, disconnecting before reconnecting..."
      );
      client.current.disconnect(() => {
        console.log("🛑 Previous WebSocket fully disconnected.");
        client.current = null;
        initiateConnection();
      });
    } else {
      initiateConnection();
    }

    function initiateConnection() {
      console.log("🔄 Creating new WebSocket connection...");
      const socket = new SockJS(socketUrl);
      client.current = Stomp.over(socket);
      client.current.debug = console.log; // 디버깅 로그 활성화

      socket.onopen = () => console.log("🌍 WebSocket connection opened.");
      socket.onclose = () => console.log("🚪 WebSocket connection closed.");
      socket.onerror = (error) => console.error("⚠️ WebSocket error:", error);
      socket.onmessage = (event) =>
        console.log("📨 Raw WebSocket message:", event.data);

      client.current.connect(
        {},
        () => {
          console.log("✅ Connected to WebSocket successfully.");
          const subscription = client.current.subscribe(
            `/topic/vote/${postid}`,
            (message) => {
              const voteData = JSON.parse(message.body);
              console.log("📩 Message received:", voteData);
            }
          );

          if (subscription) {
            console.log("📡 Subscribed to:", `/topic/vote/${postid}`);
          }
        },
        (error) => {
          console.error("❌ Connection failed:", error);
        }
      );

      setTimeout(() => {
        if (!client.current || !client.current.connected) {
          console.warn(
            "⏳ WebSocket connection attempt timed out. No CONNECTED frame received."
          );
        }
      }, 5000);
    }

    return () => {
      if (client.current) {
        console.log("🔌 Disconnecting WebSocket...");
        client.current.disconnect(() => {
          console.log("🛑 Disconnected from WebSocket.");
        });
        client.current = null;
      }
    };
  }, [postId]);

  const sendVote = () => {
    console.log("btn clicked");

    const voteRequest = { voteOption: "팥붕" }; // 찬성
    client.current.send(
      `/ws-community/vote/${postid}`,
      {},
      JSON.stringify(voteRequest)
    );
    console.log("찬성 투표 전송");
  };

  const updateVoteCounts = (voteData) => {
    let agree = 0;
    let disagree = 0;

    voteData.forEach((vote) => {
      if (vote.voteOption === "찬성") {
        agree = vote.count;
      } else if (vote.voteOption === "반대") {
        disagree = vote.count;
      }
    });

    setAgreeCount(agree);
    setDisagreeCount(disagree);
  };

  // const sendVote = (optionName) => {
  //   const message = JSON.stringify({ voteOption: optionName });

  //   if (stompClientRef.current && stompClientRef.current.connected) {
  //     stompClientRef.current.publish({
  //       destination: `/app/vote/${postId}`, // 백엔드에서 설정한 투표 전송 경로
  //       body: message,
  //     });
  //   }
  // };

  // 저장 버튼 핸들러
  const handleSave = async () => {
    if (!postid) {
      showAlert("등록된 게시물을 찾을 수 없습니다.");
      return;
    }

    if (!contents.trim()) {
      showAlert("내용을 입력하세요.");
      return;
    }

    try {
      const response = await postDebateComment(postid, contents);

      showAlert("댓글이 등록되었습니다.", async () => {
        setContents(""); // 댓글 입력창 초기화
        await fetchData();
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

  const handleEditComment = async (commentId) => {
    if (!editedContent.trim()) {
      showAlert("수정할 내용을 입력하세요.");
      return;
    }

    try {
      await patchComment(commentId, editedContent); // 수정된 내용 전달

      showAlert("댓글이 수정되었습니다.", async () => {
        setIsEditing(false); // 편집 모드 종료
        setEditingId(null); // 편집 대상 초기화
        setEditedContent(""); // 입력 필드 초기화
        await fetchData(); // 최신 댓글 데이터 가져오기
      });
    } catch (error) {
      console.error("댓글 수정 실패:", error);
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
          <div className="w-full text-sz30 px-1">{postContent.title}</div>
          <div className="text-sz20 px-1">{postContent.contents}</div>

          <button
            className="bg-black text-white rounded-full p-3"
            onClick={sendVote}
          >
            테스트 버튼
          </button>
          {postContent && (
            <VoteComponent
              options={[postContent.firstOption, postContent.secondOption]}
              onVote={sendVote}
            />
          )}

          <div className="w-full flex items-center justify-end text-[#b4b4b4] text-[1.8dvh]">
            게시 {postContent?.regDate?.split("T")[0] || ""}
          </div>

          <div className="px-1">
            <span className="text-[#aa757e] font-bold">
              {commentsList.length}
            </span>
            명이 나눈 잡담
          </div>
          <div className="border-[0.5px] p-2 mb-5">
            <div className="pb-1 ps-1 font-bold">{nickname}</div>
            <textarea
              value={contents}
              onChange={(e) => setContents(e.target.value)}
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
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
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
                        onClick={() => handleEditComment(item.id)}
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
