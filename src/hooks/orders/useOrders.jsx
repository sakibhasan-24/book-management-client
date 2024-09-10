import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useOrders() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const createOrder = async (order) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/order/createOrders", order);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, createOrder };
}
