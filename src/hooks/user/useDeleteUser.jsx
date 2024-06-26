import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useDeleteUser() {
  const [deleteing, setDeleting] = useState(false);
  const axiosPublic = useApiCall();

  const deleteUser = async (id) => {
    setDeleting(true);
    try {
      const res = await axiosPublic.delete(`/api/user/delete/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };
  return { deleteing, deleteUser };
}
