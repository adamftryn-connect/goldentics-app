//Kontrak API selaras dengan backend Express menghubungkan halaman React ke API.
import apiClient from "./client.js";

const AUTH_RETRY_DELAY_MS = 400;

async function postWithRetry(url, payload, maxAttempts = 2) {
  let lastError;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      return await apiClient.post(url, payload);
    } catch (err) {
      lastError = err;
      const canRetry = err?.retryable && attempt < maxAttempts - 1;
      if (!canRetry) throw err;
      await new Promise((r) => setTimeout(r, AUTH_RETRY_DELAY_MS));
    }
  }
  throw lastError;
}

export async function getGoldHistory(params = {}) {
  const { data } = await apiClient.get("/gold-history", { params });
  return data.data;
}

export async function getLatestGoldPrice() {
  const { data } = await apiClient.get("/gold-price/latest");
  return data.data;
}

export async function getGoldStatsSummary(days = 7) {
  const { data } = await apiClient.get("/gold-stats/summary", {
    params: { days },
  });
  return data.data;
}

// Tab Grafik - limit hari (data harian)
export const GRAFIK_TAB_LIMITS = {
  "7 Hari": 7,
  "1 Bulan": 30,
  "3 Bulan": 90,
  "1 Tahun": 365,
};

export async function postPredict(payload) {
  const { data } = await apiClient.post("/predict", payload);
  return data.data;
}

export async function getPredictHistory(params = {}) {
  const { data } = await apiClient.get("/predict-history", { params });
  return data.data;
}

export async function registerUser(payload) {
  const { data } = await postWithRetry("/auth/register", payload);
  if (data.data?.token) {
    localStorage.setItem("goldentics_token", data.data.token);
  }
  return data.data;
}

export async function loginUser(payload) {
  const { data } = await postWithRetry("/auth/login", payload);
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

export const PREDICTION_PERIOD_OPTIONS = [
  { label: "7 Hari ke depan", days: 7 },
];
