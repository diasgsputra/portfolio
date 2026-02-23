"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { deleteProject } from "@/modules/admin/projects/actions"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteProjectButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={() => {
                if (confirm("Are you sure you want to delete this project?")) {
                    startTransition(async () => {
                        try {
                            await deleteProject(id)
                            toast.success("Project deleted")
                        } catch (error) {
                            toast.error("Failed to delete project")
                        }
                    })
                }
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
