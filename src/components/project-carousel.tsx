"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import Link from "next/link"
import { Github, ExternalLink, Layout } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = React.useState(false)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-4, 4]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <div style={{ perspective: 800 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="h-full relative group flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:border-brand/20 dark:hover:border-brand/20"
      >
        {/* Project Number Watermark */}
        <div className="absolute top-4 right-5 z-0 pointer-events-none">
          <span className="font-display text-6xl font-extrabold text-foreground/[0.03] dark:text-white/[0.04] select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Image Area */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-surface to-foreground/[0.02] dark:from-surface dark:to-white/[0.02] border-b border-foreground/[0.04] dark:border-white/[0.04] flex items-center justify-center">
          {project.liveUrl ? (
            <img
              src={`https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] opacity-90 group-hover:opacity-100"
              loading="lazy"
            />
          ) : (
            <Layout className="h-14 w-14 text-foreground/10 dark:text-white/10 group-hover:text-brand/30 transition-all duration-500" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col z-10 relative">
          <h4 className="text-lg font-display font-bold mb-2.5 text-foreground dark:text-white group-hover:text-brand dark:group-hover:text-brand transition-colors duration-300">
            {project.title}
          </h4>
          <p className="text-foreground/45 dark:text-white/45 mb-5 text-sm leading-relaxed line-clamp-3 flex-1">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.techStack
              .split(",")
              .slice(0, 4)
              .map((tech: string) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-foreground/[0.04] dark:bg-white/[0.06] px-2.5 py-1 text-[11px] font-mono font-medium text-foreground/50 dark:text-white/50"
                >
                  {tech.trim()}
                </span>
              ))}
            {project.techStack.split(",").length > 4 && (
              <span className="inline-flex items-center rounded-md bg-foreground/[0.04] dark:bg-white/[0.06] px-2.5 py-1 text-[11px] font-mono font-medium text-foreground/50 dark:text-white/50">
                +{project.techStack.split(",").length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="px-6 py-4 flex gap-4 border-t border-foreground/[0.04] dark:border-white/[0.04] z-10 relative">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              className="flex items-center gap-2 text-sm font-medium text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white transition-colors"
            >
              <Github className="h-4 w-4" /> Code
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="flex items-center gap-1.5 text-sm font-medium text-brand hover:opacity-80 transition-opacity ml-auto group/link"
            >
              Live Demo
              <ExternalLink className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectCarousel({ projects }: { projects: any[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
        dragFree: true,
      }}
      plugins={[WheelGesturesPlugin()]}
      className="w-full"
    >
      <CarouselContent className="-ml-4 md:-ml-6 items-stretch">
        {projects.map((project, i) => (
          <CarouselItem key={project.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
            <ProjectCard project={project} index={i} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="-left-12 lg:-left-14 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-foreground/[0.06] dark:border-white/[0.08] text-foreground dark:text-white hover:bg-foreground/[0.06] dark:hover:bg-white/[0.06]" />
        <CarouselNext className="-right-12 lg:-right-14 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-foreground/[0.06] dark:border-white/[0.08] text-foreground dark:text-white hover:bg-foreground/[0.06] dark:hover:bg-white/[0.06]" />
      </div>
    </Carousel>
  )
}
