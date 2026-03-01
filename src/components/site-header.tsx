"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import { Terminal, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface SiteHeaderProps {
  name?: string | null
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader({ name }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: "-40% 0px -60% 0px" }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          isScrolled
            ? "bg-background/80 dark:bg-background/70 backdrop-blur-2xl border-b border-foreground/[0.04] dark:border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="flex items-center justify-between"
            animate={{ height: isScrolled ? 64 : 80 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 rounded-xl border-2 border-foreground/20 dark:border-white/20 flex items-center justify-center group-hover:border-brand dark:group-hover:border-brand transition-colors duration-300 overflow-hidden">
                <span className="font-display text-sm font-bold text-foreground dark:text-white group-hover:text-brand dark:group-hover:text-brand transition-colors duration-300">
                  {name ? name.charAt(0).toUpperCase() : "P"}
                </span>
              </div>
              <span className="font-display font-semibold text-foreground/80 dark:text-white/80 text-sm tracking-wide hidden sm:block">
                {name ? name.split(" ")[0] : "Portfolio"}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    activeSection === link.href
                      ? "text-foreground dark:text-white"
                      : "text-foreground/50 dark:text-white/50 hover:text-foreground/80 dark:hover:text-white/80"
                  }`}
                >
                  {link.label}
                  {activeSection === link.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-foreground/[0.06] dark:bg-white/[0.08] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="#contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full bg-foreground dark:bg-white text-background dark:text-black hover:opacity-90 transition-opacity duration-300"
              >
                Get in Touch
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-foreground/10 dark:border-white/10"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 dark:bg-background/98 backdrop-blur-3xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-4xl font-display font-bold text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors py-3 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
