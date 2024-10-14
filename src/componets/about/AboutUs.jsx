import React, { useEffect } from "react";
import {
  RocketOutlined,
  AimOutlined,
  HeartOutlined,
  FlagOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Aos from "aos";
export default function AboutUs() {
  // Data for the About Us sections and Future Plans
  const aboutUsData = [
    {
      icon: (
        <RocketOutlined className="text-5xl bg-blue-300 p-4 rounded-full text-blue-500" />
      ),
      title: "Our Motivation",
      description:
        "We believe books can transform lives, and we aim to make it easier for students to buy, rent, and share books.",
    },
    {
      icon: (
        <AimOutlined className="text-5xl bg-green-300 p-4 rounded-full text-green-500" />
      ),
      title: "Our Vision",
      description:
        "To create a future where every student has affordable access to the books they need to succeed.",
    },
    {
      icon: (
        <HeartOutlined className="text-5xl bg-red-300 p-4 rounded-full text-red-500" />
      ),
      title: "Our Mission",
      description:
        "We connect students to easily buy, rent, or exchange books and foster a community of learning.",
    },
    {
      icon: (
        <FlagOutlined className="text-5xl bg-yellow-300 p-4 rounded-full text-yellow-500" />
      ),
      title: "Our Goals",
      description:
        "To build a sustainable platform that promotes buying, renting, and exchanging books with ease.",
    },
  ];
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full sm:max-w-5xl  mx-auto px-6 py-16 ">
      <div className="text-center my-16">
        <h2
          data-aos="fade-down"
          className="text-3xl font-bold text-gray-100 bg-green-600 p-4 rounded-md mb-4"
        >
          About Us
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We are dedicated to making books accessible, affordable, and shareable
          for students everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {aboutUsData.map((section, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-white to-gray-100 p-8 rounded-lg shadow-lg flex flex-col justify-center gap-6 items-center space-x-6 cursor-pointer hover:border-2 hover:border-green-500 transition-all duration-500"
          >
            <div className="text-center text-7xl">{section.icon}</div>

            <div>
              <h3 className="text-xl text-center font-semibold text-gray-700 mb-2">
                {section.title}
              </h3>
              <p className="text-gray-600 text-center">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
