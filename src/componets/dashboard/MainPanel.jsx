import { Sidebar } from "flowbite-react";
import React from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUserAdd,
  HiViewBoards,
} from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";

export default function MainPanel() {
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
                <Sidebar.Item href="#" icon={HiUserAdd} as={"div"}>
                  profile
                </Sidebar.Item>
              </Link>
              <Sidebar.Item href="#" icon={HiInbox} label="3">
                Inbox
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Users
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Sign In
              </Sidebar.Item>
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
