"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  name?: string | null
  title?: string | null
  avatarUrl?: string | null
  techs?: string[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const lineReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0, 1] as const },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0, 1] as const },
  },
}

export function HeroSection({ name, title, avatarUrl, techs = [] }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const firstName = name?.split(" ")[0] || "Developer"
  const lastName = name?.split(" ").slice(1).join(" ") || ""

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-40 dark:opacity-30" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-indigo-400/[0.12] dark:bg-brand/[0.06] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-purple-400/[0.10] dark:bg-purple-500/[0.05] blur-[100px] pointer-events-none" />
      <div className="absolute top-[60%] right-[30%] w-[300px] h-[300px] rounded-full bg-blue-400/[0.08] dark:bg-transparent blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 py-32 md:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="relative z-10"
          >
            {/* Status Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand/20 bg-brand/[0.06] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-breathe" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-medium text-foreground/60 dark:text-white/60 tracking-wide">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Hero Heading */}
            <div className="mb-6">
              <motion.div className="overflow-hidden" variants={lineReveal}>
                <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground/40 dark:text-white/40">
                  Hello, I'm
                </h1>
              </motion.div>
              <motion.div className="overflow-hidden mt-1" variants={lineReveal}>
                <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-gradient bg-gradient-to-r from-brand via-purple-500 to-blue-500">
                  {firstName}
                </h1>
              </motion.div>
              {lastName && (
                <motion.div className="overflow-hidden mt-1" variants={lineReveal}>
                  <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold tracking-[-0.04em] leading-[0.95] text-foreground dark:text-white">
                    {lastName}
                  </h1>
                </motion.div>
              )}
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-foreground/50 dark:text-white/50 max-w-[520px] leading-relaxed font-light mb-10"
            >
              {title || "Crafting exceptional digital experiences with modern web technologies and thoughtful design."}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full bg-foreground dark:bg-white text-background dark:text-black hover:opacity-90 transition-all duration-300 group"
              >
                View My Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-full border border-foreground/10 dark:border-white/10 text-foreground/70 dark:text-white/70 hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04] transition-all duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Orbital Ring */}
            <div className="absolute w-[380px] h-[380px] rounded-full border border-foreground/[0.05] dark:border-white/[0.06] animate-spin-slow" />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-foreground/[0.04] dark:border-white/[0.04] animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

            {/* Avatar */}
            {avatarUrl ? (
              <div className="relative w-52 h-52 rounded-[2rem] overflow-hidden ring-1 ring-foreground/[0.06] dark:ring-white/[0.08]">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-purple-500/20 mix-blend-overlay z-10" />
                <img
                  src={avatarUrl}
                  alt={name || "Avatar"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="relative w-52 h-52 rounded-[2rem] bg-gradient-to-br from-brand/20 to-purple-500/20 ring-1 ring-foreground/[0.06] dark:ring-white/[0.08] flex items-center justify-center">
                <span className="font-display text-6xl font-bold text-brand/50">
                  {name ? name.charAt(0) : "D"}
                </span>
              </div>
            )}

            {/* Floating Tech Pills */}
            {techs.slice(0, 5).map((tech, i) => {
              const positions = [
                "top-4 left-0",
                "top-16 -right-4",
                "bottom-20 -left-8",
                "bottom-4 right-0",
                "-top-2 right-20",
              ]
              const delays = ["0s", "1s", "2s", "3s", "0.5s"]
              return (
                <div
                  key={tech}
                  className={`absolute ${positions[i % 5]} animate-float`}
                  style={{ animationDelay: delays[i % 5], animationDuration: `${5 + i}s` }}
                >
                  <div className="px-3 py-1.5 rounded-full glass-card text-xs font-mono font-medium text-foreground/60 dark:text-white/60">
                    {tech}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
