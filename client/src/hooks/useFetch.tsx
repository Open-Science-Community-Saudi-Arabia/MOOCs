// useFetch.jsx
import { useState } from "react";

const useFetch = (url:string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogle = async (response:any) => {
    console.log(response)
  };
  return { loading, error, handleGoogle };
};

export default useFetch;