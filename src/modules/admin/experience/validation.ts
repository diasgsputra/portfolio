import { z } from "zod"

export const experienceTypeEnum = z.enum(["Full-time", "Part-time", "Freelance", "Contract", "Internship"])

export const experienceSchema = z.object({
    company: z.string().min(1, "Company name is required"),
    position: z.string().min(1, "Position is required"),
    type: experienceTypeEnum,
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal("")),
    description: z.string().optional(),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>
