import { AlertCircle } from "@untitled-ui/icons-react";
import React from "react";

interface NotificationProps {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  onDismiss: () => void;
}

export default function Notification({
  title,
  description,
  action,
  onAction,
  onDismiss,
}: NotificationProps) {
  return (
    <div className="p-4">
      <div className="flex items-center mb-2 text-textPrimary cursor-default">
        <AlertCircle className="mr-1" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3 cursor-default">{description}</p>
      <div className="flex justify-between">
        <div
          onClick={onAction}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-md shadow-lg"
        >
          {action}
        </div>
        <div
          onClick={onDismiss}
          className="px-4 py-2 bg-purple-500 text-white text-sm rounded-md shadow-lg"
        >
          Got it
        </div>
      </div>
    </div>
  );
}
