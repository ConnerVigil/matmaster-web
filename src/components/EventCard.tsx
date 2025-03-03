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
      return "";
  }
}

function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case "Early_Bird":
      return "Early Bird";
    case "In_Progress":
      return "In Progress";
    case "Complete":
      return "Complete";
    case "Registration_Open":
      return "Registration Open";
    case "Registration_Closed":
      return "Registration Closed";
    case "Registration_Closing":
      return "Registration Closing";
    default:
      return "";
  }
}

function getEventStatus(event: Event): string {
  const now = new Date();

  // Check if event has ended
  if (event.End_Date && new Date(event.End_Date) < now) {
    return "Complete";
  }

  // Check if event is in progress
  if (
    event.Start_Date &&
    new Date(event.Start_Date) <= now &&
    event.End_Date &&
    new Date(event.End_Date) >= now
  ) {
    return "In_Progress";
  }

  // Check Early Bird period
  if (event.Early_Bird_Start_Date && event.Early_Bird_End_Date) {
    const earlyBirdStart = new Date(event.Early_Bird_Start_Date);
    const earlyBirdEnd = new Date(event.Early_Bird_End_Date);

    if (now >= earlyBirdStart && now <= earlyBirdEnd) {
      return "Early_Bird";
    }
  }

  // Check Regular registration period
  if (event.Regular_Start_Date && event.Regular_End_Date) {
    const regularStart = new Date(event.Regular_Start_Date);
    const regularEnd = new Date(event.Regular_End_Date);

    if (now >= regularStart && now <= regularEnd) {
      return "Registration_Open";
    }

    // If we're approaching the end of regular registration (within 3 days)
    const threeDaysBeforeEnd = new Date(regularEnd);
    threeDaysBeforeEnd.setDate(threeDaysBeforeEnd.getDate() - 3);

    if (now >= threeDaysBeforeEnd && now <= regularEnd) {
      return "Registration_Closing";
    }
  }

  // Check Last Minute registration period
  if (event.Last_Minute_Start_Date && event.Last_Minute_End_Date) {
    const lastMinuteStart = new Date(event.Last_Minute_Start_Date);
    const lastMinuteEnd = new Date(event.Last_Minute_End_Date);

    if (now >= lastMinuteStart && now <= lastMinuteEnd) {
      return "Registration_Open";
    }
  }

  // Check At Door registration period
  if (event.At_Door_Start_Date && event.At_Door_End_Date) {
    const atDoorStart = new Date(event.At_Door_Start_Date);
    const atDoorEnd = new Date(event.At_Door_End_Date);

    if (now >= atDoorStart && now <= atDoorEnd) {
      return "Registration_Open";
    }
  }

  // If we're past all registration periods but the event hasn't started yet
  if (event.Start_Date && new Date(event.Start_Date) > now) {
    return "Registration_Closed";
  }

  // Default fallback
  return event.State || "";
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  // Determine the current event status based on dates
  const eventStatus = getEventStatus(event);

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
        {eventStatus && (
          <span
            className={`absolute bottom-2 right-2 text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(
              eventStatus
            )}`}
          >
            {getStatusText(eventStatus)}
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
