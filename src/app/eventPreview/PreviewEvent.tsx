"use client";

import EventCard from "@/components/EventCard";
import { eventService } from "@/lib/frontend/services/eventService";
import { formatDate } from "@/utils/dateFormatter";
import { Event } from "@prisma/client";
import { ChevronLeft } from "@untitled-ui/icons-react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { FaFacebook, FaInstagram, FaXTwitter, FaGlobe } from "react-icons/fa6";

interface Props {
  event: Event;
}

const PreviewEvent: React.FC<Props> = ({ event }) => {
  const router = useRouter();

  const ensureHttpProtocol = (url: string): string => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const handleBack = () => {
    router.back();
  };

  const handlePublish = async () => {
    await eventService.publishEvent(event.ID);
    message.success("Event published successfully!");
    router.push(`/event/${event.ID}`);
  };

  const handleDelete = async () => {
    await eventService.deleteEvent(event.ID);
    message.success("Event deleted successfully!");
    router.push("/yourevents");
  };

  return (
    <div>
      <div className="p-6">
        <button
          className="p-1 bg-[#f9f5ff] rounded-lg shadow border flex items-center text-primaryLight text-sm font-semibold"
          onClick={handleBack}
        >
          <ChevronLeft />
          Edit Event
        </button>
      </div>

      <div className="flex justify-center">
        <EventCard
          status={"Registration Open"}
          draft={event.Status === "DRAFT"}
          title={event.Name}
          dateRange={`${formatDate(new Date(event.Start_Date))} - ${formatDate(
            new Date(event.End_Date)
          )}`}
          attendees={0}
          style={event.Style}
          location={event.Location || ""}
          price={event.Regular_Pricing?.toString() || "50"}
          imageSource={event.Image_URL || ""}
        />
      </div>

      <div className="m-6">
        <h2 className="text-black font-bold text-2xl mb-1">More info</h2>
        <p className="text-gray1">{event.More_Info}</p>
      </div>

      {/* Pricing Section */}
      <div className="m-6">
        <h2 className="text-black font-bold text-2xl mb-4">Pricing</h2>

        <div className="border-t border-gray-200">
          {event.Early_Bird_Pricing && (
            <div className="flex items-center py-4 border-b border-gray-200">
              <span className="text-blue-500 font-medium w-1/3">
                Early bird
              </span>
              <span className="text-black font-medium text-xl w-1/3 text-left">
                ${event.Early_Bird_Pricing.toString()}
              </span>
              <span className="text-gray-600 w-1/3 text-right">
                {event.Early_Bird_Start_Date && event.Early_Bird_End_Date
                  ? `${formatDate(
                      new Date(event.Early_Bird_Start_Date)
                    )} - ${formatDate(new Date(event.Early_Bird_End_Date))}`
                  : "Jan 9 - Jan 14"}
              </span>
            </div>
          )}

          <div className="flex items-center py-4 border-b border-gray-200">
            <span className="text-green-600 font-medium w-1/3">Regular</span>
            <span className="text-black font-medium text-xl w-1/3 text-left">
              ${event.Regular_Pricing?.toString() || "50"}
            </span>
            <span className="text-gray-600 w-1/3 text-right">
              {event.Regular_Start_Date && event.Regular_End_Date
                ? `${formatDate(
                    new Date(event.Regular_Start_Date)
                  )} - ${formatDate(new Date(event.Regular_End_Date))}`
                : "Jan 15 - Jan 18"}
            </span>
          </div>

          {event.Last_Minute_Pricing && (
            <div className="flex items-center py-4 border-b border-gray-200">
              <span className="text-orange-500 font-medium w-1/3">
                Last minute
              </span>
              <span className="text-black font-medium text-xl w-1/3 text-left">
                ${event.Last_Minute_Pricing.toString()}
              </span>
              <span className="text-gray-600 w-1/3 text-right">
                {event.Last_Minute_Start_Date && event.Last_Minute_End_Date
                  ? `${formatDate(
                      new Date(event.Last_Minute_Start_Date)
                    )} - ${formatDate(new Date(event.Last_Minute_End_Date))}`
                  : "Jan 19 - Jan 20"}
              </span>
            </div>
          )}

          {event.At_Door_Pricing && (
            <div className="flex items-center py-4 border-b border-gray-200">
              <span className="text-red-500 font-medium w-1/3">At door</span>
              <span className="text-black font-medium text-xl w-1/3 text-left">
                ${event.At_Door_Pricing.toString()}
              </span>
              <span className="text-gray-600 w-1/3 text-right">
                {event.At_Door_Start_Date && event.At_Door_End_Date
                  ? `${formatDate(
                      new Date(event.At_Door_Start_Date)
                    )} - ${formatDate(new Date(event.At_Door_End_Date))}`
                  : "Jan 21 - Jan 22"}
              </span>
            </div>
          )}

          {event.Spectator_Pricing && (
            <div className="flex items-center py-4 border-b border-gray-200">
              <span className="text-gray-600 font-medium w-1/3">Spectator</span>
              <span className="text-black font-medium text-xl w-1/3 text-left">
                ${event.Spectator_Pricing.toString()}
              </span>
              <span className="text-gray-600 w-1/3 text-right">all days</span>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="m-6">
        <h2 className="text-black font-bold text-2xl mb-4">Contact info</h2>

        <div>
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-gray-600">Phone number:</span>
            <span className="text-black">
              {event.Contact_Phone || "801-913-0877"}
            </span>
          </div>

          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-gray-600">Email</span>
            <span className="text-black">
              {event.Contact_Email || "sagalastone038@gmail.com"}
            </span>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-4 mt-6">
          {event.X_Link && (
            <a
              href={ensureHttpProtocol(event.X_Link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaXTwitter />
            </a>
          )}

          {event.Instagram_Link && (
            <a
              href={ensureHttpProtocol(event.Instagram_Link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaInstagram />
            </a>
          )}

          {event.Facebook_Link && (
            <a
              href={ensureHttpProtocol(event.Facebook_Link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaFacebook />
            </a>
          )}

          {event.Website_Link && (
            <a
              href={ensureHttpProtocol(event.Website_Link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaGlobe />
            </a>
          )}

          <div className="ml-auto">
            <a
              href={ensureHttpProtocol(
                event.Terms_And_Conditions_PDF_URL || ""
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              terms & conditions
            </a>
          </div>
        </div>

        {event.Terms_And_Conditions && (
          <div className="flex justify-between items-center py-4 border-b border-gray-200">
            <span className="text-gray-600">{event.Terms_And_Conditions}</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center px-6 py-4">
          <button
            className="text-red-700 hover:!bg-red-100 font-medium text-md px-8 py-2 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-40 !bg-primaryLight hover:!bg-purple-600 font-medium text-md px-8 py-2 rounded-lg"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewEvent;
