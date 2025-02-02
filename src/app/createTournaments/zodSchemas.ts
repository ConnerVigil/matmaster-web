import { EntryTypeENUM, StyleENUM } from "@prisma/client";
import dayjs from "dayjs";
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

export const eventBaseSchema = z.object({
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
    ),
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
});

// Schema for form submission (includes File objects)
export const eventFormSchema = eventBaseSchema.extend({
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
});

// Schema for database (includes URLs instead of Files)
export const eventDatabaseSchema = eventBaseSchema.extend({
  imageUrl: z.string().url().optional(),
  documentUrl: z.string().url().optional(),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
export type EventDatabase = z.infer<typeof eventDatabaseSchema>;
