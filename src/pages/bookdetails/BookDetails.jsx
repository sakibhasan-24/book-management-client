import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Spin } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import ModalImage from "react-modal-image";
import useGetBooks from "../../hooks/books/useGetBooks";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import Spinner from "../../componets/loader/Spinner";
import Swal from "sweetalert2";
import useCreateBooks from "../../hooks/books/useCreateBooks";
import StarRatings from "react-star-ratings";
import TextArea from "antd/es/input/TextArea";
import Review from "./Review";
import { toast } from "react-toastify";
import { Datepicker } from "flowbite-react";
export default function BookDetails() {
  const params = useParams();
  const { getBookById } = useGetBooks();

  const { loading, acceptBook, reviewBook, getReviewById, getAllReviews } =
    useCreateBooks();

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // addToCart
  const [demoPages, setDemoPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [book, setBook] = useState(null);

  const [orderType, setOrderType] = useState("sell");
  const modalRef = useRef(null);
  const [isRentModal, setIsRentModal] = useState(false);
  const [rentDuration, setRentDuration] = useState(null);
  const checkedOrderType = orderType === "rent" && rentDuration;

  const navigate = useNavigate();

  // ratings
  const [reviewInfo, setReviewInfo] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userReview, setUserReview] = useState(null);
  const [allReviews, setAllReviews] = useState([]);

  // review Loading
  useEffect(() => {
    const fetchReview = async () => {
      const fetchedReview = await getAllReviews(params.bookId);
      // console.log(fetchedReview.data.reviews);
      setAllReviews(fetchedReview.data.reviews);
    };
    fetchReview();
  }, [params.bookId, userReview, reviewInfo]);
  // console.log(allReviews);
  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBookById(params.bookId);
      setBook(fetchedBook.book);
      setReviewInfo(fetchedBook?.book?.bookReviews);
      const userBookReview = fetchedBook?.book?.bookReviews?.find(
        (user) => user.user === currentUser?.user?._id
      );

      if (userBookReview) {
        setReviewInfo(userBookReview);
        setUserReview(userBookReview);
        setRating(userBookReview.rating);
        setComment(userBookReview.comment);
      }
      setDemoPages(fetchedBook.book.imagesUrls.slice(1)); // Slice from index 1 to end
    };
    fetchBook();
  }, [params.bookId]);
  // console.log(reviewInfo);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % demoPages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + demoPages.length) % demoPages.length
    );
  };

  const handleClose = () => {
    setCurrentIndex(null);
  };

  const handleModalClick = (e) => {
    if (e.target === modalRef.current) {
      setCurrentIndex(null);
    }
  };

  const showImage = (index) => {
    setCurrentIndex(index);
  };

  const handleRentPrice = (d, price) => {
    let rentPrice;
    const date = calculateDays(d);

    if (date <= 30) {
      rentPrice = price * 0.2;
    } else if (date <= 60) {
      rentPrice = price * 0.3;
    } else if (date <= 90) {
      rentPrice = price * 0.4;
    } else if (date <= 120) {
      rentPrice = price * 0.5;
    } else {
      rentPrice = price * 0.6;
    }

    return rentPrice;
  };

  const handleAddToCart = () => {
    // console.log("Add to cart clicked", book);

    const rentDays = calculateDays(rentDuration);

    if (orderType === "rent" && (rentDays < 30 || rentDays > 180)) {
      toast.error("Rent duration must be between 30 and 180 days.");
      return;
    }

    if (currentUser) {
      if (
        currentUser?.user?.isAdmin ||
        currentUser?.user?._id === book?.bookOwner
      ) {
        toast.error(`You can't add your own book to the cart`);
        return;
      }
    }

    dispatch(
      addToCart({
        ...book,
        orderType,
        returnDate: orderType === "rent" && rentDuration,
        durationDate: orderType === "rent" && calculateDays(rentDuration),

        price:
          orderType === "rent"
            ? handleRentPrice(rentDuration, book.price)
            : book.price,
      })
    );

    navigate("/cartItems");
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getReviewById(id);
      if (res.data) setReviewInfo(res.data);
    };
    if (book?._id) {
      fetchData(book._id);
    }
  }, [book?._id, userReview]);
  // hanlde accept Book
  const profit = book?.price * 0.5;
  const handleAcceptBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You have to pay ${book?.price * 0.5} to accept this book`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // call accept function
        const res = await acceptBook(id, profit);
        // console.log(res.data);
        if (res?.data) window.open(res.data, "_blank");
        // console.log(profit);
        if (book?.isAccepted) {
          setBook(...book);
        }
        Swal.fire("Accepted!", "Your file has been accepted.", "success");
      }
    });
  };

  // console.log(book);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    // console.log(rating, comment);
    try {
      const res = await reviewBook(book?._id, { rating, comment });
      // console.log(res);
      if (res.data) {
        // console.log(res.data);
        setBook({ ...book });
        const reviewUpdate = await getReviewById(book?._id);
        console.log(reviewUpdate);
        setReviewInfo(reviewUpdate.data);
        Swal.fire("Reviewed!", "Your review has been submitted.", "success");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const changeRating = (number) => {
    setRating(Number(number));
  };

  useEffect(() => {
    console.log(rating, comment);
  }, [rating, comment]);

  // console.log(rating, comment);

  console.log(isRentModal);
  const handleRentModal = () => {
    // setIsModalOpen(true);

    // setIsRentModal(true);

    setIsRentModal(false);
    // toast.success(isRentModal);
  };
  const handleCloseRentModal = () => {
    // setIsModalOpen(false);
    setIsRentModal(false);
    toast.success(isRentModal);
  };
  // console.log(rentDuration);

  // Helper function to calculate days difference
  const calculateDays = (date) => {
    const today = new Date();
    const timeDiff = date - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };
  const handleToggle = (value) => {
    setOrderType(value);
    if (value === "rent") {
      setIsRentModal(true);
      return;
    }
    if (value === "sell") {
      setIsRentModal(false);
      setRentDuration(null);
    }
  };
  if (!book)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="container w-full sm:max-w-6xl mx-auto my-12 ">
      <section className="w-full  my-6 flex flex-col sm:flex-row gap-8 items-center justify-between">
        <div>
          <img
            src={book?.imagesUrls[0]}
            alt="img"
            className="w-full  object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 p-4">
          <div>
            {book?.bookReviews.length === 0 && (
              <p className="text-gray-700 mb-2 text-center font-bold text-xl">
                <strong>Review:</strong> No reviews yet
              </p>
            )}
            {reviewInfo && reviewInfo?.totalReviews > 0 && (
              <div className="flex items-center justify-center my-2">
                <StarRatings
                  // rating={reviewInfo?.finalAverageRating}
                  rating={Number(reviewInfo?.finalAverageRating)}
                  starRatedColor="#f1c40f"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="5px"
                />
              </div>
            )}
          </div>
          <h1 className="text-5xl font-bold mb-2">{book?.title}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Author:</strong> {book?.author}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Edition:</strong> {book?.edition}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Publisher:</strong> {book?.publisher}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>ISBN:</strong> {book?.isbn}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Publication Year:</strong> {book?.publicationYear}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> {book?.price} BDT
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Condition:</strong> {book?.conditions}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Exchange:</strong> {book?.exchange ? "Yes" : "No"}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Fixed Price:</strong> {book?.fixedPrice ? "Yes" : "No"}
          </p>
          <p className="text-gray-700 w-full text-wrap">
            <strong>Description:</strong> {book?.description}
          </p>
          {book.isAccepted === false &&
            currentUser?.user?.isAdmin === false && (
              <div>
                <h1 className="text-red-500 text-2xl text-center">
                  Book is Not in our Hand .it may take time
                </h1>
              </div>
            )}
          <div className="flex space-x-4">
            <button
              className={`${
                orderType === "sell"
                  ? "bg-slate-900 text-white py-1 px-4 rounded-md font-bold text-xl"
                  : "bg-gray-200 text-black py-1 px-4 rounded-md font-bold text-xl"
              }`}
              onClick={() => handleToggle("sell")}
            >
              Sell
            </button>

            <button
              className={`${
                orderType === "rent"
                  ? "bg-slate-900 text-white py-1 px-4 rounded-md font-bold text-xl"
                  : "bg-gray-200 text-black py-1 px-4 rounded-md font-bold text-xl"
              }`}
              onClick={() => handleToggle("rent")}
            >
              Rent
            </button>
          </div>
          <div className="flex gap-6">
            <button
              onClick={handleAddToCart}
              disabled={
                book.bookStatus === "sold" || book.bookStatus === "rent"
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {book.bookStatus === "sold" || book.bookStatus === "rent"
                ? "Not Available"
                : "Add to Cart"}
            </button>
          </div>

          {orderType === "rent" && (
            <>
              <Modal
                title="Select Your Duration"
                open={isRentModal}
                onOk={handleRentModal}
                onCancel={handleCloseRentModal}
              >
                <input
                  type="date"
                  onChange={(e) => setRentDuration(new Date(e.target.value))}
                />
              </Modal>
              {rentDuration > 0 && (
                <p className="text-gray-700 mt-4">
                  Rent duration selected: {calculateDays(rentDuration)} day(s)
                </p>
              )}
            </>
          )}

          {currentUser?.user?.isAdmin && book?.isAccepted === false && (
            <button
              onClick={() => handleAcceptBook(book._id)}
              className="my-6 bg-green-700 text-white p-4 rounded-md "
            >
              Accept Book
            </button>
          )}
        </div>
      </section>
      <section className="my-6 p-4 ">
        {!currentUser?.user && (
          <Link to="/user-credentials/login">Login for Give rating</Link>
        )}
        {currentUser?.user.isAdmin === false &&
          book?.bookOwner !== currentUser?.user?._id && (
            <>
              <Button type="primary" onClick={showModal}>
                Add Review
              </Button>
              {loading && <Spin />}
              <Modal
                title={currentUser?.user?.userName + ",Please Add Your Review"}
                open={isModalOpen}
                onOk={handleOk}
                className="text-center"
                onCancel={handleCancel}
              >
                <StarRatings
                  rating={rating}
                  starRatedColor="#f1c40f"
                  numberOfStars={5}
                  changeRating={changeRating}
                  name="rating"
                  starDimension="30px"
                  starSpacing="15px"
                />
                <TextArea
                  className="my-6 "
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write Your Comment"
                  autoSize={{
                    minRows: 3,
                    maxRows: 5,
                  }}
                />
              </Modal>
            </>
          )}
      </section>
      <section>
        <Tabs>
          <TabList>
            <Tab>Address</Tab>
            <Tab>More</Tab>
            <Tab>Review</Tab>
          </TabList>

          <TabPanel>
            <div>
              <p className="text-gray-700 mb-2">
                University:{" "}
                <span className="font-bold">
                  {book?.address?.universityName}
                </span>
              </p>

              <p className="text-gray-700 mb-2">
                area: <span className="font-bold">{book?.address?.area}</span>
              </p>
              <p className="text-gray-700 mb-2">
                city: <span className="font-bold">{book?.address?.city}</span>
              </p>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col items-center gap-4">
              <div className="hidden">
                {demoPages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Demo Page ${index + 1}`}
                    className="image-thumbnail cursor-pointer"
                    onClick={() => showImage(index)}
                  />
                ))}
              </div>
              {currentIndex !== null && (
                <div
                  ref={modalRef}
                  className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                  onClick={handleModalClick}
                >
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md"
                  >
                    Previous
                  </button>
                  <ModalImage
                    small={demoPages[currentIndex]}
                    large={demoPages[currentIndex]}
                    alt={`Demo Page ${currentIndex + 1}`}
                    onClose={handleClose}
                  />
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md"
                  >
                    Next
                  </button>
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white p-2 rounded-full bg-red-500 hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              )}
              <button
                onClick={() => showImage(0)}
                className="text-slate-100 my-6 bg-green-700 px-2 py-1 rounded-md hover:text-slate-50"
              >
                Demo Pages
              </button>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-bold text-slate-600 my-6">
                This is all reviews about this book
              </h1>
              <div className="w-full p-4 sm:max-w-4xl mx-auto ">
                {allReviews.length === 0 && (
                  <h1 className="text-3xl font-bold text-slate-600">
                    No reviews yet
                  </h1>
                )}
                {allReviews &&
                  allReviews.length > 0 &&
                  allReviews.map((review, index) => (
                    <Review review={review} key={index} />
                  ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
}

// before add to cart create  a confirmation is rent or buy
//if buy then go default way
//if rent take rent duration option and change price;
// during order status montior time and date...after 15days give a remainder and after time period end make this id disabled
