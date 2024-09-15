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
  // get orders by ordersId
  const getOrdersById = async (id) => {
    setLoading(true);

    try {
      const res = await axiosPublic.get(`/api/order/getorder/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  // get orders by userId
  const getOrdersByUserId = async (id) => {
    setLoading(true);

    try {
      const res = await axiosPublic.get(`/api/order/getOrdersByUserId/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const paymentServer = async (data, id) => {
    setLoading(true);
    try {
      console.log("f", data, id);
      const res = await axiosPublic.put(
        `/api/order/createPayment/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    createOrder,
    getOrdersById,
    paymentServer,
    getOrdersByUserId,
  };
}
