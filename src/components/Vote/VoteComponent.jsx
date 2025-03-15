import React, { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs"; // WebSocket 라이브러리 필요

const VoteComponent = ({ postId, options, onVote }) => {
  const [votes, setVotes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

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
  //       client.subscribe(`/topic/vote/${postId}`, (message) => {
  //         const serverVotes = JSON.parse(message.body);
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
  // }, [postId, options]);

  // 총 투표 수 계산 (서버 데이터 기반)
  const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);

  // 투표 처리
  const handleVote = (optionName) => {
    // if (voted) return;
    // // 선택한 옵션을 서버에 전송
    // onVote(optionName);
    // setSelectedOption(optionName);
    // setVoted(true);
  };

  return (
    <div className="w-full py-2">
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
