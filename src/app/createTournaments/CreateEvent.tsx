"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChevronLeft, Image01 } from "@untitled-ui/icons-react";
import { Input, Button, Form, Select } from "antd";
import dayjs from "dayjs";
import ContactInformation from "./ContactInformation";
import { EntryTypeENUM } from "@prisma/client";
import { StyleENUM } from "@prisma/client";
import { DatePicker } from "antd";
import { eventService } from "@/lib/frontend/services/eventService";
import TermsAndConditions from "./TermsAndConditions";
import Pricing from "./Pricing";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const eventSchema = z.object({
  eventImage: z.string().min(1, "Event image is required"),
  eventName: z.string().min(1, "Event name is required"),
  tournamentDates: z.object({
    start: z
      .date()
      .min(new Date(), "Start date must be in the future")
      .transform((date) => dayjs(date)),
    end: z.date().transform((date) => dayjs(date)),
  }),
  location: z.string().min(1, "Location is required"),
  style: z.nativeEnum(StyleENUM),
  moreInfo: z.string().optional(),
  eventEntryType: z.nativeEnum(EntryTypeENUM),
  earlyBirdPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid price format. Use numbers with up to two decimal places."
    )
    .optional(),
  earlyBirdCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional()
        .transform((date) => (date ? dayjs(date) : undefined)),
      end: z
        .date()
        .optional()
        .transform((date) => (date ? dayjs(date) : undefined)),
    })
    .optional(),
  regularPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid price format. Use numbers with up to two decimal places."
    )
    .optional(),
  regularCollectionDates: z.object({
    start: z
      .date()
      .min(new Date(), "Start date must be in the future")
      .transform((date) => dayjs(date)),
    end: z.date().transform((date) => dayjs(date)),
  }),
  lastMinutePrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid price format. Use numbers with up to two decimal places."
    )
    .optional(),
  lastMinuteCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional()
        .transform((date) => dayjs(date)),
      end: z
        .date()
        .optional()
        .transform((date) => dayjs(date)),
    })
    .optional(),
  atTheDoorPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid price format. Use numbers with up to two decimal places."
    )
    .optional(),
  atTheDoorCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional()
        .transform((date) => dayjs(date)),
      end: z
        .date()
        .optional()
        .transform((date) => dayjs(date)),
    })
    .optional(),
  spectatorPrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid price format. Use numbers with up to two decimal places."
    )
    .optional(),
  spectatorDuration: z.string().optional(),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  twitterHandle: z.string().optional(),
  instagramHandle: z.string().optional(),
  facebookHandle: z.string().optional(),
  termsAndConditions: z.string().optional(),
  termsAndConditionsPDF: z
    .custom<File>()
    .optional()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type === "application/pdf"),
      "Only PDF files are allowed"
    ),
});

export type FormData = z.infer<typeof eventSchema>;

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

  const onSubmit = async (data: FormData) => {
    try {
      // Attempt to upload event image and t&c's here?

      const createdEvent = await eventService.createEventAsDraft(data);

      if (createdEvent) {
        router.push(`/eventPreview/${createdEvent.ID}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleBack = () => {
    router.push("/yourevents");
  };

  const getNestedErrorMessage = (fieldName: keyof FormData) => {
    const error = errors[fieldName];
    if (error && typeof error === "object" && "start" in error) {
      return (error.start as { message?: string })?.message;
    }
    return error?.message?.toString();
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
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
            <Input
              {...field}
              status={errors.eventName ? "error" : ""}
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
            render={({ field }) => (
              <RangePicker
                className="w-full"
                value={[
                  field.value && typeof field.value === "object"
                    ? dayjs(field.value.start)
                    : null,
                  field.value && typeof field.value === "object"
                    ? dayjs(field.value.end)
                    : null,
                ]}
                onChange={(dates) => {
                  field.onChange({
                    start: dates?.[0]?.toDate(),
                    end: dates?.[1]?.toDate(),
                  });
                }}
                status={errors.tournamentDates ? "error" : ""}
              />
            )}
          />
          {errors.tournamentDates && (
            <p className="text-red-500 text-xs mt-1">
              {getNestedErrorMessage("tournamentDates")}
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
              <Input
                {...field}
                status={errors.location ? "error" : ""}
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
          render={({ field }) => (
            <Select
              {...field}
              className="w-[120px]"
              placeholder="Select style"
              status={errors.style ? "error" : ""}
              options={Object.entries(StyleENUM).map(([key, value]) => ({
                label: key,
                value: value,
              }))}
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
            <TextArea
              {...field}
              rows={4}
              status={errors.moreInfo ? "error" : ""}
              placeholder="Description, pricing, etc."
            />
          )}
        />
        {errors.moreInfo && (
          <p className="text-red-500 text-xs mt-1">{errors.moreInfo.message}</p>
        )}
      </div>

      <Pricing
        control={control}
        errors={errors}
        getNestedErrorMessage={getNestedErrorMessage}
      />
      <ContactInformation control={control} errors={errors} />
      <TermsAndConditions control={control} />

      <div className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="w-40 !bg-primaryLight hover:!bg-purple-600"
        >
          Continue
        </Button>
      </div>
    </Form>
  );
};

export default CreateEvent;
