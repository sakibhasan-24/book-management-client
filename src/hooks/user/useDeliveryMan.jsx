import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useDeliveryMan() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);

  const [deliveryMan, setDeliveryMan] = useState([]);
  const applyForDelivery = async (id, information) => {
    setLoading(true);
    try {
      console.log(id, information);
      const res = await axiosPublic.put(`/api/user/apply/${id}`, information);
      setDeliveryMan(res.data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const acceptUserRequest = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.put(`/api/user/accept/${id}`, {});
      setDeliveryMan(res.data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const rejectUserRequest = async (id) => {
    // setLoading(true);
    try {
      const res = await axiosPublic.put(`/api/user/reject/${id}`, {});
      setDeliveryMan(res.data);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    deliveryMan,
    applyForDelivery,
    loading,
    acceptUserRequest,
    rejectUserRequest,
  };
}
