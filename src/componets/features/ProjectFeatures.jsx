import React from "react";
import {
  UserOutlined,
  UploadOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
  MoneyCollectOutlined, // Icon for Payment
  TruckOutlined, // Icon for Delivery
} from "@ant-design/icons";

const projectFeaturesData = [
  {
    name: "User Account Management",
    description:
      "Create an account, update your profile, and manage activities seamlessly.",
    icon: <UserOutlined style={{ color: "#4A90E2" }} />,
  },
  {
    name: "Book Upload & Earnings",
    description:
      "Upload your books for others to buy or rent, earning money post-approval.",
    icon: <UploadOutlined style={{ color: "#E67E22" }} />,
  },
  {
    name: "Ratings & Reviews",
    description:
      "Rate books and help others discover the best reads while sharing feedback.",
    icon: <StarOutlined style={{ color: "#F39C12" }} />,
  },
  {
    name: "Delivery Status",
    description:
      "Track the delivery status of your purchased or rented books in real time.",
    icon: <ClockCircleOutlined style={{ color: "#9B59B6" }} />,
  },
  {
    name: "Admin Control",
    description:
      "Admins can accept or reject book uploads, ensuring verified content.",
    icon: <CheckOutlined style={{ color: "#27AE60" }} />,
  },
  {
    name: "Buy & Rent Options",
    description:
      "Choose between buying a book or renting it for a limited time.",
    icon: <ShoppingOutlined style={{ color: "#2980B9" }} />,
  },
  {
    name: "Payment Options",
    description:
      "Multiple payment options available for seamless transactions.",
    icon: <MoneyCollectOutlined style={{ color: "#F39C12" }} />, // Payment icon
  },
  {
    name: "Delivery Management",
    description:
      "Manage and track deliveries for timely and efficient service.",
    icon: <TruckOutlined style={{ color: "#3498DB" }} />, // Delivery icon
  },
  {
    name: "Protection against Abuse",
    description:
      "Users cannot purchase their own books; late returns may lead to account blocks.",
    icon: <ExclamationCircleOutlined style={{ color: "#C0392B" }} />,
  },
];

export default function ProjectFeatures() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our Features
      </h2>
      <p className="text-center text-gray-700 font-semibold mb-8">
        Discover a range of features designed to enhance your experience,
        ensuring seamless book management, efficient delivery, and user-friendly
        payment options. We strive to provide an exceptional platform for book
        lovers and sellers alike.
      </p>
      <div className="flex flex-wrap justify-center gap-10">
        {projectFeaturesData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center transition-transform duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl ">
              <div
                className={`text-4xl ${
                  index % 3 === 0 ? "animate-pulse" : "animate-bounce"
                }`}
              >
                {feature.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.name}
            </h3>
            <p className="text-gray-600 text-center">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
