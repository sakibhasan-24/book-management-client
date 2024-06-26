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
            path: "/dashboard/contact",
            element: <Home />,
          },
        ],
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
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default router;
