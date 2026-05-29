import axios from "axios";

const HF_TIMEOUT_MS = 15000;
const HF_MAX_RETRIES = 2;
const HF_RETRY_DELAY_MS = 1000;

function getApiUrl() {
  return process.env.HUGGING_FACE_API_URL?.trim() ?? "";
}

function getApiKey() {
  const key = process.env.HUGGING_FACE_API_KEY?.trim() ?? "";
  if (!key || key === "your_api_key_here") {
    return null;
  }
  return key;
}

function isHfSpaceUrl(url) {
  try {
    return new URL(url).hostname.endsWith(".hf.space");
  } catch {
    return false;
  }
}

function buildRequestHeaders() {
  const headers = { "Content-Type": "application/json" };
  const apiKey = getApiKey();
  if (apiKey) {
    headers.Authorization = `Bearer ${apiKey}`;
  }
  return headers;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableError(error) {
  return (
    !error.response ||
    error.response.status === 503 ||
    error.response.status >= 500
  );
}

async function requestWithRetry(requestFn) {
  let lastError;

  for (let attempt = 0; attempt <= HF_MAX_RETRIES; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      if (attempt < HF_MAX_RETRIES && isRetryableError(error)) {
        await sleep(HF_RETRY_DELAY_MS * (attempt + 1));
        continue;
      }
      break;
    }
  }

  const message =
    lastError?.response?.data?.error ??
    lastError?.message ??
    "Hugging Face API error";

  const err = new Error(`Gagal melakukan prediksi: ${message}`);
  err.statusCode = 500;
  throw err;
}

export async function callHuggingFacePrediction(payload) {
  const apiUrl = getApiUrl();
  if (!apiUrl) {
    return null;
  }

  const headers = buildRequestHeaders();

  if (isHfSpaceUrl(apiUrl)) {
    const { data } = await requestWithRetry(() =>
      axios.get(apiUrl, { timeout: HF_TIMEOUT_MS, headers })
    );
    return data;
  }

  const { data } = await requestWithRetry(() =>
    axios.post(apiUrl, payload, { timeout: HF_TIMEOUT_MS, headers })
  );
  return data;
}

export function isHuggingFaceConfigured() {
  const apiUrl = getApiUrl();
  return Boolean(apiUrl && !apiUrl.includes("your-model") && !apiUrl.includes("sample-model"));
}
