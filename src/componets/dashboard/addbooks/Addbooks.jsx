import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import app from "../../../firebase/firebase.config";
import { Alert } from "flowbite-react";
import { FaTrash, FaTrashArrowUp } from "react-icons/fa6";

export default function Addbooks() {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(imageFiles);

  const handleUploadImage = async (e) => {
    console.log("cle");
    if (
      imageFiles.length > 2 &&
      imageFiles.length + formData.imageUrls.length <= 10
    ) {
      const promises = [];
      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(uploadImage(imageFiles[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          console.log(formData.imageUrls);
          //   console.log(formData);
          setImageError(false);
        })
        .catch((error) => {
          //   console.log(error);
          setImageError(true);
        });
    } else {
      setImageError(
        "Image Upload failed ! Maximum 10 images allowed or Minimum 3 images required !"
      );
    }
  };
  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  return (
    <section className="p-3 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center  text-slate-700">
        Please <span className="text-blue-700"> Create </span>A book{" "}
      </h1>
      <form className=" flex flex-col sm:flex-row   gap-4 mt-10">
        <div className="flex flex-col gap-2 flex-1">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Book Title"
            required
            className="w-full border-0 border-slate-50 outline-none focus:bottom-0 focus:outline-none p-2 rounded-md"
          />
          <input
            type="text"
            id="area"
            name="area"
            placeholder="area"
            required
            className="w-full border-0 border-slate-50 outline-none focus:bottom-0 focus:outline-none p-2 rounded-md"
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="city"
            required
            className="w-full border-0 border-slate-50 outline-none focus:bottom-0 focus:outline-none p-2 rounded-md"
          />
          <input
            type="text"
            id="universityName"
            name="universityName"
            placeholder="university Name"
            required
            className="w-full border-0 border-slate-50 outline-none focus:bottom-0 focus:outline-none p-2 rounded-md"
          />
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Book Description"
            required
            className="w-full border-0 border-slate-50 outline-none focus:bottom-0 focus:outline-none p-2 rounded-md"
          />
          <select
            id="category"
            name="category"
            className="w-full border-0 border-slate-50 outline-none focus:ring-0 focus:outline-none p-2 rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Cse">Computer Science</option>
            <option value="Math">Mathematics</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Environmental Science">Environmental Science</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
          </select>
          <div className="flex gap-6 flex-wrap mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                name="sell"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="sell" className="text-gray-700 text-lg">
                Sell
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="exchange"
                name="exchange"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="exchange" className="text-gray-700 text-lg">
                Exchange
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fixedPrice"
                name="fixedPrice"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="fixedPrice" className="text-gray-700 text-lg">
                Fixed Price
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="fixedPrice" className="text-gray-700 text-lg">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className=" text-blue-900 font-extrabold border-gray-300 rounded "
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 ">
          <p className="font-bold text-xl text-gray-800">Images:</p>
          <div>
            <input
              onChange={(e) => setImageFiles(e.target.files)}
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              className="my-6 border-gray-400 rounded w-full p"
            />
            <button
              onClick={handleUploadImage}
              type="button"
              className="text-slate-100 bg-green-600 hover:bg-green-500 rounded-md w-full py-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload Images
            </button>
            {imageError && (
              <p className="text-red-500 text-center mt-2 font-semibold">
                {imageError}
              </p>
            )}
            {formData.imageUrls &&
              formData.imageUrls.length > 0 &&
              formData.imageUrls.map((image, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2"
                >
                  <img
                    src={image}
                    alt={`Uploaded ${idx + 1}`}
                    className="w-24 h-24 rounded-lg object-contain"
                  />
                  <button onClick={() => handleDeleteImage(idx)} type="button">
                    <FaTrash className="text-red-600 text-2xl hover:text-red-400" />
                  </button>
                </div>
              ))}
          </div>

          <button className="w-full my-4  bg-blue-600 text-white font-bold hover:bg-blue-500 rounded-md py-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Create Book
          </button>
        </div>
      </form>
    </section>
  );
}
