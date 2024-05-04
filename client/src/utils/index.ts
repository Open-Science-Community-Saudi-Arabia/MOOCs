import axios from "axios";
import { LOGOUT_KEY, TOKEN_KEY, USERID } from "./constants";

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
export function setUserId(id: string) {
  localStorage.setItem(USERID, id);
}

export function getUserId() {
  let userId = localStorage.getItem(USERID);
  if (!userId) {
    window.location.assign("/login");
  }
  return userId;
}

export function storeData(access_token: string, userId: string) {
  window.localStorage.removeItem(LOGOUT_KEY);
  setToken(access_token);
  setUserId(userId);

}
export const logout = async () => {
  axios.defaults.headers.common.Authorization = "";
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USERID);
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

export const parsedData = async (data: any) => {
  let coursesection = await Promise.all(
    data.coursesection.map(async (item: any, i: number) => {
      let resources = await Promise.all(
        item.resources.map(async (ele: any) => {
          if (ele.type === "video") {
            return (ele = {
              type: ele.type,
              title: ele.title,
              description: ele.description,
              link: ele.link,
              // videoDuration:
            });
          }
          if (ele.type === "pdf") {
            return (ele = {
              type: ele.type,
              title: ele.title,
              description: ele.description,
              file: await generateCloudinaryURL(ele.file[0], data.title),
            });
          }
          if (ele.type === "quiz") {
            return (ele = {
              type: ele.type,
              title: ele.title,
              description: ele.description,
              quiz: ele.quiz,
              highest_score:0
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

// export const videoDuration = async (videoUrl: string) => {
//   const videoId = `LnSYihRoGA4`;

//   const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${YOUR_API_KEY}`;

//   const response = await fetch(url);
//   let res = await response.json();

//   console.log(res);
// };
