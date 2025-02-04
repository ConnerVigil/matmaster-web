"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChevronLeft, Image01 } from "@untitled-ui/icons-react";
import { Input, Button, Form, Select } from "antd";
import dayjs from "dayjs";
import ContactInformation from "./ContactInformation";
import { StyleENUM } from "@prisma/client";
import { DatePicker } from "antd";
import { eventService } from "@/lib/frontend/services/eventService";
import TermsAndConditions from "./TermsAndConditions";
import Pricing from "./Pricing";
import { s3Service } from "@/lib/frontend/services/s3Service";
import {
  TournamentDatabaseData,
  TournamentFormData,
  tournamentFormSchema,
} from "./zodSchemas";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CreateEvent: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TournamentFormData>({
    resolver: zodResolver(tournamentFormSchema),
  });
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: TournamentFormData) => {
    try {
      const imageUrl = data.eventImage
        ? await s3Service.uploadEventImageToS3(data.eventImage)
        : undefined;

      const documentUrl = data.termsAndConditionsPDF
        ? await s3Service.uploadTandCsToS3(data.termsAndConditionsPDF)
        : undefined;

      const databaseData: TournamentDatabaseData = {
        ...data,
        imageUrl,
        documentUrl,
      };

      const createdEvent = await eventService.createEventAsDraft(databaseData);

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

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      className="mx-auto px-6 bg-white space-y-6"
    >
      <div className="relative mb-6 -mx-6">
        <Controller
          name="eventImage"
          control={control}
          defaultValue={undefined}
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
                    field.onChange(file);
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
                  {field.name ? field.name : "Add Image"}
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

      {errors.eventImage && (
        <p className="text-red-500 text-xs mt-1">
          {errors?.eventImage?.message?.toString()}
        </p>
      )}

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
              {errors?.tournamentDates?.message?.toString()}
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

      <Pricing control={control} errors={errors} />
      <ContactInformation control={control} errors={errors} />
      <TermsAndConditions control={control} errors={errors} />

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
