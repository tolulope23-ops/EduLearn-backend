import { z } from "zod";

const allowedCourses = [
  "MATHEMATICS",
  "ENGLISH",
  "SCIENCE",
  "ICT",
];

export const enrollmentSchema = z.object({
  classLevel: z.enum(["JUNIOR", "SENIOR"]),

  courseNames: z
    .array(z
      .string()
      .transform((value) => value.trim().toUpperCase())
      .refine((value) => allowedCourses.includes(value), {
        message: "Invalid course selected",
      })
    )
    .min(1, "At least one course must be selected")
    .max(4, "You can select at most four courses")
    .refine(
      (courses) => new Set(courses).size === courses.length,
      { message: "Duplicate courses are not allowed" }
    ),

  dailyGoals: z
    .string()
    .trim()
    .min(1, "Daily goal cannot be empty")
    .optional()

});
