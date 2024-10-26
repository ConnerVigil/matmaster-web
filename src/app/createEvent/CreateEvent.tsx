"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChevronLeft, Image01 } from "@untitled-ui/icons-react";

const eventSchema = z.object({
  eventImage: z.string().min(1, "Event image is required"),
  eventName: z.string().min(1, "Event name is required"),
  tournamentDates: z.string().min(1, "Tournament dates are required"),
  location: z.string().min(1, "Location is required"),
  style: z.string().min(1, "Style is required"),
  moreInfo: z.string().optional(),
  earlyBirdPrice: z.string().optional(),
  earlyBirdCollectionDates: z.string().optional(),
  regularPrice: z.string().min(1, "Regular price is required"),
  regularCollectionDates: z
    .string()
    .min(1, "Regular collection dates are required"),
  lastMinutePrice: z.string().optional(),
  lastMinuteCollectionDates: z.string().optional(),
  atTheDoorPrice: z.string().optional(),
  atTheDoorCollectionDates: z.string().optional(),
  spectatorPrice: z.string().optional(),
  spectatorDuration: z.string().optional(),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
  facebookHandle: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

type FormData = z.infer<typeof eventSchema>;

const CreateEvent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(eventSchema),
  });
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  const handleBack = () => {
    router.push("/yourevents");
  };

  const renderPriceInput = (name: keyof FormData, placeholder: string) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        $
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className={`w-full p-2 pl-8 border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } text-gray3 rounded`}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  const renderCollectionDates = (name: keyof FormData, label: string) => (
    <div>
      <label className="block text-sm font-medium text-gray3 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className={`w-full p-2 border ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } text-gray3 rounded`}
            placeholder="Date"
          />
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto px-6 bg-white space-y-6"
    >
      <div className="relative mb-6 -mx-6">
        <Controller
          name="eventImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div
              className="w-full h-60 bg-gray-200 flex items-center justify-center cursor-pointer relative overflow-hidden"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    field.onChange(file.name);
                    setImagePreview(URL.createObjectURL(file));
                  }
                };
                input.click();
              }}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Event preview"
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-500 font-semibold flex items-center gap-2">
                  <Image01 />
                  {field.value ? field.value : "Add Image"}
                </div>
              )}
            </div>
          )}
        />
        <button
          className="absolute top-2 left-2 px-2 py-1 bg-[#f9f5ff] rounded-lg shadow border flex items-center gap-1 text-primaryLight text-sm font-semibold"
          onClick={handleBack}
        >
          <ChevronLeft />
          Back
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Event Name
        </label>
        <Controller
          name="eventName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`w-full p-2 border ${
                errors.eventName ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Event name"
            />
          )}
        />
        {errors.eventName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.eventName.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Tournament Dates
          </label>
          <Controller
            name="tournamentDates"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`w-full p-2 border ${
                  errors.tournamentDates ? "border-red-500" : "border-gray-300"
                } text-gray3 rounded`}
                placeholder="Date"
              />
            )}
          />
          {errors.tournamentDates && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tournamentDates.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Location
          </label>
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`w-full p-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } text-gray3 rounded`}
                placeholder="Location"
              />
            )}
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Style
        </label>
        <Controller
          name="style"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`w-full p-2 border ${
                errors.style ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Folkstyle"
            />
          )}
        />
        {errors.style && (
          <p className="text-red-500 text-xs mt-1">{errors.style.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          More Info
        </label>
        <Controller
          name="moreInfo"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              className={`w-full p-2 border ${
                errors.moreInfo ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              rows={4}
              placeholder="Description, pricing, etc."
            />
          )}
        />
        {errors.moreInfo && (
          <p className="text-red-500 text-xs mt-1">{errors.moreInfo.message}</p>
        )}
      </div>

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">Pricing</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Early Bird (optional)
          </label>
          {renderPriceInput("earlyBirdPrice", "00.00")}
        </div>
        {renderCollectionDates("earlyBirdCollectionDates", "Collection dates")}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Regular
          </label>
          {renderPriceInput("regularPrice", "00.00")}
        </div>
        {renderCollectionDates("regularCollectionDates", "Collection dates")}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Last Minute (optional)
          </label>
          {renderPriceInput("lastMinutePrice", "00.00")}
        </div>
        {renderCollectionDates("lastMinuteCollectionDates", "Collection dates")}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            At The Door (optional)
          </label>
          {renderPriceInput("atTheDoorPrice", "00.00")}
        </div>
        {renderCollectionDates("atTheDoorCollectionDates", "Collection dates")}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Spectator
        </label>
        {renderPriceInput("spectatorPrice", "00.00")}
      </div>

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Contact Information
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Email Address
        </label>
        <Controller
          name="emailAddress"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              className={`w-full p-2 border ${
                errors.emailAddress ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Enter email address"
            />
          )}
        />
        {errors.emailAddress && (
          <p className="text-red-500 text-xs mt-1">
            {errors.emailAddress.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray3 mb-1">
          Phone Number
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="tel"
              className={`w-full p-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } text-gray3 rounded`}
              placeholder="Enter phone number"
            />
          )}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Social Media (optional)
      </h2>

      {["twitter", "instagram", "facebook"].map((platform) => (
        <div key={platform} className="mb-6">
          <label className="block text-sm font-medium text-gray3 mb-1">
            {platform.charAt(0).toUpperCase() + platform.slice(1)} Handle
          </label>
          <Controller
            name={`${platform}Handle` as keyof FormData}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="w-full p-2 border border-gray-300 text-gray3 rounded"
                placeholder={`Enter ${platform} handle`}
              />
            )}
          />
        </div>
      ))}

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Terms & Conditions (optional)
      </h2>

      <div className="mb-6">
        <Controller
          name="termsAndConditions"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full p-2 border border-gray-300 text-gray3 rounded"
              rows={4}
              placeholder="Copy and paste your terms & conditions"
            />
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primaryLight text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-600 transition"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;
