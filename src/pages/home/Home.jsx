import React, { useEffect, useState } from "react";
import Navbar from "../../componets/header/navbar/Navbar";
import AllBooks from "../../componets/homepageitems/AllBooks";
import UserSearchBooks from "../../componets/homepageitems/UserSearchBooks";
import TopBooks from "../../componets/topRatedBooks/TopBooks";
import CategoricalBooks from "../cartItems/categoricalBooks/CategoricalBooks";
import LatestBooks from "../../componets/latestBooks/LatestBooks";
import Banner from "../../componets/Banner/Banner";
import ProjectFeatures from "../../componets/features/ProjectFeatures";
import AboutUs from "../../componets/about/AboutUs";
import UpcomingFeatures from "../../componets/upcomingFeatures/UpcomingFeatures";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useRentBooks from "../../hooks/books/useRentBooks";
import {
  clearNotice,
  setNumberOfBooks,
} from "../../redux/notifications/notificationSlice";
import Footer from "../../componets/footer/Footer";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const { notification } = useSelector((state) => state);
  const { getAllRentBooks } = useRentBooks();
  const [rentBooks, setRentBooks] = useState([]);
  // console.log(notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getAllRentBooks(id);
      // console.log(res?.rentBooks);
      setRentBooks(res.rentBooks);
    };
    fetchData(currentUser?.user?._id);
  }, [currentUser?.user?._id]);
  const today = new Date(); // Get today's date
  const numberOfRentBooks = rentBooks.filter((b) => {
    const returnDate = new Date(b.returnDate);
    return !b.isBack && returnDate < today; // Check if the book is not returned and the return date has passed
  });
  // const numberOfRentBooks = rentBooks.filter((b) => b.isBack === false);
  if (numberOfRentBooks.length === 0) {
    dispatch(clearNotice());
  }
  if (numberOfRentBooks.length > 0) {
    // setNumberOfBooks
    dispatch(setNumberOfBooks(numberOfRentBooks.length));
  }
  if (currentUser?.user?.role === "user" && notification?.numberOfBooks > 0) {
    Swal.fire({
      title: "You need to return books",
      text: "Please check",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
  return (
    <div>
      <UserSearchBooks />
      <Banner />
      <LatestBooks />
      <TopBooks />
      <CategoricalBooks />
      <AllBooks />
      <ProjectFeatures />
      <UpcomingFeatures />
      <AboutUs />
    </div>
  );
}
