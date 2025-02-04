import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import { TournamentFormData } from "./zodSchemas";

const { RangePicker } = DatePicker;

interface PricingTierProps {
  control: Control<TournamentFormData>;
  errors: FieldErrors<TournamentFormData>;
  tier: string;
  required?: boolean;
  PriceControllerName: keyof TournamentFormData;
  CollectionDatesControllerName: keyof TournamentFormData;
}

const PricingTier = ({
  control,
  errors,
  tier,
  required,
  PriceControllerName,
  CollectionDatesControllerName,
}: PricingTierProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray3 mb-1">
          {tier} {required ? "*" : ""}
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
                defaultValue={undefined}
                render={({ field: { value, ...fieldProps } }) => (
                  <InputNumber
                    {...fieldProps}
                    value={value === undefined ? undefined : Number(value)}
                    prefix="$"
                    status={errors[PriceControllerName] ? "error" : ""}
                    placeholder="00.00"
                  />
                )}
              />
            </div>
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
                field.value &&
                typeof field.value === "object" &&
                "start" in field.value
                  ? dayjs(field.value.start)
                  : null,
                field.value &&
                typeof field.value === "object" &&
                "end" in field.value
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
            {errors[CollectionDatesControllerName]?.message?.toString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default PricingTier;
