import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const axiosPublic = useApiCall();

  const signUpUser = async (userInfo) => {
    // console.log(userInfo);
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/user/signup", userInfo);
      //   console.table(response);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signUpUser };
}
