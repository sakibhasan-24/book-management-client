import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useGetBooks() {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllBooks = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/api/books/get-all-books");
      setBooks(res.data.books);
      return res.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getUserBooks = async (userId) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/api/books/get-all-books/${userId}`);
      setUserBooks(res.data.books);
      return res.data;
    } catch {
      setLoading(false);
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      const res = await axiosPublic.delete(`/api/books/delete-book/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      setUserBooks(userBooks.filter((book) => book._id !== bookId));
      return res.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    getAllBooks,
    books,
    loading,
    error,
    getUserBooks,
    userBooks,
    deleteBook,
    setBooks,
    setUserBooks,
  };
}
