"use client";

import { Plus } from "@untitled-ui/icons-react";
import React from "react";
import { useRouter } from "next/navigation";

export default function CreateEventButton() {
  const router = useRouter();

  const handleCreateNewEvent = () => {
    router.push("/createEvent");
  };

  return (
    <button
      className="flex items-center bg-primaryLight text-white px-4 py-2 rounded-md"
      onClick={handleCreateNewEvent}
    >
      <Plus className="mr-2" />
      Create new event
    </button>
  );
}
