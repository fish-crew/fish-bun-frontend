import React from "react";

const JornalList = ({ journal = [] }) => {
  return (
    <>
      <div className="flex items-center justify-center text-xs text-point-color">
        <span className="font-bold">{journal[0].title || "팥냥이"}</span>
        <span>{"님 외"}</span>
        <span className="font-bold">{journal.length - 1 || 0}</span>
        <span>{"명이 탐험을 완료했어요!"}</span>
      </div>

      {journal.map((item) => (
        <div
          key={item.id}
          className="border-2 border-dashed border-[#b7d3e4] w-full p-2 my-1 flex items-center"
        >
          <img
            src={item.image || "/assets/webp/bun.webp"}
            alt="일지 이미지"
            width={80}
            height={80}
            className="rounded"
          />
          <div className="flex flex-col text-start w-[calc(100%-80px)] pl-2">
            <div className="flex justify-between items-end mb-1">
              <span className="font-bold text-point-color">
                {item.nickname || "팥냥이"}
              </span>
              <span className="text-[0.65rem] text-gray-400">
                {new Date(item.date).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <p className="text-xs text-gray-800 text-wrap w-full">
              {item.description ||
                "sldfkjdslkfjsldkfjsdlkfdsjklfdslfkjsdklfjd slkfjsdlk   fjsdlkfjdslkfjsdlkfsjdflkds"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default JornalList;
