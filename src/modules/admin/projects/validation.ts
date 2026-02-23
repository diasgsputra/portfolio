import { z } from "zod"

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    techStack: z.string().min(1, "Tech stack is required. Please use comma separated values."),
    githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")).nullable(),
    liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")).nullable(),
    featured: z.boolean().default(false).optional(),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
