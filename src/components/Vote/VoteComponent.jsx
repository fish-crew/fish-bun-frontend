import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs"; // WebSocket 라이브러리 필요
import { getCookie } from "../../api/cookie.js";
import { useSelector } from "react-redux";

import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

const VoteComponent = ({ postid, options, onVote }) => {
  const [votes, setVotes] = useState(
    options.map((option) => ({ name: option, votes: 0 }))
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const userId = useSelector((state) => state.user.id); // Redux 상태에서 닉네임 가져오기

  // ✅ options 변경 시 votes 상태도 초기화
  useEffect(() => {
    setVotes(options.map((option) => ({ name: option, votes: 0 })));
  }, [options]);

  // WebSocket 연결 및 구독 설정  *3번 *** 최근
  const socketUrl = "https://bunglog.me/api/ws";
  const client = useRef(null);

  useEffect(() => {
    // console.log("Initializing WebSocket connection...");

    if (client.current) {
      // console.warn(
      //   "⚠️ Existing WebSocket client found, disconnecting before reconnecting..."
      // );
      client.current.disconnect(() => {
        // console.log("🛑 Previous WebSocket fully disconnected.");
        client.current = null;
        initiateConnection();
      });
    } else {
      initiateConnection();
    }

    function initiateConnection() {
      // console.log("🔄 Creating new WebSocket connection...");
      const socket = new SockJS(socketUrl);
      const authToken = getCookie();
      client.current = Stomp.over(socket);
      client.current.debug = console.log; // 디버깅 로그 활성화

      // socket.onopen = () => console.log("🌍 WebSocket connection opened.");
      // socket.onclose = () => console.log("🚪 WebSocket connection closed.");
      // socket.onerror = (error) => console.error("⚠️ WebSocket error:", error);
      // socket.onmessage = (event) =>
      //   console.log("📨 Raw WebSocket message:", event.data);

      client.current.connect(
        // { Authorization: authToken },
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
  }, [postid]);

  // useEffect(() => {
  //   // 초기 상태 설정 (서버에서 데이터 받아오기)
  //   setVotes(options.map((option) => ({ name: option, votes: 0 })));
  //   const socketUrl =
  //     window.location.protocol === "https:"
  //       ? "wss://bunglog.me/ws"
  //       : "ws://localhost:3000/ws";

  //   // WebSocket 연결
  //   const client = new Client({
  //     brokerURL: socketUrl, // 백엔드 WebSocket 주소
  //     onConnect: () => {
  //       console.log("WebSocket Connected!");

  //       // 서버에서 투표 데이터 구독
  //       client.subscribe(`/topic/vote/${postid}`, (message) => {
  //         const serverVotes = JSON.parse(message.body);
  //         console.log("📩 받은 데이터:", serverVotes);
  //         setVotes(
  //           serverVotes.map(({ voteOption, voteCount }) => ({
  //             name: voteOption,
  //             votes: voteCount,
  //           }))
  //         );
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error("STOMP Error:", frame);
  //     },
  //   });

  //   client.activate();

  //   return () => {
  //     client.deactivate(); // WebSocket 연결 해제
  //   };
  // }, [postid, options]);

  // 총 투표 수 계산 (서버 데이터 기반)
  const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);

  const sendVote = () => {
    const voteRequest = { voteOption: "슈붕" };
    client.current.send(
      `/ws-community/vote/${postid}`,
      {},
      JSON.stringify(voteRequest)
    );
  };

  // 투표 처리
  const handleVote = (optionName) => {
    const voteRequest = { voteOption: optionName, userId: userId };
    client.current.send(
      `/ws-community/vote/${postid}`,
      {},
      JSON.stringify(voteRequest)
    );

    setVotes((prevVotes) =>
      prevVotes.map((option) =>
        option.name === optionName
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );
    setSelectedOption(optionName);
    setVoted(true);
  };

  return (
    <div className="w-full py-2">
      <button
        className="bg-black text-white rounded-full p-3 mb-5"
        onClick={sendVote}
      >
        소켓 전송 테스트 버튼
      </button>
      <div className="pb-1 pe-1 text-right text-[1.8dvh] text-[#b4b4b4]">
        1개 선택 가능, 총 {totalVotes}명 참여
      </div>

      {!voted ? (
        // ✅ 투표 전 UI
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleVote(option)}
              className="h-10 w-full p-3 border rounded-lg text-left flex items-center bg-[#eaecef]"
            >
              <div className="w-full flex justify-between">
                {option}
                <span className="text-[#eaecef]">○</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        // ✅ 투표 후 UI (가로형 막대 그래프)
        <div className="space-y-2">
          {votes.map(({ name, votes }) => {
            const percentage = totalVotes
              ? Math.round((votes / totalVotes) * 100)
              : 0;
            return (
              <div
                key={name}
                className="relative w-full border rounded-lg overflow-hidden"
              >
                <div
                  className={`h-10 flex items-center p-3 transition-all duration-300 ${
                    name === selectedOption ? "bg-[#aa757e]" : "bg-[#d4d4d4]"
                  }`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="whitespace-nowrap">
                    {name} {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VoteComponent;
