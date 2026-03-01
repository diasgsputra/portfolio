"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

interface ScrollScaleSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function ScrollScaleSection({ children, className = "", id }: ScrollScaleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 20%"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const borderRadius = useTransform(scrollYProgress, [0, 1], [40, 0])

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      style={{
        scale,
        opacity,
        borderRadius,
      }}
      className={`will-change-transform origin-top ${className}`}
    >
      {children}
    </motion.section>
  )
}
