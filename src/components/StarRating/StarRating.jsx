import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { postFishBunRating } from "../../api/service.js";
import styles from "../../components/modals/Modal.module.css";
import { showAlert } from "../modals/AlertModal.js";

const StarRating = ({ avgRating, flavorId, refreshData, myRating }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(avgRating ?? 0); // 임시 별점 (모달 내 변경값)
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => {
    setTempRating(myRating ?? 0); // 기존 별점 유지
    setIsModalOpen(true);
  };

  const handleTempRatingChange = (newRating) => {
    setTempRating(newRating);
  };

  useEffect(() => {
    if (myRating === null || myRating === undefined) {
      setRating(0); // 별점 안 줬을 때는 0점
    } else {
      setRating(avgRating ?? 0); // 별점 준 이후엔 평균 별점 보여줌
    }
  }, [myRating, avgRating]);

  const confirmRating = async () => {
    try {
      if (!tempRating) {
        console.warn("별점이 선택되지 않았습니다!");
        return;
      }

      await postFishBunRating(flavorId, tempRating); // 서버 전송
      // console.log("서버 전송 완료! 선택한 별점:", tempRating);

      refreshData();
    } catch (error) {
      // console.error("별점 전송 실패:", error);
    } finally {
      setIsModalOpen(false); // 성공/실패 관계없이 모달 닫기
    }
  };

  const showInfo = async () => {
    setIsModalOpen(false);

    showAlert(
      "나의 별점 설정 후 도감에 표시되는 별점은 전체 사용자가 매긴 별점의 평균값입니다."
    );
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center py-2 gap-4">
        <div className="" onClick={openModal}>
          <StarRatings
            rating={rating}
            starRatedColor="gold"
            starHoverColor="orange"
            numberOfStars={5}
            starDimension="25px"
            starSpacing="5px"
          />
        </div>
        <div className="text-sz22 font-semibold pt-1">
          <span className="" onClick={openModal}>
            {avgRating === null || avgRating === 0
              ? "평점 없음"
              : `${rating.toFixed(1)}점`}
          </span>
          <button
            className="text-sz20 text-[#bdbdbd] px-2 py-3 z-40"
            onClick={showInfo}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={`${styles.modalOverlay} !fixed`}>
          <div
            className={`${styles.modalContent} absolute flex items-center !p-6 gap-y-3 top-[30%]`}
          >
            <div className="w-full flex flex-col items-center">
              <div className="text-sz35 font-semibold">별점을 선택하세요</div>
              <div className="text-center text-sz18 pb-4 text-gray-600">
                {myRating !== null
                  ? `나의 이전 별점은 ${myRating.toFixed(1)}점이에요!`
                  : "아직 별점을 주지 않았습니다."}
              </div>
            </div>
            <StarRatings
              rating={tempRating}
              starRatedColor="gold"
              starHoverColor="orange"
              changeRating={handleTempRatingChange}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="5px"
            />
            <div className="flex justify-center gap-2  w-full">
              <button
                className="mt-4  text-[#1069b0] 
 border-4 py-2 px-6 rounded-full text-sz25 tracking-[.25em]
 flex items-center gap-2 justify-center w-1/2"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="mt-4 bg-[#1069b0] hover:bg-white hover:text-[#1069b0] text-white 
                 border-4 py-2 px-6 rounded-full text-sz25 tracking-[.25em]
                 flex items-center gap-2 justify-center w-1/2"
                onClick={confirmRating}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StarRating;
