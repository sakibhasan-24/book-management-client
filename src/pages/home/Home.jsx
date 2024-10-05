import React from "react";
import Navbar from "../../componets/header/navbar/Navbar";
import AllBooks from "../../componets/homepageitems/AllBooks";
import UserSearchBooks from "../../componets/homepageitems/UserSearchBooks";

export default function Home() {
  return (
    <div>
      <UserSearchBooks />
      <AllBooks />
    </div>
  );
}
