import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import Aos from "aos";
import useCreateBooks from "../../hooks/books/useCreateBooks";
import StarRatings from "react-star-ratings";

export default function BookCard({ book }) {
  // console.log(book);
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.user);
  const { loading, getReviewById } = useCreateBooks();
  const [reviewInfo, setReviewInfo] = useState(null);
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  // console.log(book.bookReviews.length);
  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getReviewById(id);
      setReviewInfo(res);
    };
    if (book?._id) {
      fetchData(book._id);
    }
  }, [book?._id]);
  return (
    <div
      className="max-w-xs w-full sm:w-72 my-6 p-4 rounded-lg mx-auto shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
      data-aos="fade-up"
    >
      <div className="overflow-hidden rounded-lg border border-gray-300 mb-4">
        <img
          src={book.imagesUrls[0]}
          alt={book.title}
          className="w-full h-36 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>
      <div>
        {book?.bookReviews?.length === 0 && (
          <p className="my-2 text-sm text-gray-500 text-center">
            No Reviews yet
          </p>
        )}
        {reviewInfo && reviewInfo?.data?.totalReviews > 0 && (
          <div className="flex items-center justify-center my-2">
            <StarRatings
              rating={reviewInfo?.data?.finalAverageRating}
              starRatedColor="#f1c40f"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {book.title}
        </h1>
        {/* <h2 className="text-md font-semibold text-center text-gray-600 mb-4">
          Address
        </h2> */}
        {/* <div className="text-center flex flex-wrap justify-center items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-600" />
            <p className="bg-green-600 text-white px-3 py-1 rounded-full">
              Area: {book.address.area}
            </p>
          </div>
          <div className="flex items-center  gap-1">
            <FaMapMarkerAlt className="text-amber-600" />
            <p className="bg-amber-600 text-white px-3 py-1 rounded-full">
              City: {book.address.city}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <FaUniversity className="text-teal-600" />
            <p className="bg-teal-600 text-white px-3 py-1 rounded-full">
              University: {book.address.universityName}
            </p>
          </div>
        </div> */}
        <p className="font-bold text-lg text-center text-gray-700 mb-4">
          Price: {book?.price} BDT
        </p>
        <div className="flex  items-center justify-center gap-3">
          {/* {currentUser && currentUser.user._id === book.bookOwner && (
            <Link
              to={`/dashboard/update/${book._id}`}
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Edit
            </Link>
          )} */}

          <Link to={`/book/${book._id}`}>
            <button className="bg-gray-500 text-white p-2  rounded-md hover:bg-gray-600 transition-colors duration-300">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
