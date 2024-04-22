import axios from "axios";
import { LOGOUT_KEY, TOKEN_KEY } from "./constants";

const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } =
  import.meta.env;

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

export const generateCloudinaryURL = async (file: File, coursename: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `moocs_resources/${coursename}`);
    formData.append("cloud_name", VITE_CLOUDINARY_CLOUD_NAME);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "post",
        body: formData,
      }
    );
    let res = await response.json();
    return res.secure_url;
  } catch {
    (err: any) => console.log(err);
  }
};
