import React, { useState, useEffect } from "react";

const VoteComponent = ({ options }) => {
  const [votes, setVotes] = useState(
    options.map((option) => ({ name: option, votes: 0 }))
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);

  // ✅ options 변경 시 votes 상태도 초기화
  useEffect(() => {
    setVotes(options.map((option) => ({ name: option, votes: 0 })));
  }, [options]);

  // 총 투표 수 계산
  const totalVotes = votes.reduce((sum, option) => sum + option.votes, 0);

  // 투표 처리
  const handleVote = (optionName) => {
    if (voted) return;

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
      {!voted ? (
        // ✅ 투표 전 UI
        <div className="space-y-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleVote(option)}
              className="h-10 w-full p-3 border rounded-lg text-left flex items-center -[#eaecef]"
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
                  <div className="whitespace-nowrap ">
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
