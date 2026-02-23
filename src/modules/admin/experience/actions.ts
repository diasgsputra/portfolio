"use server"

import { db } from "@/lib/db"
import { experienceSchema, ExperienceFormValues } from "./validation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getExperiences() {
    return await db.experience.findMany({
        orderBy: { startDate: "desc" }
    })
}

export async function getExperienceById(id: string) {
    if (id === "new") return null;
    return await db.experience.findUnique({ where: { id } })
}

export async function upsertExperience(id: string | null, data: ExperienceFormValues) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    const parsed = experienceSchema.parse(data)

    const cleanedData = {
        ...parsed,
        startDate: new Date(parsed.startDate),
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        description: parsed.description || null,
    }

    if (id && id !== "new") {
        await db.experience.update({
            where: { id },
            data: cleanedData,
        })
    } else {
        await db.experience.create({
            data: cleanedData,
        })
    }

    revalidatePath("/")
    revalidatePath("/admin/dashboard/experience")
    return { success: true }
}

export async function deleteExperience(id: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await db.experience.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/dashboard/experience")
    return { success: true }
}
