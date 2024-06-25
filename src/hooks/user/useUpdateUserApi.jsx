import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useUpdateUserApi() {
  const axiosPublic = useApiCall();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const updateUser = async (data) => {
    setLoading(true);
    try {
      const response = await axiosPublic.put(
        `api/user/update/${data.userId}`,
        data
      );
      console.log(response);
      setError(false);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, updateUser };
}
