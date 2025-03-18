import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { postFishBunRating } from "../../api/service.js";

const StarRating = ({ avgRating = 0, flavorId, refreshData, myRating = 0 }) => {
  const [rating, setRating] = useState(avgRating ?? 0); // 현재 별점
  const [tempRating, setTempRating] = useState(avgRating ?? 0); // 임시 별점 (모달 내 변경값)
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const openModal = () => {
    setTempRating(rating); // 기존 별점 유지
    setIsModalOpen(true);
  };

  const handleTempRatingChange = (newRating) => {
    setTempRating(newRating);
  };

  useEffect(() => {
    setRating(avgRating ?? 0);
  }, [avgRating]);

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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center py-2 gap-4" onClick={openModal}>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          starHoverColor="orange"
          numberOfStars={5}
          starDimension="25px"
          starSpacing="5px"
        />
        <div className="text-sz22 font-semibold pt-1">{rating.toFixed(1)}점</div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold pb-1">별점을 선택하세요</h2>
            <div className="text-center text-sz18 pb-4 text-gray-600">
              {myRating !== null ? `나의 이전 별점은 ${myRating.toFixed(1)}점이에요!` : "아직 별점을 주지 않았습니다."}
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
            <div className="flex justify-center gap-2 pt-6 w-full">
              <button
                className="px-4 py-2 w-1/2 bg-gray-300 text-center rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="px-4 py-2 w-1/2 bg-blue-500 text-white text-center rounded-md"
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
