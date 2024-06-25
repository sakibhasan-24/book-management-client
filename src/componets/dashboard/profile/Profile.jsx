import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase.config";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SignupForm() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageUploadError("Please upload a valid image file.");
        setImageFile(null);
        setImageFileUrl(null);
        return;
      }
      setImageUploadError(null);
      setImageUploadProgress(null);

      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  //   console.log(imageFile, imageFileUrl);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (!imageFile) return;
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        setImageUploadError("image is not upload");
        setImageUploadProgress(0);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  console.log(imageUploadProgress);
  console.log(imageUploadError);
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Update Profile
      </h2>
      <form className="flex flex-col gap-6">
        <div
          onClick={() => fileRef.current.click()}
          className="mt-6 w-1/3 mx-auto flex cursor-pointer justify-center relative "
        >
          {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `
                    rgba(62,152,199, ${imageUploadProgress / 100})
                    `,
                },
              }}
            />
          )}
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileRef}
            hidden
          />
          <img
            src={imageFileUrl || currentUser.user.image}
            alt="Profile"
            className={`w-32 h-32 rounded-full object-cover cursor-pointer ${
              imageUploadProgress && imageUploadProgress < 100
                ? "opacity-50"
                : ""
            }`}
          />
        </div>
        {imageUploadError && (
          <Alert color="failure" className="mt-2 block">
            {imageUploadError}
          </Alert>
        )}
        <div className="w-full">
          <Label htmlFor="userName" value="User Name" className="mb-2 block" />
          <TextInput
            id="userName"
            name="userName"
            placeholder="User Name"
            required
            icon={HiUser}
            className="w-full px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div className="w-full">
          <Label
            htmlFor="userEmail"
            value="User Email"
            className="mb-2 block"
          />
          <TextInput
            id="userEmail"
            name="userEmail"
            type="email"
            placeholder="User Email"
            required
            icon={HiMail}
            className="w-full px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <div className="w-full">
          <Label htmlFor="password" value="Password" className="mb-2 block" />
          <TextInput
            id="password"
            name="password"
            type="password"
            placeholder="*************"
            required
            icon={HiLockClosed}
            className="w-full px-4 py-2 rounded-md focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
        >
          Update
        </Button>
      </form>
    </div>
  );
}
