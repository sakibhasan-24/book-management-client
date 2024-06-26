import React from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useUserSignOut() {
  const axiosPublic = useApiCall();

  const signOut = async () => {
    const response = await axiosPublic.get("/api/user/signout");
    return response;
  };
  return { signOut };
}
