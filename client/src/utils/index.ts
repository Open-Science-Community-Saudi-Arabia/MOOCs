import axios from "axios";
import { LOGOUT_KEY, TOKEN_KEY } from "./constants";

/**
 * @category Client App
 * @subcategory Utilities
 * @module Token
 * @description This module contains token functions,
 */

/**
 * @description Get user token from local storage
 * @return {string} response data
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * @description Set token in Authorization header and local storage
 *  @param {token} string updatedToken
 */
export function setToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(TOKEN_KEY, token);
}

export const logout = async () => {
  axios.defaults.headers.common.Authorization = "";
  window.localStorage.removeItem(TOKEN_KEY);

  // to support logging out from all windows
  window.localStorage.setItem(LOGOUT_KEY, Date.now().toString());
  window.location.assign("/login");
};
