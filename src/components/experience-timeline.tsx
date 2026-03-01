"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import { Briefcase } from "lucide-react"

interface Experience {
  id: string
  company: string
  position: string
  type: string
  startDate: Date
  endDate: Date | null
  description: string | null
}

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  })
  const shouldReduceMotion = useReducedMotion()

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={containerRef} className="relative">
      {/* Static Line Background */}
      <div className="absolute left-[23px] md:left-[23px] top-0 bottom-0 w-[2px] bg-foreground/[0.06] dark:bg-white/[0.06]" />

      {/* Animated Line (scroll-driven) */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute left-[23px] md:left-[23px] top-0 w-[2px] origin-top"
          style={{
            height: lineHeight,
            background: "linear-gradient(180deg, oklch(0.55 0.22 265), oklch(0.60 0.22 295))",
          }}
        />
      )}

      <div className="space-y-8 md:space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="relative pl-16 md:pl-20 group"
          >
            {/* Number Circle */}
            <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-surface dark:bg-surface border border-foreground/[0.08] dark:border-white/[0.08] flex items-center justify-center group-hover:border-brand/30 dark:group-hover:border-brand/30 transition-colors duration-500 z-10">
              <span className="font-display text-sm font-bold text-foreground/40 dark:text-white/40 group-hover:text-brand dark:group-hover:text-brand transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              {/* Current position indicator */}
              {!exp.endDate && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-background" />
              )}
            </div>

            {/* Card */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 md:p-8">
              {/* Date Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-foreground/[0.04] dark:bg-white/[0.06] text-xs font-mono text-foreground/50 dark:text-white/50">
                  {exp.startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {" — "}
                  {exp.endDate
                    ? exp.endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
                    : "Present"}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-brand/[0.08] border border-brand/[0.12] text-xs font-medium text-brand">
                  {exp.type}
                </span>
              </div>

              {/* Content */}
              <h4 className="text-xl font-display font-bold text-foreground dark:text-white mb-1.5">
                {exp.position}
              </h4>
              <div className="flex items-center gap-2 text-foreground/50 dark:text-white/50 font-medium mb-5">
                <Briefcase className="h-3.5 w-3.5" />
                <span className="text-sm">{exp.company}</span>
              </div>

              {exp.description && (
                <ul className="space-y-2.5">
                  {exp.description
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/55 dark:text-white/55 leading-relaxed">
                        <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-brand/40" />
                        <span>{line.replace(/^[-•*]\s*/, "").trim()}</span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}

        {experiences.length === 0 && (
          <p className="text-center text-foreground/30 dark:text-white/30 italic py-12">
            No experience records found.
          </p>
        )}
      </div>
    </div>
  )
}
