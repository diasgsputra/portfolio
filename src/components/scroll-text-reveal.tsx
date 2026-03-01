"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollTextRevealProps {
  text: string
  className?: string
}

export function ScrollTextReveal({ text, className = "" }: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 35%"],
  })

  const words = text.split(" ")

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={`${word}-${i}`} word={word} range={[start, end]} progress={scrollYProgress} />
        )
      })}
    </p>
  )
}

function Word({
  word,
  range,
  progress,
}: {
  word: string
  range: [number, number]
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])

  return (
    <span className="relative mr-[0.3em] mt-1 inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {word}
      </motion.span>
    </span>
  )
}
