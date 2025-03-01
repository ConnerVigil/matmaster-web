import { EntryTypeENUM, StyleENUM } from "@prisma/client";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_DOCUMENT_TYPES = ["application/pdf"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB

export const tournamentBaseSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  tournamentDates: z.object({
    start: z.date().min(new Date(), "Start date must be in the future"),
    end: z.date(),
  }),
  location: z.string().min(1, "Location is required"),
  style: z.nativeEnum(StyleENUM),
  moreInfo: z.string().optional(),
  eventEntryType: z.nativeEnum(EntryTypeENUM),
  earlyBirdPrice: z
    .number()
    .nonnegative("Price must be non-negative")
    .multipleOf(0.01, "Price must have at most 2 decimal places")
    .optional(),
  earlyBirdCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional(),
      end: z.date().optional(),
    })
    .optional(),
  regularPrice: z
    .number()
    .nonnegative("Price must be non-negative")
    .multipleOf(0.01, "Price must have at most 2 decimal places"),
  regularCollectionDates: z.object({
    start: z.date().min(new Date(), "Start date must be in the future"),
    end: z.date(),
  }),
  lastMinutePrice: z
    .number()
    .nonnegative("Price must be non-negative")
    .multipleOf(0.01, "Price must have at most 2 decimal places")
    .optional(),
  lastMinuteCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional(),
      end: z.date().optional(),
    })
    .optional(),
  atTheDoorPrice: z
    .number()
    .nonnegative("Price must be non-negative")
    .multipleOf(0.01, "Price must have at most 2 decimal places")
    .optional(),
  atTheDoorCollectionDates: z
    .object({
      start: z
        .date()
        .min(new Date(), "Start date must be in the future")
        .optional(),
      end: z.date().optional(),
    })
    .optional(),
  spectatorPrice: z
    .number()
    .nonnegative("Price must be non-negative")
    .multipleOf(0.01, "Price must have at most 2 decimal places")
    .optional(),
  spectatorDuration: z.string().optional(),
  numberOfMats: z
    .number()
    .min(1, "Number of mats must be at least 1")
    .max(100, "Number of mats cannot exceed 100"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid phone number (e.g., +1234567890)"
    ),
  xLink: z.string().optional(),
  instagramLink: z.string().optional(),
  facebookLink: z.string().optional(),
  websiteLink: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

// Schema for form submission (includes File objects)
export const tournamentFormSchema = tournamentBaseSchema
  .extend({
    eventImage: z
      .any()
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        `Image size should be less than 5MB`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported"
      )
      .optional(),
    termsAndConditionsPDF: z
      .any()
      .refine(
        (file) => file.size <= MAX_PDF_SIZE,
        `PDF size should be less than 10MB`
      )
      .refine(
        (file) => ACCEPTED_DOCUMENT_TYPES.includes(file.type),
        "Only PDF format is supported"
      )
      .optional(),
  })
  .refine(
    (data) => {
      const startDate = data.tournamentDates.start;

      const validDates = (collectionEndDate: Date | undefined) => {
        if (!collectionEndDate) return true;
        return collectionEndDate <= startDate;
      };

      return (
        validDates(data.earlyBirdCollectionDates?.end) &&
        validDates(data.regularCollectionDates.end) &&
        validDates(data.lastMinuteCollectionDates?.end) &&
        validDates(data.atTheDoorCollectionDates?.end)
      );
    },
    {
      message: "All collection periods must end before the tournament starts",
      path: ["tournamentDates"],
    }
  );

// Schema for database (includes URLs instead of Files)
export const tournamentDatabaseSchema = tournamentBaseSchema.extend({
  imageUrl: z.string().url().optional(),
  documentUrl: z.string().url().optional(),
});

export type TournamentFormData = z.infer<typeof tournamentFormSchema>;
export type TournamentDatabaseData = z.infer<typeof tournamentDatabaseSchema>;
