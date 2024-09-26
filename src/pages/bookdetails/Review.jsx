import React from "react";
import { Card, Avatar } from "antd";
import StarRatings from "react-star-ratings";

export default function Review({ review }) {
  return (
    <div className="flex flex-col  items-start space-y-6 p-4 bg-gray-50 rounded-md shadow-md">
      <Card className="w-full bg-white border border-gray-200 shadow-sm">
        <div className="flex flex-col items-center space-x-4 p-4">
          <div className="flex flex-col space-y-2 items-center space-x-3">
            <Avatar src={review?.user.image} size="large" />
            <div>
              <p className="text-gray-500 text-sm">
                Name : {review?.user.userName}
              </p>
            </div>
          </div>

          {/* Rating and Comment */}
          <div className="ml-auto">
            <StarRatings
              rating={review?.rating}
              starRatedColor="gold"
              numberOfStars={5}
              name="rating"
              starDimension="22px"
              starSpacing="4px"
            />
            <p className="text-gray-600 mt-2 text-sm text-center">
              {review.comment ? review.comment : "No comment provided."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
