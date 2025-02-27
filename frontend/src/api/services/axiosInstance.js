import axios from "axios";

// 創建 axios 實例，設置基礎 URL 和默認配置
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api", // 可從 .env 獲取後端 URL
  timeout: 10000, // 請求超時設置
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器：自動添加認證 Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // 假設 Token 存儲在 localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 響應攔截器：處理錯誤
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 未授權，跳轉登錄頁或刷新 Token
      console.error("Unauthorized, redirecting to login...");
      // 可在此處添加跳轉邏輯
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
