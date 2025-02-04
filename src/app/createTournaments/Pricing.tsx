import { User01, Users01 } from "@untitled-ui/icons-react";
import { Segmented, Input } from "antd";
import { Control, Controller, FieldErrors } from "react-hook-form";
import PricingTier from "./PricingTier";
import { TournamentFormData } from "./zodSchemas";

interface Props {
  control: Control<TournamentFormData>;
  errors: FieldErrors<TournamentFormData>;
}

const Pricing = ({ control, errors }: Props) => {
  return (
    <div>
      <h2 className="text-black text-xl font-semibold mt-8 mb-4">Pricing</h2>

      <div className="mb-4">
        <Controller
          name="eventEntryType"
          control={control}
          defaultValue="wrestler"
          render={({ field }) => (
            <Segmented
              defaultValue="wrestler"
              {...field}
              options={[
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <User01 width={16} height={16} />
                      <span>wrestler</span>
                    </div>
                  ),
                  value: "wrestler",
                },
                {
                  label: (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Users01 width={16} height={16} />
                      <span>team</span>
                    </div>
                  ),
                  value: "team",
                },
              ]}
            />
          )}
        />
      </div>

      <PricingTier
        control={control}
        errors={errors}
        tier="Early Bird"
        PriceControllerName="earlyBirdPrice"
        CollectionDatesControllerName="earlyBirdCollectionDates"
      />
      <PricingTier
        control={control}
        errors={errors}
        tier="Regular"
        required
        PriceControllerName="regularPrice"
        CollectionDatesControllerName="regularCollectionDates"
      />
      <PricingTier
        control={control}
        errors={errors}
        tier="Last Minute"
        PriceControllerName="lastMinutePrice"
        CollectionDatesControllerName="lastMinuteCollectionDates"
      />
      <PricingTier
        control={control}
        errors={errors}
        tier="At The Door"
        PriceControllerName="atTheDoorPrice"
        CollectionDatesControllerName="atTheDoorCollectionDates"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray3 mb-1">
            Spectator
          </label>
          <div className="relative max-w-[200px]">
            <div className="absolute right-3 z-10 top-1 text-gray-400">
              all days
            </div>
            <Controller
              name={"spectatorPrice"}
              control={control}
              defaultValue={undefined}
              render={({ field: { value, ...fieldProps } }) => (
                <Input
                  {...fieldProps}
                  value={typeof value === "number" ? value : undefined}
                  prefix="$"
                  placeholder="00.00"
                  status={errors.spectatorPrice ? "error" : ""}
                />
              )}
            />
            {errors.spectatorPrice && (
              <p className="text-red-500 text-xs mt-1">
                {errors.spectatorPrice.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
