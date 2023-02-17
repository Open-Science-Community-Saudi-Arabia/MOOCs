import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils";

const useFetch = (baseURL: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(" ");

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
    } catch (error) {
      setLoading(false);
      return error;
    }
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
