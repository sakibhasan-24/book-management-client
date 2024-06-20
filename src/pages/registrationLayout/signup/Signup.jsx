import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import app from "../../../firebase/firebase.config";
import useCreateUser from "../../../hooks/useCreateUser";
export default function Signup() {
  const { loading, signUpUser } = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // handle form data
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData);
  // image upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const storage = getStorage(app);
    const imageName = image.name + new Date().getTime();
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    // uploadTask.on();
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // if (imageUrl) {
        //   setUploadProgress(0);
        // }
        setUploadProgress(progress);
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //   console.log("File available at", downloadURL);

          //   console.log("from", imageUrl);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageUrl(downloadURL);
        });
      }
    );
  };

  // submit form data to store in db
  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    console.log("s");
    try {
      const res = await signUpUser(formData);
      console.log("he", res);
      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Successfully Signup",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormData({});
        navigate("/user-credentials/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(loading);
  console.log(uploadProgress);
  return (
    <div className="w-full sm:max-w-xl md:max-w-2xl mx-auto ">
      <h1 className="text-xl text-center font-semibold text-slate-500 mb-2">
        Please Signup
      </h1>
      <div className="w-full">
        <form
          className="flex items-center flex-col gap-4"
          onSubmit={handleSubmitFormData}
        >
          <input
            onChange={handleFormData}
            type="text"
            name="userName"
            id="userName"
            placeholder="User Name"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />
          <input
            onChange={handleFormData}
            type="email"
            name="userEmail"
            id="userEmail"
            placeholder="User Email"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />

          <input
            onChange={handleFormData}
            type={`${showPassword ? "text" : "password"}`}
            name="userPassword"
            id="userPassword"
            placeholder="****************"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
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
            onChange={handleImageUpload}
            type="file"
            name="image"
            id="image"
            className="w-full mb-2 p-2 rounded-md border-none outline-none focus:outline-none"
          />
          <div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p className="text-center text-teal-400">
                image uploading {uploadProgress} %
              </p>
            )}
            {uploadProgress === 100 && imageUrl && (
              <p className="text-center text-green-600">image uploaded</p>
            )}
            {imageUrl && (
              <img src={imageUrl} alt="image" className="w-[80px] h-[80px]" />
            )}
            {imageUrl && (
              <p
                className="text-4xl cursor-pointer"
                onClick={() => setImageUrl(null)}
              >
                ❌
              </p>
            )}
          </div>
          <input
            type="submit"
            value={loading ? "loading...." : "Sign Up"}
            // disabled={(uploadProgress < 90 && uploadProgress > 10) || loading}
            disabled={(uploadProgress > 10 && uploadProgress < 90) || loading}
            className={`w-full font-bold p-2 rounded-md bg-slate-800 cursor-pointer hover:bg-slate-600 text-white ${
              (uploadProgress > 10 && uploadProgress < 90) || loading
                ? "cursor-not-allowed bg-slate-600"
                : "cursor-pointer hover:bg-slate-600"
            }`}
          />
        </form>
        <p className="text-center text-slate-500 mt-2">
          Already have an account?
          <span className="text-slate-800 font-semibold">
            <Link
              to="/user-credentials/login"
              className="text-slate-800 font-semibold"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
