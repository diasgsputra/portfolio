import type { Metadata } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { db } from "@/lib/db"
import { ThemeProvider } from "@/components/theme-provider"
import { CursorGlow } from "@/components/cursor-glow"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export async function generateMetadata(): Promise<Metadata> {
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased selection:bg-brand/20 selection:text-foreground min-h-screen noise-overlay`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CursorGlow />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
