import axiosInstance from "./axiosInstance";

// 登錄
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem("token", token); // 保存 Token
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Login failed");
  }
};

// 註冊
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};

// 獲取當前用戶資訊
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to fetch user");
  }
};

// 登出（清除本地 Token）
export const logout = () => {
  localStorage.removeItem("token");
};
