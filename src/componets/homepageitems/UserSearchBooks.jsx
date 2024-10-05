// import React, { useEffect, useState } from "react";
// import useGetBooks from "../../hooks/books/useGetBooks";
// import BookCard from "./BookCard";

// export default function UserSearchBooks() {
//   const { books, loading, error, getAllType } = useGetBooks();

//   const [searchParams, setSearchParams] = useState(() => {
//     const savedParams = localStorage.getItem("searchParams");
//     return savedParams ? JSON.parse(savedParams) : {};
//   });

//   // Fetch books based on searchParams whenever they change
//   useEffect(() => {
//     const fetchBooks = async () => {
//       await getAllType(searchParams);
//     };

//     if (Object.keys(searchParams).length) {
//       fetchBooks();
//     }
//   }, [searchParams, getAllType]);

//   const handleSearch = (e) => {
//     const newParams = { ...searchParams, searchTerm: e.target.value };
//     setSearchParams(newParams);
//     localStorage.setItem("searchParams", JSON.stringify(newParams));
//   };

//   const handleCategoryChange = (e) => {
//     const newParams = { ...searchParams, category: e.target.value };
//     setSearchParams(newParams);
//     localStorage.setItem("searchParams", JSON.stringify(newParams));
//   };

//   return (
//     <div className="p-4 border-none rounded-md bg-white">
//       <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//         {/* Search Input */}
//         <div className="flex-grow">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchParams.searchTerm || ""}
//             onChange={handleSearch}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none"
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div>
//           <select
//             value={searchParams.category || ""}
//             onChange={handleCategoryChange}
//             className="px-3 py-2 border rounded-md focus:outline-none"
//           >
//             <option value="">All Categories</option>

//             <option value="Cse">Computer Science</option>
//             <option value="Math">Mathematics</option>
//             <option value="Physics">Physics</option>
//             <option value="Chemistry">Chemistry</option>
//             <option value="Biology">Biology</option>
//             <option value="English">English</option>
//             <option value="Software">Software</option>
//             <option value="Hardware">Hardware</option>
//             <option value="History">History</option>
//             <option value="Geography">Geography</option>
//             <option value="Political Science">Political Science</option>
//             <option value="Economics">Economics</option>
//             <option value="Philosophy">Philosophy</option>
//             <option value="Psychology">Psychology</option>
//             <option value="Sociology">Sociology</option>
//             <option value="Art">Art</option>
//             <option value="Music">Music</option>
//             <option value="Dance">Dance</option>
//             <option value="Drama">Drama</option>
//             <option value="Fine Arts">Fine Arts</option>
//             <option value="Architecture">Architecture</option>
//             <option value="Civil Engineering">Civil Engineering</option>
//             <option value="Mechanical Engineering">
//               Mechanical Engineering
//             </option>
//             <option value="Electrical Engineering">
//               Electrical Engineering
//             </option>
//             <option value="Electronics and Communication Engineering">
//               Electronics and Communication Engineering
//             </option>
//           </select>
//           {books.length > 0 && <button>clear Search</button>}
//         </div>
//       </div>

//       {/* Display Books */}
//       {books.length > 0 && (
//         <>
//           <h1>Preferred Books</h1>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {books.length > 0 &&
//               books.map((book) => <BookCard book={book} key={book._id} />)}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
