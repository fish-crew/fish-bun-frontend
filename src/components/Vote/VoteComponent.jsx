import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const VoteComponent = ({
  postid,
  options = [],
  selectedVote,
  firstOptionCount,
  secondOptionCount,
}) => {
  const [votes, setVotes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(selectedVote || null);
  const userId = useSelector((state) => state.user.id);
  const [voted, setVoted] = useState(!!selectedVote);
  const [totalVotes, setTotalVotes] = useState(0);
  const client = useRef(null);

  useEffect(() => {
    if (!Array.isArray(options) || options.length === 0) return;

    const updatedVotes = options.map((option) => ({
      name: option,
      votes: option === options[0] ? firstOptionCount : secondOptionCount,
    }));

    setVotes(updatedVotes);
    setTotalVotes(updatedVotes.reduce((sum, option) => sum + option.votes, 0));
    setSelectedOption(selectedVote || null);
    setVoted(!!selectedVote);
  }, [postid, options, firstOptionCount, secondOptionCount, selectedVote]);

  useEffect(() => {
    const socketUrl = "https://bunglog.me/api/ws";

    const initiateConnection = () => {
      const socket = new SockJS(socketUrl);
      client.current = Stomp.over(socket);
      client.current.debug = console.log;

      client.current.connect(
        {},
        () => {
          console.log("✅ Connected to WebSocket.");
          client.current.subscribe(`/topic/vote/${postid}`, (message) => {
            const voteData = JSON.parse(message.body);
            if (!Array.isArray(voteData)) {
              console.error("Invalid vote data:", voteData);
              return;
            }
            console.log("📩 New vote data received:", voteData);

            // 기존 options 순서대로 데이터를 정렬
            const updatedVotes = options.map((option) => {
              const found = voteData.find((v) => v.voteOption === option);
              return { name: option, votes: found ? found.voteCount : 0 };
            });

            setVotes(updatedVotes);
            setTotalVotes(
              updatedVotes.reduce((sum, { votes }) => sum + votes, 0)
            );
          });
        },
        (error) => {
          console.error("❌ WebSocket connection failed:", error);
        }
      );
    };

    if (client.current) {
      client.current.disconnect(() => {
        client.current = null;
        initiateConnection();
      });
    } else {
      initiateConnection();
    }

    return () => {
      if (client.current) {
        client.current.disconnect(() => {
          console.log("🛑 WebSocket disconnected.");
        });
        client.current = null;
      }
    };
  }, [postid, options]);

  const handleVote = (optionName) => {
    if (!client.current) return;

    const voteRequest = { voteOption: optionName, userId };
    client.current.send(
      `/ws-community/vote/${postid}`,
      {},
      JSON.stringify(voteRequest)
    );

    setVotes((prevVotes) => {
      return prevVotes.map((option) => {
        if (option.name === optionName) {
          return { ...option, votes: option.votes + 1 };
        }
        if (option.name === selectedOption) {
          return { ...option, votes: option.votes - 1 };
        }
        return option;
      });
    });

    setSelectedOption((prev) => (prev === optionName ? null : optionName));
    setVoted(true);
  };

  return (
    <div className="w-full py-2">
      <div className="pb-1 pe-1 text-right text-[1.8dvh] text-[#b4b4b4]">
        1개 선택 가능, 총 {totalVotes}명 참여
      </div>
      {!voted ? (
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleVote(option)}
              className="h-10 w-full p-3 border rounded-lg text-left flex items-center bg-[#eaecef]"
            >
              <div className="w-full flex justify-between">
                {option}
                <span className="text-[#acadae]">○</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {votes.map(({ name, votes }) => {
            const percentage = totalVotes
              ? Math.round((votes / totalVotes) * 100)
              : 0;
            return (
              <button
                key={name}
                onClick={() => handleVote(name)}
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
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VoteComponent;
