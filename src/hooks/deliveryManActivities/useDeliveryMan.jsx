import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useDeliveryMan() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAllDeliveryManProduct = async (id) => {
    setLoading(true);
    try {
      const { data } = await axiosPublic.get(
        `/api/order/getDeliveryManProducts/${id}`
      );
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      setError(error);
      return error;
    }
  };
  const updateOrder = async (deliveryStatus, id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.put(`/api/order/updateOrderStatus/${id}`, {
        deliveryStatus,
      });
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      setError(error);
      return error;
    }
  };
  return { loading, error, getAllDeliveryManProduct, updateOrder };
}
