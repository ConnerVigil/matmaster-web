import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DatePicker, Input, Select } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
import { FormData } from "./CreateEvent";
import { EntryTypeENUM } from "@prisma/client";

interface PricingTierProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  tier: string;
  optional?: boolean;
  PriceControllerName: keyof FormData;
  CollectionDatesControllerName: keyof FormData;
  TypeControllerName: keyof FormData;
  getNestedErrorMessage: (fieldName: keyof FormData) => string | undefined;
}

const PricingTier = ({
  control,
  errors,
  tier,
  optional,
  PriceControllerName,
  CollectionDatesControllerName,
  TypeControllerName,
  getNestedErrorMessage,
}: PricingTierProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray3 mb-1">
          {tier} {optional ? "(optional)" : ""}
        </label>
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative max-w-[200px]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </div>
              <Controller
                name={PriceControllerName}
                control={control}
                defaultValue=""
                render={({ field: { value, ...fieldProps } }) => (
                  <Input
                    {...fieldProps}
                    value={typeof value === "string" ? value : ""}
                    prefix="$"
                    status={errors[PriceControllerName] ? "error" : ""}
                    placeholder="00.00"
                  />
                )}
              />
            </div>
            <Controller
              name={TypeControllerName}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-[120px]"
                  placeholder="Select entry type"
                  status={errors[TypeControllerName] ? "error" : ""}
                  options={Object.entries(EntryTypeENUM).map(
                    ([key, value]) => ({
                      label: key.replace(/_/g, " ").toLowerCase(),
                      value: value,
                    })
                  )}
                />
              )}
            />
          </div>
          {errors[PriceControllerName] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[PriceControllerName]?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray3 mb-1">
          Collection dates
        </label>
        <Controller
          name={CollectionDatesControllerName}
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
              status={errors[CollectionDatesControllerName] ? "error" : ""}
            />
          )}
        />
        {errors[CollectionDatesControllerName] && (
          <p className="text-red-500 text-xs mt-1">
            {getNestedErrorMessage(CollectionDatesControllerName)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingTier;
