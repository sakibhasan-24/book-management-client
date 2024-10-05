import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetBooks from "../../hooks/books/useGetBooks";
import { Select } from "flowbite-react";
import BookCard from "./BookCard";

export default function SearchResult() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    category: "uncategorized",
  });
  const [books, setBooks] = useState([]);
  const { loading, getBookBySearchAndCategory } = useGetBooks();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm") || "";
    const categoryFromUrl = urlParams.get("category") || "";

    setSearchData((prevData) => ({
      ...prevData,
      searchTerm: searchTermFromUrl,
      category: categoryFromUrl,
    }));

    const fetchData = async () => {
      const data = await getBookBySearchAndCategory({
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
      });
      console.log(data);

      setBooks(data.books);
    };

    fetchData();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "search") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSearchData({ ...searchData, category });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);

    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString();
    console.log(searchQuery);
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="w-full sm:max-w-6xl  p-4m my-12 mx-4 ">
      <section className="w-full   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 gap-4">
        <div className="col-span-3 space-y-6 border-r-4 border-r-red-600 p-4">
          <h1 className="text-3xl font-bold text-center ">Search Books</h1>
          <form
            onSubmit={handleSubmit}
            className=" sm:col-span-3 md:col-span-3 flex flex-col"
          >
            <input
              type="text"
              name="search"
              id="search"
              placeholder="search"
              value={searchData.searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              onChange={handleChange}
              className="px-4 py-2 rounded-md focus:outline-none w-full bg-slate-200 select-none"
            />

            <div className="flex flex-col gap-2">
              <label className="text-xl font-semibold mr-10">category</label>
              <Select
                id="category"
                onChange={handleChange}
                value={searchData.category}
              >
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
        </div>
        <div className="col-span-7 my-6">
          <h1 className="text-centertext-4xl  my-2 font-semibold underline text-slate-800">
            Search Result
          </h1>
          <div className="grid grid-cols-1  sm:grid-cols-2 gap-4">
            {books?.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          <div className="my-6">
            {books.length === 0 && (
              <h1 className="text-center font-semibold underline text-slate-800">
                No Books Found
              </h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
