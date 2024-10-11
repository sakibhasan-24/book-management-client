import React, { useEffect, useState } from "react";
import useGetBooks from "../../../hooks/books/useGetBooks";
import "@fortawesome/fontawesome-free/css/all.min.css";

// const booksData = [
//   {
//     id: 1,
//     title: "CSE",
//     logo: "fa fa-code", // Font Awesome code icon for Computer Science
//   },
//   {
//     id: 2,
//     title: "Mathematics",
//     logo: "fa fa-square-root-alt", // Font Awesome square root icon
//   },
//   {
//     id: 3,
//     title: "English",
//     logo: "fa fa-book", // Font Awesome book icon
//   },
//   {
//     id: 4,
//     title: "Physics",
//     logo: "fa fa-atom", // Font Awesome atom icon for Physics
//   },
//   {
//     id: 5,
//     title: "Chemistry",
//     logo: "fa fa-flask", // Font Awesome flask icon for Chemistry
//   },
//   {
//     id: 6,
//     title: "Physics for Engineers",
//     logo: "fa fa-tools", // Font Awesome tools icon for engineering
//   },
//   {
//     id: 7,
//     title: "Chemistry in Everyday Life",
//     logo: "fa fa-vial", // Font Awesome vial icon for Chemistry
//   },
//   {
//     id: 8,
//     title: "Biology: The Study of Life",
//     logo: "fa fa-dna", // Font Awesome DNA icon for Biology
//   },
//   {
//     id: 9,
//     title: "Software",
//     logo: "fa fa-laptop-code", // Font Awesome laptop code icon for Software
//   },
//   {
//     id: 10,
//     title: "Hardware",
//     logo: "fa fa-microchip", // Font Awesome microchip icon for Hardware
//   },
//   {
//     id: 11,
//     title: "Political Science and Governance",
//     logo: "fa fa-university", // Font Awesome university icon for Political Science
//   },
//   {
//     id: 12,
//     title: "Economics: Micro and Macro",
//     logo: "fa fa-chart-line", // Font Awesome chart line icon for Economics
//   },
//   {
//     id: 13,
//     title: "Psychology: Understanding Human Mind",
//     logo: "fa fa-brain", // Font Awesome brain icon for Psychology
//   },
//   {
//     id: 14,
//     title: "Philosophy: The Quest for Truth",
//     logo: "fa fa-lightbulb", // Font Awesome lightbulb icon for Philosophy
//   },
//   {
//     id: 15,
//     title: "Fine Arts: Visual Expressions",
//     logo: "fa fa-paint-brush", // Font Awesome paint brush icon for Fine Arts
//   },
// ];
import {
  CodeOutlined,
  CalculatorOutlined,
  BookOutlined,
  ExperimentOutlined,
  ToolOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  DatabaseOutlined,
  BankOutlined,
  LineChartOutlined,
  BulbOutlined,
  HighlightOutlined,
  PicCenterOutlined, // Replacing PaintOutlined with PicCenterOutlined
} from "@ant-design/icons";
import BookCard from "../../../componets/homepageitems/BookCard";
import Spinner from "../../../componets/loader/Spinner";

// Updated booksData using valid Ant Design icons
const booksData = [
  {
    id: 1,
    title: "Cse",
    logo: <CodeOutlined />, // Ant Design code icon
  },
  {
    id: 2,
    title: "Mathematics",
    logo: <CalculatorOutlined />, // Ant Design calculator icon for Mathematics
  },
  {
    id: 3,
    title: "English",
    logo: <BookOutlined />, // Ant Design book icon for English
  },
  {
    id: 4,
    title: "Physics",
    logo: <ExperimentOutlined />, // Ant Design experiment icon for Physics
  },
  {
    id: 5,
    title: "Chemistry",
    logo: <PicCenterOutlined />, // Ant Design flask icon for Chemistry
  },
  {
    id: 6,
    title: "Physics for Engineers",
    logo: <ToolOutlined />, // Ant Design tool icon for engineering
  },
  {
    id: 7,
    title: "Chemistry in Everyday Life",
    logo: <ToolOutlined />, // Ant Design flask icon for Chemistry
  },
  {
    id: 8,
    title: "Biology: The Study of Life",
    logo: <AppstoreOutlined />, // Ant Design appstore icon for Biology
  },
  {
    id: 9,
    title: "Software",
    logo: <LaptopOutlined />, // Ant Design laptop icon for Software
  },
  {
    id: 10,
    title: "Hardware",
    logo: <DatabaseOutlined />, // Ant Design database icon for Hardware
  },
  {
    id: 11,
    title: "Political Science and Governance",
    logo: <BankOutlined />, // Ant Design bank icon for Political Science
  },
  {
    id: 12,
    title: "Economics: Micro and Macro",
    logo: <LineChartOutlined />, // Ant Design chart line icon for Economics
  },
  {
    id: 13,
    title: "Psychology: Understanding Human Mind",
    logo: <BulbOutlined />, // Ant Design bulb icon for Psychology
  },
  {
    id: 14,
    title: "Philosophy",
    logo: <HighlightOutlined />, // Ant Design highlight icon for Philosophy
  },
  {
    id: 15,
    title: "Fine Arts: Visual Expressions",
    logo: <PicCenterOutlined />, // Replaced with PicCenterOutlined
  },
];

export default function CategoricalBooks() {
  const { getBookBySearchAndCategory, loading } = useGetBooks();
  const [category, setCategory] = useState("Hardware");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBookBySearchAndCategory({ category });
      setBooks(data.books);
    };
    fetchData();
  }, [category]);

  // console.log(books);
  if (loading) return <Spinner />;
  if (booksData.length === 0) return <Spinner />;
  return (
    <div className="w-full sm:max-w-6xl mx-auto p-4 my-6">
      <h1 className="text-center font-bold bg-green-800 text-white p-4 rounded-md text-2xl mb-6">
        Browse By Category
      </h1>
      <div className="flex items-center cursor-pointer justify-center flex-wrap gap-6">
        {booksData.map((book) => (
          <div
            onClick={() => setCategory(book.title)}
            key={book.id}
            className={`flex  flex-col items-center justify-center gap-2 mb-4 p-4 w-32 h-32 bg-white 
      rounded-xl shadow-md transform transition-transform hover:scale-105 hover:bg-gradient-to-br hover:from-green-400 hover:to-blue-500 hover:shadow-2xl 
      border-4 border-transparent hover:border-yellow-300 ${
        category === book.title
          ? "bg-gradient-to-br bg-gradient-to-t-to-b from-green-400 to-blue-500 shadow-2xl border-4 border-yellow-300"
          : ""
      }`}
          >
            <p className="text-4xl font-bold text-blue-600 transition-transform hover:text-white">
              {book.logo}
            </p>
            <p
              title={book.title}
              className="text-sm font-semibold text-gray-700 hover:text-white text-center truncate w-full"
            >
              {book.title}
            </p>
          </div>
        ))}
      </div>
      <h1 className="text-center font-bold bg-green-800 text-white p-4 rounded-md text-2xl mb-6">
        All {category} related Books
      </h1>
      <div>
        {books.length === 0 && (
          <p className="text-red-400    font-semibold text-center my-6">
            No Books Found for{" "}
            <span className="text-red-600 font-bold">{category}</span>
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-2 my-6">
          {books.length > 0 &&
            books.map((book) => <BookCard key={book._id} book={book} />)}
        </div>
      </div>
    </div>
  );
}
