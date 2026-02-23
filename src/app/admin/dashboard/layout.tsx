import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="w-full flex-1 flex flex-col bg-muted/10 min-h-screen">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10">
                    <SidebarTrigger />
                    <div className="font-semibold text-lg hidden md:block">Backoffice</div>
                </header>
                <div className="p-4 md:p-6 lg:p-8 flex-1">{children}</div>
            </main>
        </SidebarProvider>
    )
}
