import React from "react";
import Image from "next/image";
import { FaShareAlt, FaTrash } from "react-icons/fa";
import { getStatusColor } from "@/lib/frontend/EventColor";

interface Event {
  id: number;
  name: string;
  status: string;
  date: string;
  style: string;
  location: string;
  attendees: number;
  price: number;
}

interface EventTableProps {
  events: Event[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Name",
              "Status",
              "Date",
              "Style",
              "Location",
              "Attendees",
              "Price",
              "",
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      src={"/rockwellRumble.webp"}
                      alt={"The Rockwell Rumble"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {event.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.style}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500">
                {event.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {event.attendees}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${event.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500 mr-2">
                  <FaShareAlt className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <FaTrash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
