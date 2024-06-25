import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useGoogleSignIn() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const googleSignIn = async (info) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post("/api/user/googlesignin", info);
      return res.data;
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };
  return { googleSignIn, loading };
}
