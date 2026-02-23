import { z } from "zod"

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    title: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
