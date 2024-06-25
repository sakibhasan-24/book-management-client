import React, { useRef, useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function SignupForm() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  //   console.log(imageFile, imageFileUrl);
  return (
    <div className="w-full max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Update Profile
      </h2>
      <form className="flex flex-col gap-6">
        <div className="mt-6 flex justify-center">
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
            className="w-32 h-32 rounded-full object-cover cursor-pointer"
            onClick={() => fileRef.current.click()}
          />
        </div>
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
