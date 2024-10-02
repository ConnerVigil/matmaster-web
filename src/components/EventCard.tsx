import React from "react";
import Image from "next/image";
import { getStatusColor } from "@/lib/frontend/EventColor";
import { Calendar, Clock, Map01, User01 } from "@untitled-ui/icons-react";

interface EventCardProps {
  title: string;
  dateRange: string;
  attendees: number;
  style: string;
  location: string;
  price: string;
  status?: string;
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
            className={`absolute bottom-2 right-2 ${
              getStatusColor(status) || "bg-gray-100 text-gray-800"
            } text-xs font-medium px-2.5 py-0.5 rounded`}
          >
            {status}
          </span>
        )}
      </div>
      <div className="p-2 text-gray-800">
        <h2 className="text-xl font-bold mb-2 text-textPrimary">{title}</h2>
        <div className="flex items-center mb-1">
          <Calendar className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm">{dateRange}</span>
        </div>
        <div className="flex items-center mb-1">
          <User01 className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm">{attendees} Attendees</span>
        </div>
        <div className="flex items-center mb-1">
          <Clock className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm">{style}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Map01 className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-sm">{location}</span>
          </div>
          <span className="text-textPrimary">{price}</span>
        </div>
      </div>
    </div>
  );
}
