"use client";

import { Plus } from "@untitled-ui/icons-react";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";

export default function CreateEventButton() {
  const router = useRouter();

  const handleCreateNewTournaments = () => {
    router.push("/createTournaments");
  };

  const handleCreateNewDualMeet = () => {
    router.push("/createDualMeet");
  };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="flex items-center bg-primaryLight text-white px-4 py-2 rounded-md"
        onClick={showModal}
      >
        <Plus className="mr-2" />
        Create new event
      </button>
      <Modal
        open={open}
        title="Event Type"
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            color="danger"
            variant="outlined"
          >
            Cancel
          </Button>,
        ]}
      >
        <p>Please select what type of event this is.</p>
        <div className="flex flex-col mt-4 gap-4">
          <button
            className="p-4 border-2 rounded-lg border-gray6 hover:bg-gray6"
            onClick={handleCreateNewTournaments}
          >
            <div className="font-extrabold">Tournaments</div>
            <p>
              Multiple brackets exist where wrestlers compete for first place.
            </p>
          </button>
          <button
            className="p-4 border-2 rounded-lg border-gray6 hover:bg-gray6"
            onClick={handleCreateNewDualMeet}
          >
            <div className="font-extrabold">Dual Meet</div>
            <p>Head-to-head matches where teams compete for points.</p>
          </button>
        </div>
      </Modal>
    </>
  );
}
