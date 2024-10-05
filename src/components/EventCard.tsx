import React from "react";
import Image from "next/image";
import {
  Calendar,
  InfoCircle,
  MarkerPin01,
  Users01,
} from "@untitled-ui/icons-react";

interface EventCardProps {
  title: string;
  dateRange: string;
  attendees: number;
  style: string;
  location: string;
  price: string;
  status?: string;
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "early bird":
      return "bg-blue-100 text-blue-800";
    case "in progress":
      return "bg-yellow-100 text-yellow-800";
    case "complete":
      return "bg-gray-100 text-gray-800";
    case "registration open":
      return "bg-green-100 text-green-800";
    case "registration closed":
      return "bg-red-100 text-red-800";
    case "registration closing":
      return "bg-red-100 text-red-800";
    default:
      return "bg-black text-white";
  }
}

export default function EventCard({
  title,
  dateRange,
  attendees,
  style,
  location,
  price,
  status,
}: EventCardProps) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-24 bg-gray-200 relative">
        <Image
          src="/rockwellRumble.webp"
          alt="Company Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {status && (
          <span
            className={`absolute bottom-2 right-2 text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        )}
      </div>
      <div className="p-2 text-textSecondary">
        <h2 className="text-xl font-bold mb-2 text-textPrimary">{title}</h2>
        <div className="flex items-center mb-1">
          <Calendar className="w-3 h-3 mr-2 text-textSecondary" />
          <span className="text-sm">{dateRange}</span>
        </div>
        <div className="flex items-center mb-1">
          <Users01 className="w-3 h-3 mr-2 text-textSecondary" />
          <span className="text-sm">{attendees} Attendees</span>
        </div>
        <div className="flex items-center mb-1">
          <InfoCircle className="w-3 h-3 mr-2 text-textSecondary" />
          <span className="text-sm">{style}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MarkerPin01 className="w-3 h-3 mr-2 text-textSecondary" />
            <span className="text-sm">{location}</span>
          </div>
          <span className="text-sm">{price}</span>
        </div>
      </div>
    </div>
  );
}
