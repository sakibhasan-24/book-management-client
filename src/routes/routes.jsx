import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import RegistrationLayout from "../pages/registrationLayout/RegistrationLayout";
import Signup from "../pages/registrationLayout/signup/Signup";
import Login from "../pages/registrationLayout/login/Login";
import ErrorPage from "../pages/errorpage/ErrorPage";
import MainPanel from "../componets/dashboard/MainPanel";
import Profile from "../componets/dashboard/profile/Profile";
import PrivateRoutes from "./PrivateRoutes";

import Users from "../componets/dashboard/users/Users";
import Addbooks from "../componets/dashboard/addbooks/Addbooks";
import MyBooks from "../componets/dashboard/mybooks/MyBooks";
import UpdateBook from "../componets/dashboard/mybooks/updatebook/UpdateBook";
import BookDetails from "../pages/bookdetails/BookDetails";
import ApplyForDelivery from "../componets/dashboard/delivery/ApplyForDelivery";
import ApplyStatus from "../componets/dashboard/applyStatus/ApplyStatus";
import CartItems from "../pages/cartItems/CartItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      { path: "/", element: <Home /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <MainPanel />
          </PrivateRoutes>
        ),
        children: [
          {
            path: "/dashboard/profile",
            element: (
              <PrivateRoutes>
                <Profile />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/users",
            element: (
              <PrivateRoutes>
                <Users />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/add-books",
            element: (
              <PrivateRoutes>
                <Addbooks />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/mybooks",
            element: (
              <PrivateRoutes>
                <MyBooks />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/applyStatus",
            element: (
              <PrivateRoutes>
                <ApplyStatus />
              </PrivateRoutes>
            ),
          },

          {
            path: "/dashboard/apply/:id",
            element: (
              <PrivateRoutes>
                <ApplyForDelivery />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/update-book/:bookId",
            element: (
              <PrivateRoutes>
                <UpdateBook />
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: "/book/:bookId",
        element: <BookDetails />,
      },

      {
        path: "/user-credentials",
        element: <RegistrationLayout />,
        children: [
          {
            path: "/user-credentials/signup",
            element: <Signup />,
          },
          {
            path: "/user-credentials/login",
            element: <Login />,
          },
        ],
      },
      {
        path: "/cartItems",
        element: (
          <PrivateRoutes>
            <CartItems />
          </PrivateRoutes>
        ),
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
