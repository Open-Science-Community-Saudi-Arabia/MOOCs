import axios, { AxiosRequestConfig } from "axios";
import { TOKEN_KEY } from "../constants";
import { ToastContainer, toast } from "react-toastify";

const token = localStorage.getItem(TOKEN_KEY);
const baseURL = import.meta.env.VITE_API_BASEURL;

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

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
      const serverMessage = error.response?.data?.message;

      if (
        serverMessage ||
        error.response.status === 403 ||
        error.response.status === 500
      ) {
        localStorage.removeItem(TOKEN_KEY);
        window.location.assign("/login");
      }
      toast.error(serverMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        theme: "colored",
      });
      throw new Error(serverMessage);
    }
    // throw errors that happen in the browser as is
    throw new Error(error.message);
  }
}

export default makeApiCall;
