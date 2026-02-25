"use client"

import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures"
import Link from "next/link"
import { Github, ExternalLink, Layout } from "lucide-react"

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
            <CarouselContent className="-ml-4 md:-ml-8 items-stretch">
                {projects.map((project, i) => (
                    <CarouselItem key={project.id} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/3">
                        <div className="h-full group flex flex-col justify-between overflow-hidden rounded-2xl bg-background dark:bg-white/5 border border-foreground/10 dark:border-white/10 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:-translate-y-2 hover:border-indigo-500/30">
                            <div className="relative h-48 w-full shrink-0 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border-b border-foreground/10 dark:border-white/10 group-hover:from-indigo-100 group-hover:to-purple-100 dark:group-hover:from-indigo-900/40 dark:group-hover:to-purple-900/40 transition-colors duration-500 flex items-center justify-center p-0">
                                {project.liveUrl ? (
                                    <img
                                        src={`https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                        loading="lazy"
                                    />
                                ) : (
                                    <Layout className="h-16 w-16 text-foreground/20 dark:text-white/20 group-hover:scale-110 group-hover:text-indigo-500/60 dark:group-hover:text-indigo-400/60 transition-all duration-500 absolute" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col z-10 relative">
                                <h4 className="text-xl font-bold mb-3 text-foreground dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">{project.title}</h4>
                                <p className="text-foreground/60 dark:text-white/60 mb-6 text-sm leading-relaxed line-clamp-3 flex-1">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                    {project.techStack.split(',').slice(0, 4).map((tech: string) => (
                                        <span key={tech} className="inline-flex items-center rounded-md bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 px-2 py-1 text-xs font-medium text-foreground/70 dark:text-white/70">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                    {project.techStack.split(',').length > 4 && (
                                        <span className="inline-flex items-center rounded-md bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 px-2 py-1 text-xs font-medium text-foreground/70 dark:text-white/70">
                                            +{project.techStack.split(',').length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 pt-0 flex gap-4 border-t border-foreground/5 dark:border-white/5 z-10 relative bg-background/20 backdrop-blur-xl shrink-0">
                                {project.githubUrl && (
                                    <Link href={project.githubUrl} target="_blank" className="flex items-center text-sm font-medium text-foreground/70 dark:text-white/70 hover:text-foreground dark:hover:text-white transition-colors">
                                        <Github className="mr-2 h-4 w-4" /> Code
                                    </Link>
                                )}
                                {project.liveUrl && (
                                    <Link href={project.liveUrl} target="_blank" className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors ml-auto">
                                        Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious className="-left-12 lg:-left-16 bg-background dark:bg-zinc-900 border-foreground/10 dark:border-white/10 text-foreground dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800" />
                <CarouselNext className="-right-12 lg:-right-16 bg-background dark:bg-zinc-900 border-foreground/10 dark:border-white/10 text-foreground dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800" />
            </div>
        </Carousel>
    )
}
