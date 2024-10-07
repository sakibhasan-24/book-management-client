import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useCreateBooks() {
  const axiosPublic = useApiCall();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reviewInfo, setReviewInfo] = useState({});
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
  const acceptBook = async (id, data) => {
    // console.log(data);
    setLoading(true);
    try {
      const response = await axiosPublic.put(`/api/books/confirmedBook/${id}`, {
        data,
      });
      return response;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const reviewBook = async (id, data) => {
    setLoading(true);
    try {
      const response = await axiosPublic.put(`/api/books/review/${id}`, data);
      console.log("s", response);
      return response;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      // console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };
  const getReviewById = async (id) => {
    setLoading(true);
    try {
      const response = await axiosPublic.get(`/api/books/review/${id}`);
      setReviewInfo(response.data);
      return response;
    } catch {
      setError(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getAllReviews = async (bookId) => {
    setLoading(true);
    try {
      const response = await axiosPublic.get(
        `/api/books/getAllReview/${bookId}`
      );
      return response;
    } catch {
      setError(error.message);
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    error,
    loading,
    createBook,
    acceptBook,
    reviewBook,
    getReviewById,
    reviewInfo,
    getAllReviews,
  };
}
