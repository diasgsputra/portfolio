"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { moveProject } from "@/modules/admin/projects/actions"
import { ArrowUp, ArrowDown } from "lucide-react"
import { toast } from "sonner"

export function MoveProjectButton({ id, direction }: { id: string, direction: "up" | "down" }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            variant="outline"
            size="sm"
            disabled={isPending}
            onClick={() => {
                startTransition(async () => {
                    try {
                        await moveProject(id, direction)
                    } catch (error) {
                        toast.error("Failed to reorder project")
                    }
                })
            }}
        >
            {direction === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </Button>
    )
}
