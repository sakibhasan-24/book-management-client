import React, { useEffect } from "react";
import useGetBooks from "../../../hooks/books/useGetBooks";
import { Table } from "flowbite-react";
import Mybook from "./Mybook";
import Spinner from "../../loader/Spinner";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function MyBooks() {
  const { currentUser } = useSelector((state) => state.user);

  const {
    loading,
    error,
    setBooks,
    books,
    getAllBooks,
    getUserBooks,
    userBooks,
    deleteBook,
  } = useGetBooks();
  useEffect(() => {
    if (currentUser?.user.isAdmin) {
      getAllBooks();
    } else {
      getUserBooks(currentUser?.user?._id);
    }
  }, []);
  //   console.log(books);
  const displayedBooks = currentUser?.user.isAdmin ? books : userBooks;

  const handleDeleteBook = async (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteBook(bookId);
        console.log(res);
        if (res.success) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        } else {
          Swal.fire("Failed!", "Please Try after some time", "error");
        }
      }
    });
  };
  if (loading) return <Spinner />;
  return (
    <div className="w-full sm:max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-10">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            {currentUser.user?.isAdmin === false && (
              <Table.HeadCell>Edit</Table.HeadCell>
            )}
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {displayedBooks && displayedBooks.length > 0 ? (
              displayedBooks.map((book) => (
                <Mybook
                  key={book._id}
                  book={book}
                  isAdmin={currentUser.user?.isAdmin}
                  // handleDeleteUser={handleDeleteUser}
                  handleDeleteBook={handleDeleteBook}
                />
              ))
            ) : (
              <Table.Row>
                <Table.Cell
                  colSpan={currentUser.user?.isAdmin === false ? 6 : 5}
                  className="text-center"
                >
                  No Book found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
