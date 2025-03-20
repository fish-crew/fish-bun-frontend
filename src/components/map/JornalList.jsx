import React from "react";
import { formatDate } from "../../utils";

const JornalList = ({ journal = [] }) => {
  return (
    <>
      <div className="flex items-center justify-center text-xs text-point-color">
        {journal.length > 0 ? (
          <>
            <span className="font-bold">{journal[0]?.title || "팥냥이"}</span>
            <span>님 외</span>
            <span className="font-bold">{journal.length - 1 || 0}</span>
            <span>명이 탐험을 완료했어요!</span>
          </>
        ) : (
          <span>
            아직 아무도 탐험하지 않았어요. 첫 번째 탐험자가 되어보세요!
          </span>
        )}
      </div>

      {journal.map((item) => (
        <div
          key={item.id}
          className="border-2 border-dashed border-[#b7d3e4] w-full p-2 my-1 flex items-center"
        >
          <img
            src={item.fileUrl || "/assets/webp/bun.webp"}
            alt="일지 이미지"
            width={116}
            height={113}
            className="rounded mr-2"
            onError={(event) =>
              (event.target.src = "/assets/webp/flavorIcons/cheese.webp")
            }
          />
          <div className="flex flex-col justify-between text-start w-[calc(100%-80px)] gap-2">
            <div className="flex justify-between items-end">
              <span className="font-bold text-point-color text-[20px]">
                {item.nickname || "팥냥이"}
              </span>
              <span className="text-[0.65rem] text-gray-400">
                {formatDate(item.date)}
              </span>
            </div>
            <p className="text-xs text-gray-800 text-wrap w-full">
              {item.contents}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default JornalList;
