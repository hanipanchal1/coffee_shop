// ============================================================
//  validationSchemas.js  —  Centralized Zod Schemas
//  Used by react-hook-form via @hookform/resolvers/zod
// ============================================================
import { z } from "zod";

// ─── Reusable Smart Email Validator ──────────────────────────
// Checks standard email syntax + realistic username length
// Specifically blocks impossible emails like "z@gmail.com" (Gmail requires 6-30 chars)
export const emailValidator = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .refine(
    (val) => {
      const parts = val.toLowerCase().trim().split("@");
      if (parts.length !== 2) return false;
      const [username, domain] = parts;
      if (!username || !domain) return false;

      // Gmail requires usernames between 6 and 30 characters
      if (domain === "gmail.com" || domain === "googlemail.com") {
        return username.length >= 6 && username.length <= 30;
      }

      // Other providers require at least 3 characters
      return username.length >= 3;
    },
    {
      message: "Please enter a realistic email (Gmail addresses must be 6-30 characters)",
    }
  );

// ─── Login ───────────────────────────────────────────────────
export const loginSchema = z.object({
  email: emailValidator,
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// ─── Register ────────────────────────────────────────────────
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: emailValidator,
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be less than 100 characters"),
  role: z.enum(["user", "admin"]).default("user"),
});

// ─── Contact ─────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: emailValidator,
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .min(3, "Subject must be at least 3 characters"),
  notes: z.string().optional(),
});

// ─── Table Booking / Reservation ─────────────────────────────
export const tableBookingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: emailValidator,
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  date: z
    .string()
    .min(1, "Reservation date is required")
    .refine((val) => {
      if (!val) return false;
      const todayStr = new Date().toLocaleDateString("en-CA");
      return val >= todayStr;
    }, "Reservation date cannot be in the past"),
  time: z
    .string()
    .min(1, "Reservation time is required"),
  seats: z.preprocess(
    (val) =>
      val === "" || val === undefined || val === null ? undefined : Number(val),
    z
      .number({
        required_error: "Seats is required",
        invalid_type_error: "Seats must be a number",
      })
      .int("Seats must be a whole number")
      .min(1, "Must book at least 1 seat")
      .max(30, "For reservations over 30 seats, please contact us directly"),
  ),
  notes: z
    .string()
    .min(1, "Notes are required (e.g. 'Window table' or 'None')")
    .max(250, "Notes must be under 250 characters"),
});
