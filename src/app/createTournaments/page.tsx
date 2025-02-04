"use client";

import React, { useEffect } from "react";
import CreateEvent from "./CreateEvent";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "../../lib/frontend/LoadingSpinner";

const CreateEventPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-white">
      <div className="shadow-2xl container mx-auto max-w-3xl pb-4">
        <CreateEvent />
      </div>
    </div>
  );
};

export default CreateEventPage;
