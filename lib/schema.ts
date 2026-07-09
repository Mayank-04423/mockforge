import { z } from "zod";

// 1. Define the rules for a single Field inside the API
export const fieldSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Field name is required" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Field name can only contain letters, numbers, and underscores",
    }),
  type: z.enum(["UUID", "NAME", "EMAIL", "NUMBER", "BOOLEAN"]),
});

// 2. Define the rules for the entire Endpoint configuration
export const endpointSchema = z.object({
  endpointName: z
    .string()
    .min(3, { message: "Endpoint name must be at least 3 characters" })
    .max(50),
  slug: z
    .string()
    .min(1, { message: "URL Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug can only contain lowercase letters, numbers, and hyphens (e.g., 'user-profiles')",
    }),
  fields: z
    .array(fieldSchema)
    .min(1, { message: "Your mock API must have at least one field" }),
});

// 3. Extract TypeScript types directly from our Zod schemas
export type FieldInput = z.infer<typeof fieldSchema>;
export type EndpointInput = z.infer<typeof endpointSchema>;