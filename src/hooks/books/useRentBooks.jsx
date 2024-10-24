import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useRentBooks() {
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAllRentBooks = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPublic.get(`api/books/getAllRentBooks/${id}`);
      // console.log(response.data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      // console.log(err);
    }
  };
  const backBook = async (bookId, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosPublic.put(
        `api/books/sentBookToStore/${bookId}`,
        data
      );
      //   console.log(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const blockUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.put(`api/books/blockUser/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const unBlockUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.put(`api/books/unBlockUser/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getAllOverDueUsers = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosPublic.get(`api/books/overDueUsers/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    getAllRentBooks,
    backBook,
    blockUser,
    unBlockUser,
    getAllOverDueUsers,
  };
}
