import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASEURL;
const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async (response: any) => {
    try {
      setLoading(true);
      await axios({
        method: "post",
        url: `${baseURL}/auth/googlesignin`,
        headers: {
          Authorization: `Bearer ${response.credential}`,
          "Content-Type": "application/json",
        },
      }).then((responsedata) => {
        const tokenAccess = responsedata.data.token;
        setToken(tokenAccess);
        return window.location.assign("/dashboard");
      });
    } catch (error: any) {
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
