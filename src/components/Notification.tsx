import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface NotificationProps {
  title: string;
  description: string;
  action: string;
}

export default function Notification({
  title,
  description,
  action,
}: NotificationProps) {
  return (
    <div className="p-4">
      <div className="flex items-center mb-2 text-textPrimary cursor-default">
        <FaExclamationCircle className="mr-1" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3 cursor-default">{description}</p>
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-red-500 text-white text-sm rounded-md shadow-lg">
          {action}
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white text-sm rounded-md shadow-lg">
          Got it
        </button>
      </div>
    </div>
  );
}
