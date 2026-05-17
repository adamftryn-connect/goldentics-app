import axios from "axios";

const HF_TIMEOUT_MS = 15000;
const HF_MAX_RETRIES = 2;
const HF_RETRY_DELAY_MS = 1000;

function createHfClient() {
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  const apiUrl = process.env.HUGGING_FACE_API_URL;

  if (!apiKey || !apiUrl || apiKey === "your_api_key_here") {
    return null;
  }

  return axios.create({
    baseURL: apiUrl,
    timeout: HF_TIMEOUT_MS,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function callHuggingFacePrediction(payload) {
  const client = createHfClient();

  if (!client) {
    return null;
  }

  let lastError;

  for (let attempt = 0; attempt <= HF_MAX_RETRIES; attempt++) {
    try {
      const { data } = await client.post("", payload);
      return data;
    } catch (error) {
      lastError = error;
      const isRetryable =
        !error.response ||
        error.response.status === 503 ||
        error.response.status >= 500;

      if (attempt < HF_MAX_RETRIES && isRetryable) {
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

export function isHuggingFaceConfigured() {
  const apiKey = process.env.HUGGING_FACE_API_KEY;
  const apiUrl = process.env.HUGGING_FACE_API_URL;
  return Boolean(
    apiKey &&
      apiUrl &&
      apiKey !== "your_api_key_here" &&
      !apiUrl.includes("your-model")
  );
}
