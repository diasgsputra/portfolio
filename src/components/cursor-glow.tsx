"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only show on devices with pointer (not touch)
    const mql = window.matchMedia("(pointer: fine)")
    if (!mql.matches) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleLeave = () => setIsVisible(false)
    const handleEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseleave", handleLeave)
    document.addEventListener("mouseenter", handleEnter)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseleave", handleLeave)
      document.removeEventListener("mouseenter", handleEnter)
    }
  }, [mouseX, mouseY, isVisible])

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Light mode: more visible, warmer glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full dark:hidden"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, oklch(0.55 0.20 265 / 10%) 0%, oklch(0.60 0.15 290 / 4%) 40%, transparent 70%)",
        }}
      />
      {/* Dark mode: subtle glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full hidden dark:block"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, oklch(0.55 0.15 265 / 6%) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}
