import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASEURL;
/**
 * @category Client App
 * @subcategory Hooks
 * @module useFetch
 * @description The hooks handles google sign up and login click events.
 * @returns {object} loading, handleGoogle
 * @component
 * @example
 *  const { handleGoogle, loading } = useFetch();
 */

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogle = async (code: any, role?: string) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: `${baseURL}/auth/googlesignin`,
        headers: {
          Authorization: `Bearer ${code}`,
          "Content-Type": "application/json",
        },
        data: {
          role:
            role === "User"
              ? "EndUser"
              : role === "Collaborator"
              ? "Admin"
              : null,
        },
      });

      if (response.data.success === true) {
        setToken(response.data.data.access_token);
        if (response.data.data.user.role === "Admin") {
          navigate("/collaborator/dashboard");
        } else if (response.data.data.user.role === "EndUser") {
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error.message ? "Request failed, try again" : error.response.data.message,
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
