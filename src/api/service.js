import axiosInstance from "./axiosInstance";

//공통 함수로 로직 개선하는 방법도 나중에 생각
//get
export async function fetchUserData() {
  try {
    const response = await axiosInstance.get("/fish-bun/user/info");
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchMainPageData() {
  try {
    const response = await axiosInstance.get("/fish-bun/main");
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchRegisterSuccessPageData(id) {
  try {
    const response = await axiosInstance.get(
      `/fish-bun/detail/save-success/${id}` //아직 api 없음
    );
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchBookPageData() {
  try {
    const response = await axiosInstance.get("/fish-bun/book/user");
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchCalendarPageData(date) {
  try {
    const response = await axiosInstance.get(`/fish-bun/calendar/${date}`);
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchDetailPageData(id) {
  try {
    const response = await axiosInstance.get(`/fish-bun/calendar/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchFlavorData() {
  try {
    const response = await axiosInstance.get("/fish-bun/flavors");
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchBookDetailData(flavorId) {
  try {
    const response = await axiosInstance.get(
      `/fish-bun/book/detail/${flavorId}`
    );
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchBungbalData() {
  try {
    const response = await axiosInstance.get("/bungbal/stats");
    return response.data?.additionalData?.total || 0;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchMbtiData() {
  try {
    const response = await axiosInstance.get("/bungbal/stats");
    return response;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchDebateListData() {
  try {
    const response = await axiosInstance.get("/fish-bun/community");
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchDebatePostData(postid) {
  try {
    const response = await axiosInstance.get(`/fish-bun/community/${postid}`);
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

export async function fetchDebateCommentsData(postid) {
  try {
    const response = await axiosInstance.get(
      `/fish-bun/community/${postid}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("데이터 요청 실패:", error);
    throw error;
  }
}

//post
export async function postNickNameAddData(nickname) {
  try {
    const response = await axiosInstance.post(
      "/fish-bun/user/set-nickname", // API 엔드포인트
      { nickname } // 객체 형태로 데이터 전달
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function postRegisterData(registerData) {
  try {
    const response = await axiosInstance.post(
      "/fish-bun/detail/save", // API 엔드포인트
      registerData, // FormData 객체
      {
        headers: {
          // Content-Type 설정 생략 가능: Axios가 자동으로 처리
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function postReportData(flavors) {
  try {
    const response = await axiosInstance.post(
      "/fish-bun/report", // API 엔드포인트
      { flavors } // 요청 본문에 전달할 데이터
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export const updateFirstLogin = async () => {
  try {
    const response = await axiosInstance.post(
      "/fish-bun/user/update-first-login"
    );
    return response.data;
  } catch (error) {
    console.error("Error updating first login status:", error);
    throw error;
  }
};

export async function postMbtiData(mbti) {
  try {
    const response = await axiosInstance.post(
      "/bungbal/stats/count", // API 엔드포인트
      { mbti } // 요청 본문에 전달할 데이터
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function updateCalendarDetailContents(calendarId, contents) {
  try {
    const response = await axiosInstance.post(
      "/fish-bun/calendar/detail/mod-contents",
      { calendarId, contents } // 요청 본문에 전달할 데이터
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}


export async function postFishBunRating(flavorId, rating) {
  try {
    const response = await axiosInstance.patch(
      `/fish-bun/book-rating/${flavorId}`,
      { rating }
    );
    return response.data;
  } catch (error) {
    console.error("PATCH 요청 실패:", error);
    throw error;
  }
}

export async function postDebateComment(postId, contents) {
  try {
    const response = await axiosInstance.post(
      `/fish-bun/community/${postId}/comment`,
      { contents }, // 요청 본문에 전달할 데이터
      {
        headers: {
          // Content-Type 설정 생략 가능: Axios가 자동으로 처리
        },
      },
      { withCredentials: true } // 쿠키 포함
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function postCommentLikes(commentId) {
  try {
    const response = await axiosInstance.post(
      `/fish-bun/community/comment-likes/${commentId}`,
      { commentId }
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

export async function postCommentRecommend(contents) {
  try {
    const response = await axiosInstance.post(
      `/fish-bun/community/post/report`,
      { contents }
    );
    return response.data;
  } catch (error) {
    console.error("POST 요청 실패:", error);
    throw error;
  }
}

//PATCH
export async function patchComment(commentId, contents) {
  try {
    const response = await axiosInstance.patch(
      `/fish-bun/community/comments/${commentId}`,
      { contents }, // 요청 본문
      {
        withCredentials: true, // 옵션 객체는 headers와 함께 같은 레벨에서 전달해야 합니다.
        headers: {
          // Content-Type 설정 생략 가능: Axios가 자동으로 처리
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("PATCH 요청 실패:", error);
    throw error;
  }
}

//DELETE
export async function deleteComment(commentId) {
  try {
    const response = await axiosInstance.delete(
      `/fish-bun/community/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("DELETE 요청 실패:", error);
    throw error;
  }
}
