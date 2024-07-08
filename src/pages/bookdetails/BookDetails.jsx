import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalImage from "react-modal-image";
import useGetBooks from "../../hooks/books/useGetBooks";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
export default function BookDetails() {
  const params = useParams();
  const { getBookById } = useGetBooks();
  const dispatch = useDispatch();
  // addToCart
  const [demoPages, setDemoPages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [book, setBook] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBookById(params.bookId);
      setBook(fetchedBook.book);
      setDemoPages(fetchedBook.book.imagesUrls.slice(1)); // Slice from index 1 to end
    };
    fetchBook();
  }, [params.bookId]);

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

  const handleAddToCart = () => {
    dispatch(addToCart({ ...book }));
    navigate("/cartItems");
  };
  // console.log();
  return (
    <div className="container w-full sm:max-w-6xl mx-auto my-12 ">
      {/* details about books */}
      {/* details container */}
      {/* img */}
      {/* other information */}
      <section className="w-full  my-6 flex flex-col sm:flex-row gap-8 items-center justify-between">
        <div>
          <img
            src={book?.imagesUrls[0]}
            alt="img"
            className="w-full  object-cover"
          />
        </div>

        <div className="w-full md:w-2/3 p-4">
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
          <p className="text-gray-700">
            <strong>Description:</strong> {book?.description}
          </p>
          <div className="flex gap-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add to cart
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Exchange Book
            </button>
          </div>
        </div>
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
            <div className="flex flex-col items-center gap-4">review</div>
          </TabPanel>
        </Tabs>
      </section>

      <div>{}</div>
    </div>
  );
}
