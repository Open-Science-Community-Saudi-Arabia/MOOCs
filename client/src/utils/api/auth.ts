import makeApiCall from ".";
import {
  ForgetPasswordReqPayload,
  LoginInRequestPayload,
  ResetPasswordReqPayload,
  SignUpRequestPayload,
} from "../../types";

/**
 * @category Client
 * @subcategory Utilities
 * @module User Authentication
 * @description This module contains the controllers for handling user authentication, including login, signup, password reset,
 */

const currentLanguage= localStorage.getItem("language");


/**
 * @description Signup endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function signUp(payload: SignUpRequestPayload) {
  return await makeApiCall("/auth/signup", "post", payload);
}

/**
 * @description Login endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function login(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/auth/login", "post", payload);
  return response;
}

/**
 * @description Admin login endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function loginAdmin(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/auth/login-admin", "post", payload);
  return response;
}

/**
 * @description Forgot-password endpoint
 * @param   {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function forgotpassword(payload: ForgetPasswordReqPayload) {
  const response = await makeApiCall("/auth/forgotpassword", "post", payload);
  return response;
}

/**
 * @description Reset-password endpoint
 * @param   {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function resetpassword(payload: ResetPasswordReqPayload) {
  const response = await makeApiCall(`/auth/resetpassword`, "patch", payload);
  return response;
}
/**
 * @description VerifyEmail endpoint
 * @param   {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function verifyEmail(payload: any) {
  const response = await makeApiCall(`/auth/verifyemail/${payload}`, "get");
  return response;
}

/**
 * @description User profile endpoint
 * @return {Promise<object>} response data
 */
export async function userProfile() {
  const response = await makeApiCall(`/auth/user`, "get");
  return response;
}
