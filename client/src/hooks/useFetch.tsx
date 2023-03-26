import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASEURL;
const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = async (code: any) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `${baseURL}/auth/googlesignin`,
        headers: {
          Authorization: `Bearer ${code}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success === true) {
        setToken(response.data.data.access_token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message ? "request failed" : error.response.data.message,
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
