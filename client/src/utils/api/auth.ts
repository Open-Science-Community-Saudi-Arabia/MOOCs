import makeApiCall from ".";
import {
  ForgetPasswordReqPayload,
  LoginInRequestPayload,
  ResetPasswordReqPayload,
  SignUpRequestPayload,
} from "../../types";

/**
 * @category Client App
 * @subcategory Utilities
 * @module Auth
 * @description This module contains the controllers for handling user authentication, including login, signup, password reset,
 */

/**
 * @description handle signup endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function signUp(payload: SignUpRequestPayload) {
  return await makeApiCall("/auth/signup", "post", payload);
}

/**
 * @description handle login endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function login(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/auth/login", "post", payload);
  return response;
}

/**
 * @description handle login endpoint
 * @param  {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function loginAdmin(payload: LoginInRequestPayload) {
  const response = await makeApiCall("/auth/login-admin", "post", payload);
  return response;
}


/**
 * @description handle forgot-password endpoint
 * @param   {object} payload  request data
 * @return {Promise<object>} response data
 */
export async function forgotpassword(payload: ForgetPasswordReqPayload) {
  const response = await makeApiCall("/auth/forgotpassword", "post", payload);
  return response;
}

/**
 * @description handle reset-password endpoint
 * @param   {object} payload  request data
 * @return {object} response data
 */
export async function resetpassword(payload: ResetPasswordReqPayload) {
  const response = await makeApiCall(`/auth/resetpassword`, "patch", payload);
  return response;
}
/**
 * @description handle verifyEmail endpoint
 * @param   {object} payload  request data
 * @return {object} response data
 */
export async function verifyEmail(payload: any) {
  const response = await makeApiCall(`/auth/verifyemail/${payload}`, "get");
  return response;
}
