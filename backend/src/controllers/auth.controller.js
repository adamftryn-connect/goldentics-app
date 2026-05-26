import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../services/auth.service.js";
import { sendSuccess } from "../utils/response.js";

export async function registerHandler(req, res, next) {
  try {
    const { email, password, fullName } = req.body ?? {};
    const data = await registerUser({ email, password, fullName });
    return sendSuccess(res, data, 201);
  } catch (error) {
    next(error);
  }
}

export async function loginHandler(req, res, next) {
  try {
    const { email, password } = req.body ?? {};
    const data = await loginUser({ email, password });
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}

export async function meHandler(req, res, next) {
  try {
    const data = await getUserProfile(req.user.id);
    return sendSuccess(res, data);
  } catch (error) {
    next(error);
  }
}
