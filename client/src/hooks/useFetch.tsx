import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASEURL;
const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async (access_token: any) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `${baseURL}/googlesignin`,
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message ? "connection error" : error.response.data.message,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          theme: "colored",
        }
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleGoogle };
};

export default useFetch;
