"use client";

import { Plus } from "@untitled-ui/icons-react";
import React from "react";

export default function CreateEventButton() {
  const handleCreateNewEvent = () => {
    console.log("Create new event");
  };

  return (
    <button
      className="flex items-center bg-primary text-white px-4 py-2 rounded-md"
      onClick={handleCreateNewEvent}
    >
      <Plus className="mr-2" />
      Create new event
    </button>
  );
}
