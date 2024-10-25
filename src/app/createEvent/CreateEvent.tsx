import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { ChevronLeft } from "@untitled-ui/icons-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission here
  };

  const handleBack = () => {
    router.push("/yourevents");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white space-y-6 mx-4">
      <div className="-mx-4 relative">
        <Controller
          name="eventImage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div
              className="w-full h-40 bg-gray-200 flex items-center justify-center cursor-pointer mb-6"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.onchange = (e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    // Here you would typically upload the file to your server
                    // and get back a URL to set as the field value
                    field.onChange(file.name); // For now, just set the file name
                  }
                };
                input.click();
              }}
            >
              <div className="text-gray-500">
                {field.value ? field.value : "Add Image"}
              </div>
            </div>
          )}
        />
        <div className="absolute top-2 left-2">
          <button
            className="px-2 py-1 bg-[#f9f5ff] rounded-lg shadow border flex items-center gap-1 text-primaryLight text-sm font-semibold"
            onClick={handleBack}
          >
            <ChevronLeft />
            Back
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <Controller
          name="eventName"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Event name"
              fullWidth
              error={!!errors.eventName}
              helperText={errors.eventName?.message}
            />
          )}
        />
      </div>

      <div className="flex space-x-4">
        <Controller
          name="tournamentDates"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Tournament dates" fullWidth />
          )}
        />
        <Controller
          name="location"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Location" fullWidth />
          )}
        />
      </div>

      <Controller
        name="style"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Style" fullWidth />}
      />

      <Controller
        name="moreInfo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="More info"
            multiline
            rows={4}
            fullWidth
          />
        )}
      />

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">Pricing</h2>

      {/* Pricing fields */}
      {["earlyBird", "regular", "lastMinute", "atTheDoor"].map((type) => (
        <div key={type} className="flex space-x-4">
          <Controller
            name={`${type}Price` as keyof FormData}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={`${type.charAt(0).toUpperCase() + type.slice(1)} price`}
                fullWidth
              />
            )}
          />
          <Controller
            name={`${type}CollectionDates` as keyof FormData}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} label="Collection dates" fullWidth />
            )}
          />
        </div>
      ))}

      <div className="flex space-x-4">
        <Controller
          name="spectatorPrice"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Spectator price" />
          )}
        />
      </div>

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Contact Information
      </h2>

      <Controller
        name="emailAddress"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Email address" fullWidth />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Phone number" fullWidth />
        )}
      />

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Social media (optional)
      </h2>

      {["twitter", "instagram", "facebook"].map((platform) => (
        <Controller
          key={platform}
          name={`${platform}Handle` as keyof FormData}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={`${
                platform.charAt(0).toUpperCase() + platform.slice(1)
              } handle`}
              fullWidth
            />
          )}
        />
      ))}

      <h2 className="text-black text-xl font-semibold mt-8 mb-4">
        Terms & conditions (optional)
      </h2>

      <Controller
        name="termsAndConditions"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Copy and paste your terms & conditions"
            multiline
            rows={4}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Event
      </Button>
    </form>
  );
};

export default CreateEvent;
