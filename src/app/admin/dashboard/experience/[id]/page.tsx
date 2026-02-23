import { getExperienceById } from "@/modules/admin/experience/actions"
import { ExperienceForm } from "./experience-form"
import { notFound } from "next/navigation"

export default async function ExperienceEditPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const { id } = resolvedParams
    const exp = await getExperienceById(id)

    if (id !== "new" && !exp) {
        notFound()
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{id === "new" ? "Add Experience" : "Edit Experience"}</h1>
                <p className="text-muted-foreground">Fill out the details of your professional experience.</p>
            </div>
            <div>
                <ExperienceForm initialData={exp} experienceId={id} />
            </div>
        </div>
    )
}
