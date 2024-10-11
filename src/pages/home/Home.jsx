import React from "react";
import Navbar from "../../componets/header/navbar/Navbar";
import AllBooks from "../../componets/homepageitems/AllBooks";
import UserSearchBooks from "../../componets/homepageitems/UserSearchBooks";
import TopBooks from "../../componets/topRatedBooks/TopBooks";
import CategoricalBooks from "../cartItems/categoricalBooks/CategoricalBooks";
import LatestBooks from "../../componets/latestBooks/LatestBooks";
import Banner from "../../componets/Banner/Banner";
import ProjectFeatures from "../../componets/features/ProjectFeatures";

export default function Home() {
  return (
    <div>
      <UserSearchBooks />
      <Banner />
      <LatestBooks />
      <TopBooks />
      <CategoricalBooks />
      <AllBooks />
      <ProjectFeatures />
    </div>
  );
}
