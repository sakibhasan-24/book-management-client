import React, { useEffect, useState } from "react";
import useGetBooks from "../../hooks/books/useGetBooks";
import BookCard from "../homepageitems/BookCard";

export default function TopBooks() {
  const [topBooks, setTopBooks] = useState([]);
  const { getAllBooks } = useGetBooks();
  useEffect(() => {
    const fetchData = async () => {
      const books = await getAllBooks();
      setTopBooks(books.topRatedBooks);
    };
    fetchData();
  }, []);
  if (topBooks.length === 0) return null;
  // console.log(topBooks);
  return (
    <div className="w-full sm:max-w-6xl mx-auto   p-4">
      <h1 className="text-3xl font-bold text-center my-4 bg-green-500 text-white p-4 rounded-lg">
        Top Rated Books
      </h1>
      <div className="flex flex-wrap gap-1">
        {topBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
