import React from "react";

import { postStoreLikes } from "../../api/map";

const Like = ({ store, refetch }) => {
  const toggleLike = () => {
    if (store?.id) {
      postStoreLikes({ storeId: store.id }).then((response) => {
        if (response.statusCode === "200" && refetch) {
          refetch();
        } else {
          alert("가게 좋아요를 누르는 데 실패했습니다.");
        }
      });
    }
  };

  return (
    <button onClick={toggleLike} className="min-w-[24px]">
      {store?.likeYn === "Y" ? (
        <img
          src="/assets/webp/cal-bun.webp"
          alt="full-icon"
          width={24}
          height={24}
        />
      ) : (
        <img
          src="/assets/webp/cal-bun-empty.webp"
          alt="empty-icon"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};

export default Like;
