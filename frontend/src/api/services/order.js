import axiosInstance from "./axiosInstance";

// 創建訂單
export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to create order");
  }
};

// 獲取訂單列表（根據用戶角色）
export const getOrders = async (role = "customer", filters = {}) => {
  try {
    const endpoint = role === "customer" ? "/orders" : `/orders/${role}`;
    const response = await axiosInstance.get(endpoint, { params: filters });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch orders");
  }
};

// 獲取單個訂單詳情
export const getOrderById = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch order");
  }
};

// 更新訂單狀態（如外送員更新配送狀態）
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axiosInstance.patch(`/orders/${orderId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to update order status"
    );
  }
};
