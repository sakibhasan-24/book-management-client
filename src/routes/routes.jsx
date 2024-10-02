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
import Address from "../pages/address/Address";
import Payments from "../pages/payment/Payment";
import PlaceOrders from "../pages/placeorders/PlaceOrders";
import Orders from "../pages/Order/Orders";
import OrderLists from "../componets/dashboard/orderlists/OrderLists";
import JoinAsDeliveryMan from "../componets/deliveryManButton/JoinAsDeliveryMan";
import DeliveryMan from "../componets/dashboard/deliveryman/DeliveryMan";
import DeliveryManLists from "../pages/deliverymanlists/DeliveryManLists";
import AdminRoutes from "./AdminRoutes";
import AssignedOrders from "../componets/dashboard/deliveryManOrdersPage/AssignedOrders";
import RentBooks from "../pages/rentBooks/RentBooks";

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
          {
            path: "/dashboard/deliveryManLists",
            element: (
              <PrivateRoutes>
                <AdminRoutes>
                  <DeliveryManLists />
                </AdminRoutes>
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/orders/:id",
            element: (
              <PrivateRoutes>
                <OrderLists />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/assigned-orders",
            element: (
              <PrivateRoutes>
                <AssignedOrders />
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard/rentBooks",
            element: (
              <PrivateRoutes>
                <RentBooks />
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
      {
        path: "/address",
        element: (
          <PrivateRoutes>
            <Address />
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoutes>
            <Payments />
          </PrivateRoutes>
        ),
      },
      {
        path: "/placeorder",
        element: (
          <PrivateRoutes>
            <PlaceOrders />
          </PrivateRoutes>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoutes>
            <Orders />
          </PrivateRoutes>
        ),
      },

      ,
      {
        path: "/deliveryMan-login",
        element: <JoinAsDeliveryMan />,
      },
      {
        path: "/deliveryman",
        element: <DeliveryMan />,
      },

      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
