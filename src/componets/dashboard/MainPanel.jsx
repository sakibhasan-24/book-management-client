import { Sidebar } from "flowbite-react";
import React, { useEffect } from "react";
import {
  HiArrowSmRight,
  HiBookOpen,
  HiChartPie,
  HiInbox,
  HiOutlineBookOpen,
  HiOutlineBookmarkAlt,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUserAdd,
  HiViewBoards,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import useGetAllUsers from "../../hooks/user/useGetAllUsers";
import { HiReceiptPercent } from "react-icons/hi2";
import { GrDeliver } from "react-icons/gr";

export default function MainPanel() {
  const { users, getAllUsers } = useGetAllUsers();
  // const { currentUser } = console.log(users.length);
  useEffect(() => {
    getAllUsers();
  }, [users?.length]);

  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.user.isAdmin);
  return (
    <div className="w-full flex flex-col sm:flex-row bg-gray-100">
      <div className="w-full sm:w-[300px] md:w-[300px]">
        <Sidebar aria-label="Default sidebar example" as={"div"}>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie} as={"div"}>
                Dashboard
              </Sidebar.Item>
              <Link to="/dashboard/profile">
                {" "}
                <Sidebar.Item icon={HiUserAdd} as={"div"}>
                  profile
                </Sidebar.Item>
              </Link>
              <Link to={`/dashboard/apply/${currentUser?.user?._id}`}>
                <Sidebar.Item as={"div"} icon={GrDeliver}>
                  Apply for delivery Man
                </Sidebar.Item>
              </Link>
              {currentUser?.user?.isAdmin && (
                <Link to="/dashboard/users">
                  <Sidebar.Item icon={HiUser} as={"div"} label={users?.length}>
                    Users
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
                    icon={HiOutlineBookmarkAlt}
                    className={`cursor-pointer`}
                    as={"div"}
                  >
                    My Books
                  </Sidebar.Item>
                </Link>
              )}

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
