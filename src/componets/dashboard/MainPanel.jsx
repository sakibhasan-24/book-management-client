import { Sidebar } from "flowbite-react";
import React, { useEffect } from "react";
import {
  HiArrowSmRight,
  HiBookOpen,
  HiCash,
  HiChartPie,
  HiDocumentAdd,
  HiInbox,
  HiOutlineBookOpen,
  HiOutlineBookmarkAlt,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUserAdd,
  HiUserCircle,
  HiViewBoards,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import { HiReceiptPercent } from "react-icons/hi2";
import { GrDeliver } from "react-icons/gr";
import { BiBook } from "react-icons/bi";
import DeliveryMan from "./deliveryman/DeliveryMan";

export default function MainPanel() {
  const { users, getAllUsers } = useGetAllUsers();
  // const { currentUser } = console.log(users.length);
  useEffect(() => {
    getAllUsers();
  }, [users?.length]);

  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.user.role);

  //   console.log(currentUser.user.isAdmin);
  if (currentUser?.user?.role === "deliveryMan") {
    return (
      <div className="w-full flex flex-col sm:flex-row bg-gray-100">
        <div className="w-full sm:w-[300px] md:w-[300px]">
          <Sidebar aria-label="Default sidebar example" as={"div"}>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Link to="/dashboard/profile">
                  <Sidebar.Item icon={HiUserCircle} as={"div"}>
                    profile
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard/assigned-orders">
                  <Sidebar.Item icon={HiOutlineClipboardCheck} as={"div"}>
                    orders
                  </Sidebar.Item>
                </Link>

                <Sidebar.Item href="#" icon={HiTable}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    );
  }

  if (currentUser?.user?.role !== "deliveryMan") {
    return (
      <div className="w-full flex flex-col sm:flex-row bg-gray-100">
        <div className="w-full sm:w-[300px] md:w-[300px]">
          <Sidebar aria-label="Default sidebar example" as={"div"}>
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                {currentUser?.user?.role === "admin" && (
                  <Link to="/dashboard/admin">
                    {" "}
                    <Sidebar.Item icon={HiOutlineClipboardList} as={"div"}>
                      Dashboard
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.role === "user" && (
                  <Link to="/dashboard/user">
                    {" "}
                    <Sidebar.Item icon={HiOutlineClipboardList} as={"div"}>
                      Dashboard
                    </Sidebar.Item>
                  </Link>
                )}

                <Link to="/dashboard/profile">
                  {" "}
                  <Sidebar.Item icon={HiUserCircle} as={"div"}>
                    profile
                  </Sidebar.Item>
                </Link>

                {currentUser?.user?.isAdmin && (
                  <Link to="/dashboard/users">
                    <Sidebar.Item
                      icon={HiOutlineUserGroup}
                      as={"div"}
                      label={users?.length}
                    >
                      Users
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.isAdmin === false && (
                  <Link to="/dashboard/add-books">
                    <Sidebar.Item
                      icon={HiDocumentAdd}
                      className={`cursor-pointer`}
                      as={"div"}
                    >
                      Add Books
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user && (
                  <Link to={`/dashboard/orders/${currentUser?.user._id}`}>
                    <Sidebar.Item icon={HiShoppingBag} as={"div"}>
                      Orders
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.isAdmin && (
                  <Link to={`/dashboard/deliveryManLists`}>
                    <Sidebar.Item icon={HiCash} as={"div"}>
                      Delivery Man
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.isAdmin === false && (
                  <Link to="/dashboard/add-books">
                    <Sidebar.Item
                      icon={HiOutlineBookOpen}
                      className={`cursor-pointer`}
                      as={"div"}
                    >
                      Add Books
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.isAdmin === false && (
                  <Link to="/dashboard/mybooks">
                    <Sidebar.Item
                      icon={HiBookOpen}
                      className={`cursor-pointer`}
                      as={"div"}
                    >
                      My Books
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.isAdmin && (
                  <Link to="/dashboard/mybooks">
                    <Sidebar.Item
                      icon={HiBookOpen}
                      className={`cursor-pointer`}
                      as={"div"}
                    >
                      Books
                    </Sidebar.Item>
                  </Link>
                )}
                {currentUser?.user?.role !== "deliveryMan" && (
                  <Link to="/dashboard/rentBooks">
                    <Sidebar.Item
                      icon={HiBookOpen}
                      className={`cursor-pointer`}
                      as={"div"}
                    >
                      Rent Books
                    </Sidebar.Item>
                  </Link>
                )}

                <Sidebar.Item href="#" icon={HiOutlineClipboardList}>
                  Sign Up
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    );
  }
}
