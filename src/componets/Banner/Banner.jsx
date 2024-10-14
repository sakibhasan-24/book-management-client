import { Carousel } from "antd";
import React, { useState, useEffect } from "react";
import useGetBooks from "../../hooks/books/useGetBooks";
import { Link } from "react-router-dom";
import SkeletonDesign from "../skeleton/SkeletonDesign";

export default function Banner() {
  const { loading, getBooksByLatest, getAllBooks } = useGetBooks();
  const [books, setBooks] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [showUIBooks, setShowUIBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const latestBooks = await getBooksByLatest();
      setBooks(latestBooks.books);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchTopBooks = async () => {
      const topRatedBooks = await getAllBooks();
      setTopBooks(topRatedBooks.topRatedBooks);
    };
    fetchTopBooks();
  }, []);

  useEffect(() => {
    if (books.length > 0 || topBooks.length > 0) {
      setShowUIBooks([...books, ...topBooks]);
    }
  }, [books, topBooks]);

  if (loading) {
    return <SkeletonDesign />;
  }
  return (
    <div className="w-full sm:max-w-6xl mx-auto p-4 rounded-md my-12">
      <Carousel autoplay>
        {showUIBooks?.length > 0 &&
          showUIBooks?.map((book, index) => (
            <div key={index} className="relative h-80 w-full">
              <img
                src={book?.imagesUrls[0]}
                alt={book.title}
                className="object-cover h-full w-full rounded-md transition-transform duration-500 ease-in-out transform hover:scale-105 brightness-90"
                style={{
                  filter: "brightness(0.8)",
                  transition: "filter 0.3s ease",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 flex flex-col justify-center items-center rounded-md text-white px-6 py-4">
                <h3 className="text-3xl font-bold mb-2 tracking-wide shadow-lg">
                  {book.title}
                </h3>
                <p className="text-lg font-semibold mb-4 shadow-md">
                  Price: BDT {book.price}
                </p>
                <Link
                  to={`/book/${book?._id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
}
