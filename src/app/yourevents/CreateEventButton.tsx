"use client";

import React from "react";
import { FaPlus } from "react-icons/fa";

export default function CreateEventButton() {
  const handleCreateNewEvent = () => {
    console.log("Create new event");
  };

  return (
    <button
      className="flex items-center bg-primary text-white px-4 py-2 rounded-md"
      onClick={handleCreateNewEvent}
    >
      <FaPlus className="mr-2" />
      Create new event
    </button>
  );
}
