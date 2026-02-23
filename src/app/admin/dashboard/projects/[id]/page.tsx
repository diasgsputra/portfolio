import { getProjectById } from "@/modules/admin/projects/actions"
import { ProjectForm } from "./project-form"
import { notFound } from "next/navigation"

export default async function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const { id } = resolvedParams
    const project = await getProjectById(id)

    if (id !== "new" && !project) {
        notFound()
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{id === "new" ? "Create Project" : "Edit Project"}</h1>
                <p className="text-muted-foreground">Fill out the details of your portfolio project.</p>
            </div>
            <div>
                <ProjectForm initialData={project} projectId={id} />
            </div>
        </div>
    )
}
