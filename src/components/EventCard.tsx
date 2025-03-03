"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CurrencyDollar,
  InfoCircle,
  MarkerPin01,
  Users01,
} from "@untitled-ui/icons-react";

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

interface EventCardProps {
  title: string;
  dateRange: string;
  attendees: number;
  style: string;
  location: string;
  price: string;
  status?: string;
  imageSource: string | null;
  draft?: boolean;
  eventId?: number;
}

export default function EventCard({
  title,
  dateRange,
  attendees,
  style,
  location,
  price,
  status,
  imageSource,
  draft,
  eventId,
}: EventCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (eventId) {
      router.push(`/event/${eventId}`);
    }
  };

  return (
    <div
      className="w-64 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className={`h-24 relative ${imageSource ? "" : "bg-gray-100"}`}>
        {imageSource && (
          <Image
            src={imageSource}
            alt="Event Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {status && (
          <span
            className={`absolute bottom-2 right-2 text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(
              status
            )}`}
          >
            {status}
          </span>
        )}
        {draft && (
          <span className="absolute top-2 left-2 text-xs px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
            Draft
          </span>
        )}
      </div>
      <div className="px-2 py-3 text-gray3">
        <h2 className="text-xl font-bold mb-2 text-gray1">{title}</h2>
        <div className="flex items-center mb-1">
          <Calendar className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{dateRange}</span>
        </div>
        <div className="flex items-center mb-1">
          <CurrencyDollar className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{price}</span>
        </div>
        <div className="flex items-center mb-1">
          <InfoCircle className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{style}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MarkerPin01 className="w-3 h-3 mr-2 text-gray3" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center">
            <Users01 className="w-3 h-3 mr-2 text-gray3" />
            <span className="text-sm">{attendees}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
