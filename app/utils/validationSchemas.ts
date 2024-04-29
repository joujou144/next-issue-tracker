import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(3, "Title is required.").max(255),
  description: z.string().min(3, "Description is required.").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(3, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(3, "Description is required.")
    .max(65535)
    .optional(),
  assignToUserId: z
    .string()
    .min(1, "AssignToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
