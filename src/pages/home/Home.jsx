import React from "react";
import Navbar from "../../componets/header/navbar/Navbar";
import AllBooks from "../../componets/homepageitems/AllBooks";
import UserSearchBooks from "../../componets/homepageitems/UserSearchBooks";
import TopBooks from "../../componets/topRatedBooks/TopBooks";
import CategoricalBooks from "../cartItems/categoricalBooks/CategoricalBooks";

export default function Home() {
  return (
    <div>
      <UserSearchBooks />
      <TopBooks />
      <CategoricalBooks />
      <AllBooks />
    </div>
  );
}
