import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Adding a search icon

export default function UserSearchBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between gap-2 w-full max-w-md mx-auto p-2 border-2 border-gray-300 rounded-lg bg-white shadow-md"
    >
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 bg-transparent border-none text-gray-800 placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out"
      >
        <FaSearch />
      </button>
    </form>
  );
}

//   return (
//     <div className="p-4 border-none rounded-md bg-white">
//       <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//         {/* Search Input */}
//         <div className="flex-grow">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={""}
//             onChange={handleSearch}
//             className="w-full px-3 py-2 border rounded-md focus:outline-none"
//           />
//         </div>

//         {/* Category Dropdown */}
//         <div>
//           <select
//             value={""}
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
//           <button
//             className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2"
//             onClick={handleNavigate}
//           >
//             Search Books
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
