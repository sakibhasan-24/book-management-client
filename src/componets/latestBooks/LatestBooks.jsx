import React, { useState, useEffect } from "react";
import useGetBooks from "../../hooks/books/useGetBooks";
import BookCard from "../homepageitems/BookCard";

export default function LatestBooks() {
  const { loading, getBooksByLatest } = useGetBooks();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBooksByLatest();
      setBooks(res.books);
    };
    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-4 sm:max-w-6xl mx-auto ">
      <h1 className="bg-green-600 text-white text-2xl text-center rounded-lg p-4">
        Latest Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3   gap-4 mt-4">
        {books.map((book) => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
}
