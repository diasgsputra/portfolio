"use server"

import { db } from "@/lib/db"
import { profileSchema, ProfileFormValues } from "./validation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getProfile() {
    return await db.profile.findFirst()
}

export async function upsertProfile(data: ProfileFormValues) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    const parsed = profileSchema.parse(data)

    // Clean up empty strings to null for better DB representation if needed, but direct passing is fine
    const cleanedData = {
        ...parsed,
        avatarUrl: parsed.avatarUrl || null,
        githubUrl: parsed.githubUrl || null,
        linkedinUrl: parsed.linkedinUrl || null,
        bio: parsed.bio || null,
        title: parsed.title || null,
    }

    const existing = await db.profile.findFirst()

    if (existing) {
        await db.profile.update({
            where: { id: existing.id },
            data: cleanedData,
        })
    } else {
        await db.profile.create({
            data: cleanedData,
        })
    }

    revalidatePath("/")
    revalidatePath("/admin/dashboard/profile")
    return { success: true }
}
