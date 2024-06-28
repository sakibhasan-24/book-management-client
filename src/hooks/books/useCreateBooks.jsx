import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useCreateBooks() {
  const axiosPublic = useApiCall();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const createBook = async (data) => {
    setLoading(true);
    try {
      const response = await axiosPublic.post("/api/books/create-book", data);
      return response.data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { error, loading, createBook };
}
