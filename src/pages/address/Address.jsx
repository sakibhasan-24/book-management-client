import React from "react";

export default function Address() {
  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Address
      </h1>
      <div>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="text"
            placeholder="Address"
            required
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <input
            type="text"
            placeholder="Phone Number"
            required
            className="w-full sm:w-1/3 mx-auto rounded-md p-3 border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 mx-auto p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
