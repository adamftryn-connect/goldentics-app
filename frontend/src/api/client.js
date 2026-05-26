import axios from "axios";

const apiClient = axios.create({
  // Dev: gunakan proxy Vite via "/api"
  // Prod (mis. Vercel): set VITE_API_BASE_URL=https://<backend-public-url>/api
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
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
