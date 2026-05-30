import axios from "axios";

const apiClient = axios.create({
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
    const status = error.response?.status;
    const serverMessage = error.response?.data?.error;
    const isNetworkError = !error.response;

    let message =
      serverMessage ||
      error.message ||
      "Tidak dapat terhubung ke server";

    if (isNetworkError) {
      message =
        "Koneksi ke server terputus. Pastikan backend berjalan, lalu coba lagi.";
    } else if (status === 503) {
      message = serverMessage || "Layanan sementara tidak tersedia. Coba lagi.";
    } else if (status >= 500) {
      message = serverMessage || "Server sibuk. Silakan coba lagi.";
    }

    const wrapped = new Error(message);
    wrapped.retryable = isNetworkError || (status != null && status >= 500);
    wrapped.status = status;
    return Promise.reject(wrapped);
  }
);

export default apiClient;
