/**
 * @category Client
 * @subcategory Utilities
 * @module Access token
 * @description This module contains manage token for the app,
 */

import axios from "axios";
import { LOGOUT_KEY, TOKEN_KEY, USERID } from "./constants";

const { VITE_CLOUDINARY_CLOUD_NAME, VITE_CLOUDINARY_UPLOAD_PRESET } =
  import.meta.env;



/**
 * @description Get user token from local storage
 * @return {string} token key
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * @description Set token in Authorization header and local storage.
 *  @param {token} string Token set in local storage and request header.
 */
export function setToken(token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * @description Set UserId local storage
 *  @param {Id} string userId set in local storage.
 */
export function setUserId(Id: string) {
  localStorage.setItem(USERID, Id);
}

/**
 * @description Get UserId from local storage and redirect to login if not exisitng
 *  @return {string} UserID
 */
export function getUserId() {
  let userId = localStorage.getItem(USERID);
  if (!userId) {
    window.location.assign("/login");
  }
  return userId;
}

/**
 * @description Store token and userId data in local storage
 *  @param {string} UserID
 */
export function storeData(access_token: string, userId: string) {
  window.localStorage.removeItem(LOGOUT_KEY);
  setToken(access_token);
  setUserId(userId);
}

/**
 * @description Logout current user and redirect to login 
 *  @return {string} UserID
 */
export const logout = async () => {
  axios.defaults.headers.common.Authorization = "";
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USERID);
  window.localStorage.setItem(LOGOUT_KEY, Date.now().toString());
  window.location.assign("/login");
};

/**
 * @description Get url for each pdf files in creating course. 
 *  @param {file} file
 *  @param {string} Coursename
 *  @return {string} url
 */
export const generateCloudinaryURL = async (file: File, coursename: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", `moocs_resources/pdfs/${coursename}`);
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

/**
 * @description Parse course data to remove empty fields
 *  @param {object} data
 *  @return {object} data
 */
export const parsedData = async (data: any) => {
  let coursesection = await Promise.all(
    data.coursesection.map(async (item: any, i: number) => {
      let resources = await Promise.all(
        item.resources.map(async (ele: any) => {
          if (ele.type === "video") {
            return (ele = {_id:ele._id,
              type: ele.type,
              title: ele.title,
              description: ele.description,
              link: ele.link,
            });
          }
          if (ele.type === "pdf") {
            return (ele = {_id:ele._id,
              type: ele.type,
              title: ele.title,
              description: ele.description,
              file:
                typeof ele.file === "string"
                  ? ele.file
                  : await generateCloudinaryURL(ele.file[0], data.title),
            });
          }
          if (ele.type === "quiz") {
            return (ele = {_id:ele._id,
              type: ele.type,
              title: ele.title,
              description: ele.description,
              quiz: ele.quiz,
              highest_score: 0,
            });
          }
          return ele;
        })
      );

      return { ...item, resources };
    })
  );
  return { ...data, coursesection };
};
