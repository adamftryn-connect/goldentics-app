import apiClient from "./client.js";

/**
 * Kontrak API selaras dengan backend Express.
 * Gunakan modul ini saat menghubungkan halaman React ke API.
 */

export async function getGoldHistory(params = {}) {
  const { data } = await apiClient.get("/gold-history", { params });
  return data.data;
}

export async function getLatestGoldPrice() {
  const { data } = await apiClient.get("/gold-price/latest");
  return data.data;
}

export async function postPredict(payload) {
  const { data } = await apiClient.post("/predict", payload);
  return data.data;
}

export async function getPredictHistory(params = {}) {
  const { data } = await apiClient.get("/predict-history", { params });
  return data.data;
}

export async function registerUser(payload) {
  const { data } = await apiClient.post("/auth/register", payload);
  if (data.data?.token) {
    localStorage.setItem("goldentics_token", data.data.token);
  }
  return data.data;
}

export async function loginUser(payload) {
  const { data } = await apiClient.post("/auth/login", payload);
  if (data.data?.token) {
    localStorage.setItem("goldentics_token", data.data.token);
  }
  return data.data;
}

export async function getMe() {
  const { data } = await apiClient.get("/auth/me");
  return data.data;
}

export function logoutUser() {
  localStorage.removeItem("goldentics_token");
}

/** Map label UI Prediksi → predictionDays backend */
export const PREDICTION_PERIOD_OPTIONS = [
  { label: "7 Hari ke depan", days: 7 },
  { label: "14 Hari ke depan", days: 14 },
  { label: "30 Hari ke depan", days: 30 },
  { label: "90 Hari ke depan", days: 90 },
];
