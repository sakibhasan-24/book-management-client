import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ModalImage from "react-modal-image";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useUserLogin from "../../../hooks/useUserLogin";
import Swal from "sweetalert2";
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, userLogin, error } = useUserLogin();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //login function
  const [formData, setFormData] = useState({});
  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    console.table(error);
    try {
      const res = await userLogin(formData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "Welcome to your account",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state?.from?.pathname || "/"}`);
      }
    } catch (e) {
      if (error.success === false) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Email or Password",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log("error");
    }
  };
  return (
    <div className="w-full sm:max-w-xl md:max-w-2xl  mx-auto ">
      <h1 className="text-xl text-center font-semibold text-slate-500 mb-2">
        Welcome Back
      </h1>
      <div className="w-full">
        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmitFormData}
        >
          <input
            onChange={(e) =>
              setFormData({ ...formData, userEmail: e.target.value })
            }
            type="email"
            name="userEmail"
            placeholder="User Email"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />

          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            placeholder="****************"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {showPassword ? (
            <FaEye
              onClick={handleShowPassword}
              className="relative  -top-[52px] -right-32 sm:-right-56  text-xl text-slate-500 cursor-pointer hover:text-slate-800"
            />
          ) : (
            <FaEyeSlash
              onClick={handleShowPassword}
              className="relative  -top-[52px] -right-32 sm:-right-56  text-xl text-slate-500 cursor-pointer hover:text-slate-800"
            />
          )}

          <input
            type="submit"
            value={loading ? "Loading..." : "Login"}
            disabled={loading}
            className={`w-full font-bold p-2 rounded-md bg-slate-800 cursor-pointer hover:bg-slate-600 text-white ${
              loading && "cursor-not-allowed"
            }`}
          />
        </form>
        <p className="text-center text-slate-500 mt-2">
          Don't have an account?
          <span className="text-slate-800 font-semibold">
            <Link
              to="/user-credentials/signup"
              className="text-slate-800 font-semibold"
            >
              SignUp
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

/* 

 const images = [
    {
      small:
        "https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg",
      large:
        "https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg",
    },
    {
      small:
        "https://t4.ftcdn.net/jpg/05/24/87/01/360_F_524870155_pRYG2Ac6igOhmXQEdCVRYGWSkeHTaaYj.jpg",
      large:
        "https://t4.ftcdn.net/jpg/05/24/87/01/360_F_524870155_pRYG2Ac6igOhmXQEdCVRYGWSkeHTaaYj.jpg",
    },
    {
      small:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQjd28q8Sf8jrNEh7TVrUbxaFxdPhs28r-2bAcXLaHsjx-rfg9vay6g5P1wL2gpNDP3g&usqp=CAU",
      large:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQjd28q8Sf8jrNEh7TVrUbxaFxdPhs28r-2bAcXLaHsjx-rfg9vay6g5P1wL2gpNDP3g&usqp=CAU",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleClose = () => {
    setCurrentIndex(null);
  };
  const showImageRef = useRef(null);
  const imageRefs = useRef([]);
  const showImage = (index) => {
    setCurrentIndex(index);
  };
 <div className="hidden" ref={showImageRef}>
        {images.map((image, index) => (
          <img
            ref={(el) => (imageRefs.current[index] = el)}
            key={index}
            src={image.small}
            alt={image.alt}
            className="image-thumbnail"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      {currentIndex !== null && (
        <div className="modal-overlay">
          <button onClick={handlePrev}>Previous</button>
          <ModalImage
            small={images[currentIndex].small}
            large={images[currentIndex].large}
            alt={images[currentIndex].alt}
            onClose={handleClose}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}
      <p
        // onClick={() => showImageRef.current.click()}
        onClick={() => showImage(0)}
        className="text-center text-slate-500 mt-2 cursor-pointer hover:text-slate-800"
      >
        Show Demo
      </p>
*/
