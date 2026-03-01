"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ReactNode } from "react"

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "blur-in"

const variants = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
}

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  variant?: AnimationVariant
  as?: "section" | "div"
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  id,
  variant = "fade-up",
  as = "section",
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const Component = as === "div" ? motion.div : motion.section

  if (shouldReduceMotion) {
    const El = as === "div" ? "div" : "section"
    return (
      <El id={id} className={className}>
        {children}
      </El>
    )
  }

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0, 1],
      }}
      variants={variants[variant]}
      className={className}
    >
      {children}
    </Component>
  )
}
