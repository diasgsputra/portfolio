"use server"

import { db } from "@/lib/db"
import { projectSchema, ProjectFormValues } from "./validation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function getProjects() {
    return await db.project.findMany({
        orderBy: { createdAt: "desc" }
    })
}

export async function getProjectById(id: string) {
    if (id === "new") return null;
    return await db.project.findUnique({ where: { id } })
}

export async function upsertProject(id: string | null, data: ProjectFormValues) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    const parsed = projectSchema.parse(data)

    const cleanedData = {
        ...parsed,
        githubUrl: parsed.githubUrl || null,
        liveUrl: parsed.liveUrl || null,
    }

    if (id && id !== "new") {
        await db.project.update({
            where: { id },
            data: cleanedData,
        })
    } else {
        await db.project.create({
            data: cleanedData,
        })
    }

    revalidatePath("/")
    revalidatePath("/admin/dashboard/projects")
    return { success: true }
}

export async function deleteProject(id: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    await db.project.delete({ where: { id } })
    revalidatePath("/")
    revalidatePath("/admin/dashboard/projects")
    return { success: true }
}
