import { getProfile } from "@/modules/admin/profile/actions"
import { ProfileForm } from "./profile-form"

export default async function ProfilePage() {
    const profile = await getProfile()

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and portfolio settings.</p>
            </div>
            <div className="mt-2">
                <ProfileForm initialData={profile} />
            </div>
        </div>
    )
}
