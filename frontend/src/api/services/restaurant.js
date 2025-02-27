import axiosInstance from "./axiosInstance";

// 獲取餐廳列表（支持篩選）
export const getRestaurants = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("/restaurants", {
      params: filters, // 如 { location: "Taipei", cuisine: "Chinese" }
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch restaurants"
    );
  }
};

// 獲取單個餐廳詳情
export const getRestaurantById = async (restaurantId) => {
  try {
    const response = await axiosInstance.get(`/restaurants/${restaurantId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch restaurant"
    );
  }
};

// 添加餐廳到收藏
export const addToFavorites = async (restaurantId) => {
  try {
    const response = await axiosInstance.post("/restaurants/favorites", {
      restaurantId,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to add to favorites"
    );
  }
};
