import makeApiCall from ".";
import { setToken } from "..";
import {
  ForgetPasswordReqPayload,
  LoginInRequestPayload,
  ResetPasswordReqPayload,
  SignUpRequestPayload,
} from "../../types";

export async function signUp(payload: SignUpRequestPayload) {
  const response = await makeApiCall("/auth/signup", "post", payload);
  setToken(response.token);
}
export async function login(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/auth/login", "post", payload);
  setToken(response.token);
}

export async function forgotpassword(payload: ForgetPasswordReqPayload) {
  const response = await makeApiCall("/auth/forgotpassword", "post", payload);
  return response;
}

export async function resetpassword(payload: ResetPasswordReqPayload) {
  const response = await makeApiCall(`/auth/resetpassword`, "patch", payload);
  return response;
}
export async function verifyEmail(payload: any) {
  const response = await makeApiCall(
    `/auth/verifyemail/${payload}`,
    "get"
  );
  return response;
}
