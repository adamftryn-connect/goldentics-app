import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("goldentics_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (body && body.success === false) {
      return Promise.reject(new Error(body.error || "Permintaan gagal"));
    }
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      "Tidak dapat terhubung ke server";
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
