import React, { useState } from "react";
import useApiCall from "../apicall/publicApi/useApiCall";

export default function useUserLogin() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userLogin = async (userData) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/user/signin", userData);
      //   console.log(res);
      setError(null);
      return res;
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return { userLogin, loading, error };
}
