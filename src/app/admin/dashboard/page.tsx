import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"

export default async function DashboardPage() {
    const [projectCount, experienceCount] = await Promise.all([
        db.project.count(),
        db.experience.count(),
    ])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back to your backoffice.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Projects</CardTitle>
                        <CardDescription>Published projects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{projectCount}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Experiences</CardTitle>
                        <CardDescription>Recorded experiences</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">{experienceCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
