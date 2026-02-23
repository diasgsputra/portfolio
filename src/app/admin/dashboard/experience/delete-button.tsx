"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { deleteExperience } from "@/modules/admin/experience/actions"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

export function DeleteExperienceButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={() => {
                if (confirm("Are you sure you want to delete this experience record?")) {
                    startTransition(async () => {
                        try {
                            await deleteExperience(id)
                            toast.success("Experience deleted")
                        } catch (error) {
                            toast.error("Failed to delete experience")
                        }
                    })
                }
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
