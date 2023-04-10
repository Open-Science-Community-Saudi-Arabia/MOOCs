import axios, { AxiosRequestConfig } from "axios";
import { TOKEN_KEY } from "../constants";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem(TOKEN_KEY);
const baseURL = import.meta.env.VITE_API_BASEURL;

/**
 * @category Frontend
 * @subcategory Endpoint
 * @module RequestConfig
 * @description This module handles Axios Request Config for API request.
 */

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
/**
 * @description Api request configuration
 * @param {string} url request url
 * @param {string} method request method
 * @param {object} payload request data
 * @param {AxiosRequestConfig} axiosRequestConfig  axiosRequestConfig
 * @return {Promise<object>} response data
 */
async function makeApiCall<T = any>(
  url: string,
  method: AxiosRequestConfig["method"] = "get",
  payload?: AxiosRequestConfig["data"],
  axiosRequestConfig?: Omit<AxiosRequestConfig, "url" | "method" | "data">
): Promise<T> {
  try {
    if (!baseURL || typeof baseURL !== "string") {
      throw new Error("VITE_API_BASEURL is not defined");
    }
    const { data } = await axios({
      url,
      method,
      data: payload,
      baseURL,
      ...axiosRequestConfig,
    });

    return data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 403) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "colored",
        });
        localStorage.removeItem(TOKEN_KEY);
        window.location.assign("/login");
      }
    }

    throw new Error(error.response?.data?.message || error.message);
  }
}

export default makeApiCall;
