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

export async function moveProject(id: string, direction: "up" | "down") {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    // Get all projects sorted by current order
    const projects = await db.project.findMany({
        orderBy: { createdAt: "desc" }
    })

    const currentIndex = projects.findIndex(p => p.id === id)
    if (currentIndex === -1) return { success: false }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    if (targetIndex < 0 || targetIndex >= projects.length) return { success: false }

    const currentProject = projects[currentIndex]
    const targetProject = projects[targetIndex]

    // Swap createdAt values to reorder
    await db.$transaction([
        db.project.update({ where: { id: currentProject.id }, data: { createdAt: targetProject.createdAt } }),
        db.project.update({ where: { id: targetProject.id }, data: { createdAt: currentProject.createdAt } })
    ])

    revalidatePath("/")
    revalidatePath("/admin/dashboard/projects")
    return { success: true }
}
