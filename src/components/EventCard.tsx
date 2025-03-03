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
import { Event } from "@prisma/client";
import { formatDate } from "@/utils/dateFormatter";

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "Early_Bird":
      return "bg-blue-100 text-blue-800";
    case "In_Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Complete":
      return "bg-gray-100 text-gray-800";
    case "Registration_Open":
      return "bg-green-100 text-green-800";
    case "Registration_Closed":
      return "bg-red-100 text-red-800";
    case "Registration_Closing":
      return "bg-red-100 text-red-800";
    default:
      return "bg-black text-white";
  }
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (event.ID) {
      router.push(`/event/${event.ID}`);
    }
  };

  return (
    <div
      className="w-64 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200"
      onClick={handleClick}
    >
      <div className={`h-24 relative ${event.Image_URL ? "" : "bg-gray-100"}`}>
        {event.Image_URL && (
          <Image
            src={event.Image_URL}
            alt="Event Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {event.State && (
          <span
            className={`absolute bottom-2 right-2 text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(
              event.State
            )}`}
          >
            {event.State}
          </span>
        )}
        {event.Status === "DRAFT" && (
          <span className="absolute top-2 left-2 text-xs px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">
            Draft
          </span>
        )}
      </div>
      <div className="px-2 py-3 text-gray3">
        <h2 className="text-xl font-bold mb-2 text-gray1">{event.Name}</h2>
        <div className="flex items-center mb-1">
          <Calendar className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{`${formatDate(
            new Date(event.Start_Date)
          )} - ${formatDate(new Date(event.End_Date))}`}</span>
        </div>
        <div className="flex items-center mb-1">
          <CurrencyDollar className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{event.Regular_Pricing.toString()}</span>
        </div>
        <div className="flex items-center mb-1">
          <InfoCircle className="w-3 h-3 mr-2 text-gray3" />
          <span className="text-sm">{event.Style}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MarkerPin01 className="w-3 h-3 mr-2 text-gray3" />
            <span className="text-sm">{event.Location}</span>
          </div>
          <div className="flex items-center">
            <Users01 className="w-3 h-3 mr-2 text-gray3" />
            <span className="text-sm">{event.Attendees}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
