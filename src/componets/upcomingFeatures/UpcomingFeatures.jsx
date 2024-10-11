import React from "react";
import {
  SwapOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const futurePlansData = [
  {
    icon: <SwapOutlined className="text-4xl text-blue-500" />,
    title: "Book Exchange System",
    description:
      "We are building a book exchange system where students can swap their books and support each other.",
  },
  {
    icon: <SolutionOutlined className="text-4xl text-green-500" />,
    title: "Study Material Sharing Events",
    description:
      "Organizing events to help students share study materials and collaborate on projects.",
  },
  {
    icon: <TeamOutlined className="text-4xl text-red-500" />,
    title: "Community Growth Features",
    description:
      "Introducing community features that enhance student collaboration and foster knowledge-sharing.",
  },
];

export default function UpcomingFeatures() {
  return (
    <div className="my-12 w-full p-4 sm:max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-100 bg-green-600 p-4 rounded-md mb-4">
          Upcoming Features
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
        {futurePlansData.map((plan, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-8 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-green-400 cursor-pointer"
          >
            <div className="mb-4">{plan.icon}</div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {plan.title}
              </h3>
              <p className="text-gray-600">{plan.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
