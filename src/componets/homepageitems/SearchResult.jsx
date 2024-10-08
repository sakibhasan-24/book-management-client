import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetBooks from "../../hooks/books/useGetBooks";
import { Select } from "flowbite-react";
import BookCard from "./BookCard";

export default function SearchResult() {
  const [searchData, setSearchData] = useState({
    searchTerm: localStorage.getItem("searchTerm") || "",
    category: localStorage.getItem("category") || "",
  });

  const [books, setBooks] = useState([]);
  const { loading, getBookBySearchAndCategory } = useGetBooks();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams =
        new URLSearchParams(location.search) ||
        localStorage.getItem("searchTerm");
      const searchTermFromUrl =
        urlParams.get("searchTerm") || localStorage.getItem("searchTerm");
      const categoryFromUrl =
        urlParams.get("category") || localStorage.getItem("category");
      if (searchTermFromUrl || categoryFromUrl) {
        setSearchData({
          ...searchData,
          searchTerm: searchTermFromUrl,

          category: categoryFromUrl,
        });
      }
      const data = await getBookBySearchAndCategory({
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
      });

      setBooks(data.books);
    };

    fetchData();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure searchData does not contain "null" or empty values
    const cleanedSearchData = {
      searchTerm: searchData.searchTerm || "",
      category: searchData.category || "",
    };

    // Save cleaned data to localStorage
    localStorage.setItem("searchData", JSON.stringify(cleanedSearchData));

    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", cleanedSearchData.searchTerm);
    urlParams.set("category", cleanedSearchData.category);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSearchData({ ...searchData, category });
    }
  };

  const handleClearSearch = () => {
    setSearchData({});
    localStorage.removeItem("searchData");
    navigate("/search");
  };
  return (
    <div className="w-full sm:max-w-6xl p-4 my-12 mx-4">
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-4">
        <div className="col-span-3 space-y-6 border-r-4 border-r-red-600 p-4">
          <h1 className="text-3xl font-bold text-center">Search Books</h1>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              value={searchData.searchTerm || ""}
              onChange={handleChange}
              className="px-4 py-2 rounded-md focus:outline-none w-full bg-slate-200 select-none"
            />

            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold mr-10">Category</label>
              <Select
                id="category"
                onChange={handleChange}
                // value={searchData.category}
                value={searchData.category || ""}
              >
                {/* Populate categories */}
                <option value="">All Categories</option>
                <option value="Cse">Computer Science</option>
                <option value="Math">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Software">Software</option>
                <option value="Hardware">Hardware</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Political Science">Political Science</option>
                <option value="Economics">Economics</option>
                <option value="Philosophy">Philosophy</option>
                <option value="Psychology">Psychology</option>
                <option value="Sociology">Sociology</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Dance">Dance</option>
                <option value="Drama">Drama</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Architecture">Architecture</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
              </Select>
            </div>

            <button className="bg-slate-800 text-white p-2 my-6 rounded-lg cursor-pointer">
              Search
            </button>
          </form>

          <button
            className="bg-slate-800 text-white p-2 my-6 rounded-lg cursor-pointer"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        </div>

        <div className="col-span-7 my-6">
          <h1 className="text-center text-4xl my-2 font-semibold underline text-slate-800">
            Search Results
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {books?.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          {books.length === 0 && (
            <h1 className="text-center font-semibold underline text-slate-800">
              No Books Found
            </h1>
          )}
        </div>
      </section>
    </div>
  );
}
