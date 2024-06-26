import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useGetAllUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const axiosPublic = useApiCall();
  const getAllUsers = async () => {
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
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.delete(`/api/user/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getAllUsers, users, setUsers, deleteUser };
}
