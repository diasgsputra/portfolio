"use client"

import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectSchema, ProjectFormValues } from "@/modules/admin/projects/validation"
import { upsertProject } from "@/modules/admin/projects/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface ProjectFormProps {
    initialData?: any;
    projectId: string;
}

export function ProjectForm({ initialData, projectId }: ProjectFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const defaultValues: ProjectFormValues = initialData ? {
        title: initialData.title || "",
        description: initialData.description || "",
        techStack: initialData.techStack || "",
        githubUrl: initialData.githubUrl || undefined,
        liveUrl: initialData.liveUrl || undefined,
        featured: initialData.featured ?? false,
    } : {
        title: "",
        description: "",
        techStack: "",
        githubUrl: undefined,
        liveUrl: undefined,
        featured: false,
    };

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues,
    })

    function onSubmit(data: any) {
        startTransition(async () => {
            try {
                await upsertProject(projectId, data as ProjectFormValues)
                toast.success("Project saved successfully")
                router.push("/admin/dashboard/projects")
            } catch (error) {
                toast.error("Failed to save project")
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-card p-6 rounded-lg border shadow-sm mt-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Project Title</FormLabel>
                            <FormControl>
                                <Input placeholder="E-commerce App" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A fullstack e-commerce application..." className="resize-none min-h-24" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tech Stack (comma separated)</FormLabel>
                            <FormControl>
                                <Input placeholder="Next.js, TypeScript, Prisma" {...field} />
                            </FormControl>
                            <FormDescription>Comma separated list of technologies</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="githubUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>GitHub Repo URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://github.com/..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="liveUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Live Site URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://..." {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Featured Project
                                </FormLabel>
                                <FormDescription>
                                    This project will appear on the homepage.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard/projects")} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "Saving..." : "Save Project"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
