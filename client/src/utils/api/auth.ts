import makeApiCall from ".";
import { setToken } from "..";
import {
  ForgetPasswordReqPayload,
  LoginInRequestPayload,
  ResetPasswordReqPayload,
  SignUpRequestPayload,
} from "../../types";

export async function signUp(payload: SignUpRequestPayload) {
  return await makeApiCall("/signup", "post", payload);
}
export async function login(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/login", "post", payload);
  return response;
}
export async function googleLogin(payload:any) {
  const response = await makeApiCall("/googlesignin", "post", payload);
  return response;
}

export async function forgotpassword(payload: ForgetPasswordReqPayload) {
  const response = await makeApiCall("/forgotpassword", "post", payload);
  return response;
}

export async function resetpassword(payload: ResetPasswordReqPayload) {
  const response = await makeApiCall(`/resetpassword`, "patch", payload);
  return response;
}
export async function verifyEmail(payload: any) {
  const response = await makeApiCall(`/verifyemail/${payload}`, "get");
  return response;
}
