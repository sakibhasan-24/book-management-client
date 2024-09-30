import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useGetAllUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const axiosPublic = useApiCall();
  const getAllUsers = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axiosPublic.get("api/user/get-users");
      console.log(response.data.users);
      setUsers(response.data.users);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getUserById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.get(`/api/user/get-user/${id}`);
      return res.data;
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.delete(`/api/user/delete/${id}`);
      return res.data;
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const getAllDeliveryMan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPublic.get("api/user/getDeliveryMan");
      // console.log(response.data.users);
      setUsers(response.data.users);
      return response.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    getAllUsers,
    users,
    setUsers,
    deleteUser,
    getUserById,
    getAllDeliveryMan,
  };
}
