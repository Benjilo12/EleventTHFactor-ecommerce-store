import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  reviewTitle: string;
  username: string;
  userImage: string;
  reviewText: string;
};

export default function ReviewCard({
  reviewTitle,
  userImage,
  username,
  reviewText,
}: Props) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 mx-2 h-full flex flex-col justify-between">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {reviewTitle}
      </h2>

      {/* Stars */}
      <div className="mt-2 flex items-center justify-start space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className="text-yellow-500 w-5 h-5 fill-yellow-500"
          />
        ))}
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        {reviewText}
      </p>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 my-4" />

      {/* User Info */}
      <div className="flex items-center space-x-4 mt-auto">
        <Image
          src={userImage}
          alt={username}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div className="text-left">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            {username}
          </h3>
        </div>
      </div>
    </div>
  );
}
