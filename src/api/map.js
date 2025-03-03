import axiosInstance from "./axiosInstance";

export const fetchStoreInfo = async ({ maxLat, maxLng, minLat, minLng }) => {
  try {
    const response = await axiosInstance.get("/fish-bun/store", {
      params: {
        maxLat,
        maxLng,
        minLat,
        minLng,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating first login status:", error);
    throw error;
  }
};

export const fetchStoreDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/fish-bun/store/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching store detail:", error);
    throw error;
  }
};

export const postStoreInfo = async (store) => {
  try {
    const response = await axiosInstance.post("/fish-bun/store", store);
    return response.data;
  } catch (error) {
    console.error("가게 정보를 등록하는 데 실패했습니다:", error);
    throw error;
  }
};

export const patchStoreInfo = async (id, store) => {
  try {
    const response = await axiosInstance.patch(`/fish-bun/store/${id}`, store);
    return response.data;
  } catch (error) {
    console.error("가게 정보를 수정하는 데 실패했습니다:", error);
    throw error;
  }
};
