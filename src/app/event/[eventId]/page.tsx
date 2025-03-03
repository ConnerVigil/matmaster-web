import { prisma } from "@/lib/prisma";
import { formatDate } from "@/utils/dateFormatter";
import { ChevronLeft } from "@untitled-ui/icons-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaXTwitter, FaGlobe } from "react-icons/fa6";

interface Props {
  params: {
    eventId: string;
  };
}

const ensureHttpProtocol = (url: string): string => {
  if (!url) return "";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
};

export default async function EventPage({ params }: Props) {
  const eventId = parseInt(params.eventId);

  if (isNaN(eventId)) {
    notFound();
  }

  const event = await prisma.event.findUnique({
    where: { ID: eventId },
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="shadow-2xl container mx-auto max-w-3xl pb-4">
        <div className="relative flex justify-between items-center p-4"></div>

        <div className="flex justify-center mt-0">
          <div className="relative w-full h-96 bg-gray5">
            <Link
              href="/yourevents"
              className="absolute top-4 left-4 z-10 px-2 py-1 bg-[#f9f5ff] rounded-lg shadow border flex items-center gap-1 text-primaryLight text-sm font-semibold"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span>Back</span>
            </Link>

            {event.Image_URL && (
              <Image
                src={event.Image_URL}
                alt="Event preview"
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h1 className="text-3xl font-bold text-white mb-2">
                {event.Name}
              </h1>
              <p className="text-white">
                {formatDate(new Date(event.Start_Date))} -{" "}
                {formatDate(new Date(event.End_Date))}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-black font-bold text-2xl mb-4">Event Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-700 font-semibold mb-2">Date & Time</h3>
              <p className="text-gray-800">
                {formatDate(new Date(event.Start_Date))} -{" "}
                {formatDate(new Date(event.End_Date))}
              </p>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-2">Location</h3>
              <p className="text-gray-800">{event.Location || "TBA"}</p>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-2">Style</h3>
              <p className="text-gray-800">{event.Style}</p>
            </div>

            <div>
              <h3 className="text-gray-700 font-semibold mb-2">
                Number of Mats
              </h3>
              <p className="text-gray-800">{event.Number_Of_Mats || "TBA"}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-black font-bold text-2xl mb-4">More Info</h2>
          <p className="text-gray-800 whitespace-pre-line">
            {event.More_Info || "No additional information provided."}
          </p>
        </div>

        {/* Pricing Section */}
        <div className="p-8">
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
                    : ""}
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
                  : ""}
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
                    : ""}
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
                    : ""}
                </span>
              </div>
            )}

            {event.Spectator_Pricing && (
              <div className="flex items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium w-1/3">
                  Spectator
                </span>
                <span className="text-black font-medium text-xl w-1/3 text-left">
                  ${event.Spectator_Pricing.toString()}
                </span>
                <span className="text-gray-600 w-1/3 text-right">all days</span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="p-8">
          <h2 className="text-black font-bold text-2xl mb-4">Contact Info</h2>

          <div>
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-600">Phone number:</span>
              <span className="text-black">{event.Contact_Phone || ""}</span>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-600">Email</span>
              <span className="text-black">{event.Contact_Email || ""}</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 mt-6">
            {event.X_Link && (
              <a
                href={ensureHttpProtocol(event.X_Link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-2xl hover:text-blue-500 transition-colors"
              >
                <FaXTwitter />
              </a>
            )}

            {event.Instagram_Link && (
              <a
                href={ensureHttpProtocol(event.Instagram_Link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-2xl hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
            )}

            {event.Facebook_Link && (
              <a
                href={ensureHttpProtocol(event.Facebook_Link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-2xl hover:text-blue-600 transition-colors"
              >
                <FaFacebook />
              </a>
            )}

            {event.Website_Link && (
              <a
                href={ensureHttpProtocol(event.Website_Link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-2xl hover:text-purple-600 transition-colors"
              >
                <FaGlobe />
              </a>
            )}

            <div className="ml-auto">
              {event.Terms_And_Conditions_PDF_URL && (
                <a
                  href={ensureHttpProtocol(event.Terms_And_Conditions_PDF_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 underline"
                >
                  Terms & Conditions
                </a>
              )}
            </div>
          </div>

          {event.Terms_And_Conditions && (
            <div className="flex justify-between items-center py-4 border-b border-gray-200">
              <span className="text-gray-600">
                {event.Terms_And_Conditions}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="#register"
            className="bg-primaryLight hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}
