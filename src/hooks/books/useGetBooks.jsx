import React, { useState } from "react";
import useApiCall from "../../apicall/publicApi/useApiCall";

export default function useGetBooks() {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const axiosPublic = useApiCall();
  const [loading, setLoading] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0);
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

  const getBookById = async (id) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/api/books/get-book/${id}`);
      return res.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateBook = async (bookId, book) => {
    setLoading(true);
    try {
      const res = await axiosPublic.put(
        `/api/books/update-book/${bookId}`,
        book
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const getAllType = async (queryParams = {}, startIndex = 0, limit = 3) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(
        `/api/books/all-type?startIndex=${startIndex}&limit=${limit}`, // Corrected query parameter syntax
        {
          params: queryParams,
        }
      );
      // console.log(res);
      setTotalBooks(res.data.totalBook);

      setBooks(res.data.books);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getBookBySearchAndCategory = async (queryParams = {}) => {
    setLoading(true);
    try {
      const res = await axiosPublic.get(`/api/books/getBookBySearch`, {
        params: queryParams,
      });
      console.log(res.data);
      setBooks(res.data);
      return res.data;
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllBooks,
    totalBooks,
    books,
    loading,
    error,
    getUserBooks,
    getBookBySearchAndCategory,
    userBooks,
    deleteBook,
    setBooks,
    setUserBooks,
    getBookById,
    updateBook,
    getAllType,
  };
}
