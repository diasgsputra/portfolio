import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { db } from "@/lib/db"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  // Fetch profile for dynamic metadata
  const profile = await db.profile.findFirst()

  const siteName = profile ? `${profile.name} - Portfolio` : "Developer Portfolio"
  const description = profile?.bio || "A showcase of my latest projects and professional experience."

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      title: siteName,
      description,
      siteName: siteName,
      images: [
        {
          url: profile?.avatarUrl || "/og-image.png",
          width: 1200,
          height: 630,
          alt: siteName,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description,
    },
    robots: {
      index: true,
      follow: true,
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground antialiased selection:bg-primary/30 min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
