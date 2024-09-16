import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useDeliveryMan() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deliveryManLogin = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/deliveryman/login", data);
      //   console.log(response);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const deliveryManLogOut = async () => {
    const res = await axiosPublic.get("/api/deliveryman/logout");
    return res.data;
  };
  return {
    deliveryManLogin,
    loading,
    error,
    deliveryManLogOut,
  };
}
