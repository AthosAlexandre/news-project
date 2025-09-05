import { z } from "zod";

export const createNewsSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  body: z.string().min(20),
  // image será via upload (multer)
});

export const updateNewsSchema = z.object({
  title: z.string().min(3).optional(),
  summary: z.string().min(10).optional(),
  body: z.string().min(20).optional(),
  published: z.boolean().optional(),
});
