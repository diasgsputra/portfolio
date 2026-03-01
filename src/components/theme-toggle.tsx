"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-foreground/[0.08] dark:border-white/[0.08] hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Moon className="h-[1.1rem] w-[1.1rem] text-foreground/70 dark:text-white/70" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: 90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Sun className="h-[1.1rem] w-[1.1rem] text-foreground/70 dark:text-white/70" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
