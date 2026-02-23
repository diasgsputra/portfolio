import { getExperiences } from "@/modules/admin/experience/actions"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteExperienceButton } from "./delete-button"
import { Plus } from "lucide-react"

export default async function ExperiencePage() {
    const experiences = await getExperiences()

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                    <p className="text-muted-foreground">Manage your work history and roles.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/dashboard/experience/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                    </Link>
                </Button>
            </div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Position</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Timeline</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {experiences.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No experience records found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            experiences.map((exp) => (
                                <TableRow key={exp.id}>
                                    <TableCell className="font-medium">{exp.position}</TableCell>
                                    <TableCell>{exp.company}</TableCell>
                                    <TableCell>{exp.type}</TableCell>
                                    <TableCell>
                                        {exp.startDate.getFullYear()} - {exp.endDate ? exp.endDate.getFullYear() : "Present"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/admin/dashboard/experience/${exp.id}`}>Edit</Link>
                                            </Button>
                                            <DeleteExperienceButton id={exp.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
