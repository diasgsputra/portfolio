import { db } from "@/lib/db"
import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUpRight, Code2, Database, Palette, Server, ChevronUp } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ProjectCarousel } from "@/components/project-carousel"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { ScrollProgress } from "@/components/scroll-progress"
import { MagneticButton } from "@/components/magnetic-button"
import { ScrollTextReveal } from "@/components/scroll-text-reveal"
import { ScrollScaleSection } from "@/components/scroll-scale-section"

export default async function Home() {
  const [profile, projects, allProjects, experiences] = await Promise.all([
    db.profile.findFirst(),
    db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" }
    }),
    db.project.findMany(),
    db.experience.findMany({
      orderBy: { startDate: "desc" }
    })
  ])

  // Extract all techs from projects and count frequency
  const techCount = new Map<string, number>()
  allProjects.forEach((p) => {
    p.techStack.split(",").map((t) => t.trim()).filter(Boolean).forEach((tech) => {
      techCount.set(tech, (techCount.get(tech) || 0) + 1)
    })
  })

  // Sort by frequency (most used first)
  const allTechs = Array.from(techCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tech]) => tech)

  // Auto-categorize techs from project data
  const frontendKeywords = ["react", "reactjs", "vue", "vuejs", "next", "nextjs", "angular", "svelte", "html", "css", "tailwind", "bootstrap", "livewire", "blade", "jsx", "tsx", "frontend"]
  const backendKeywords = ["node", "nodejs", "express", "expressjs", "laravel", "php", "java", "springboot", "spring", "django", "python", "ruby", "rails", "go", "golang", "nest", "nestjs", "fastapi", "dotnet", "asp", "backend", "websocket", "api", "rest", "graphql", "payment"]
  const dbKeywords = ["postgres", "postgresql", "mysql", "mongodb", "redis", "sqlite", "prisma", "supabase", "firebase", "dynamodb", "database", "sql", "mariadb"]
  const devopsKeywords = ["docker", "kubernetes", "aws", "gcp", "azure", "vercel", "nginx", "ci", "cd", "git", "github", "linux", "devops", "deploy"]

  function categorizeTech(tech: string) {
    const lower = tech.toLowerCase()
    if (frontendKeywords.some((k) => lower.includes(k))) return "frontend"
    if (backendKeywords.some((k) => lower.includes(k))) return "backend"
    if (dbKeywords.some((k) => lower.includes(k))) return "database"
    if (devopsKeywords.some((k) => lower.includes(k))) return "devops"
    return "other"
  }

  const categorized = {
    frontend: allTechs.filter((t) => categorizeTech(t) === "frontend"),
    backend: allTechs.filter((t) => categorizeTech(t) === "backend"),
    database: allTechs.filter((t) => categorizeTech(t) === "database"),
    devops: allTechs.filter((t) => categorizeTech(t) === "devops" || categorizeTech(t) === "other"),
  }

  const skills = [
    ...(categorized.frontend.length > 0
      ? [{ icon: Code2, title: "Frontend", description: "Building beautiful, responsive interfaces", techs: categorized.frontend }]
      : []),
    ...(categorized.backend.length > 0
      ? [{ icon: Server, title: "Backend", description: "Scalable APIs and server architecture", techs: categorized.backend }]
      : []),
    ...(categorized.database.length > 0
      ? [{ icon: Database, title: "Database", description: "Data modeling and optimization", techs: categorized.database }]
      : []),
    ...(categorized.devops.length > 0
      ? [{ icon: Palette, title: "DevOps & Tools", description: "Deployment and tooling", techs: categorized.devops }]
      : []),
  ]

  // Top 5 techs for hero floating pills
  const topTechs = allTechs.slice(0, 5)

  const bioText = profile?.bio || "I am passionate about building fullstack applications that solve real-world problems. With a keen eye for detail and a love for clean code, I create digital experiences that are both functional and delightful."

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Light mode ambient gradient background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none dark:hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(135deg,oklch(0.96_0.025_265)_0%,oklch(0.98_0.01_290)_30%,oklch(0.97_0.015_240)_60%,oklch(0.98_0.012_280)_100%)]" />
        <div className="absolute top-[5%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-400/[0.07] blur-[120px]" />
        <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] rounded-full bg-purple-400/[0.06] blur-[100px]" />
        <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] rounded-full bg-blue-400/[0.05] blur-[100px]" />
      </div>

      <ScrollProgress />
      <SiteHeader name={profile?.name} />

      <main className="flex-1">
        {/* Hero */}
        <HeroSection
          name={profile?.name}
          title={profile?.title}
          avatarUrl={profile?.avatarUrl}
          techs={topTechs}
        />

        {/* About Section */}
        <section
          id="about"
          className="py-28 md:py-40 relative bg-gradient-to-b from-transparent via-indigo-50/50 to-transparent dark:via-transparent"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            {/* Section Header */}
            <AnimatedSection as="div" variant="blur-in" className="mb-16 md:mb-20">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-brand mb-4 block">
                About Me
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] text-foreground dark:text-white max-w-3xl">
                Passionate about crafting{" "}
                <span className="text-gradient bg-gradient-to-r from-brand to-purple-500">
                  digital experiences
                </span>
              </h2>
            </AnimatedSection>

            <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-start">
              {/* Bio — Apple-style scroll text reveal */}
              <div className="flex flex-col">
                <ScrollTextReveal
                  text={bioText}
                  className="text-base md:text-lg font-light leading-relaxed text-foreground/70 dark:text-white/70 mb-12 text-justify flex-1"
                />

                {/* Social Links */}
                <AnimatedSection as="div" variant="fade-up" delay={0.1}>
                  <div className="flex gap-3">
                    {profile?.githubUrl && (
                      <Link
                        href={profile.githubUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-card glass-card-hover text-sm font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white"
                      >
                        <Github className="h-4 w-4" /> GitHub
                      </Link>
                    )}
                    {profile?.linkedinUrl && (
                      <Link
                        href={profile.linkedinUrl}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-card glass-card-hover text-sm font-medium text-foreground/60 dark:text-white/60 hover:text-foreground dark:hover:text-white"
                      >
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </Link>
                    )}
                  </div>
                </AnimatedSection>
              </div>

              {/* Terminal Code Block */}
              <AnimatedSection as="div" variant="fade-right" delay={0.2} className="relative">
                <div className="glass-card rounded-2xl overflow-hidden">
                  {/* Terminal Chrome */}
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-foreground/[0.04] dark:border-white/[0.04]">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                    </div>
                    <span className="ml-3 text-[11px] font-mono text-foreground/30 dark:text-white/30">
                      ~/about-me
                    </span>
                  </div>
                  <pre className="p-6 text-[13px] font-mono leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-brand/60">const</span>{" "}
                      <span className="text-foreground/70 dark:text-white/70">developer</span>{" "}
                      <span className="text-brand/60">=</span>{" "}
                      <span className="text-foreground/40 dark:text-white/40">{"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-500/70 dark:text-purple-400/70">name</span>
                      <span className="text-foreground/30 dark:text-white/30">:</span>{" "}
                      <span className="text-emerald-600/80 dark:text-emerald-400/70">
                        &quot;{profile?.name?.split(" ")[0] || "Dev"}&quot;
                      </span>
                      <span className="text-foreground/30 dark:text-white/30">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-500/70 dark:text-purple-400/70">passion</span>
                      <span className="text-foreground/30 dark:text-white/30">:</span>{" "}
                      <span className="text-emerald-600/80 dark:text-emerald-400/70">
                        &quot;Building Apps&quot;
                      </span>
                      <span className="text-foreground/30 dark:text-white/30">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-500/70 dark:text-purple-400/70">skills</span>
                      <span className="text-foreground/30 dark:text-white/30">:</span>{" "}
                      <span className="text-foreground/40 dark:text-white/40">[</span>
                      {"\n"}
                      {allTechs.slice(0, 5).map((tech, i) => (
                        <span key={tech}>
                          {"    "}
                          <span className="text-emerald-600/80 dark:text-emerald-400/70">&quot;{tech}&quot;</span>
                          {i < Math.min(allTechs.length, 5) - 1 && <span className="text-foreground/30 dark:text-white/30">,</span>}
                          {"\n"}
                        </span>
                      ))}
                      {"  "}
                      <span className="text-foreground/40 dark:text-white/40">]</span>
                      <span className="text-foreground/30 dark:text-white/30">,</span>
                      {"\n"}
                      {"  "}
                      <span className="text-purple-500/70 dark:text-purple-400/70">status</span>
                      <span className="text-foreground/30 dark:text-white/30">:</span>{" "}
                      <span className="text-emerald-600/80 dark:text-emerald-400/70">
                        &quot;Turning ideas into code&quot;
                      </span>
                      {"\n"}
                      <span className="text-foreground/40 dark:text-white/40">{"}"}</span>
                      <span className="text-foreground/30 dark:text-white/30">;</span>
                    </code>
                  </pre>
                </div>
              </AnimatedSection>
            </div>

            {/* Skill Bento Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 md:mt-20">
              {skills.map((skill, i) => (
                <AnimatedSection
                  key={skill.title}
                  as="div"
                  variant="scale-in"
                  delay={0.05 + i * 0.08}
                >
                  <div className="group glass-card glass-card-hover rounded-2xl p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-brand/[0.08] flex items-center justify-center mb-4 group-hover:bg-brand/[0.14] transition-colors duration-500">
                      <skill.icon className="h-5 w-5 text-brand" />
                    </div>
                    <h4 className="font-display font-semibold text-foreground dark:text-white mb-1.5">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-foreground/40 dark:text-white/40 mb-4">
                      {skill.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.techs.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-1 rounded-md bg-foreground/[0.03] dark:bg-white/[0.04] text-foreground/45 dark:text-white/45"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects — Apple-style scale-in from scroll */}
        <ScrollScaleSection
          id="projects"
          className="py-28 md:py-40 relative bg-gradient-to-b from-purple-50/40 via-surface/60 to-indigo-50/30 dark:from-transparent dark:via-surface/30 dark:to-transparent"
        >
          <div className="container mx-auto px-6 max-w-6xl">
            <AnimatedSection as="div" variant="blur-in" className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
              <div>
                <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-brand mb-4 block">
                  Portfolio
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] text-foreground dark:text-white">
                  Featured Projects
                </h2>
                <p className="mt-4 text-foreground/45 dark:text-white/45 max-w-xl text-lg">
                  A curated selection of my recent work.
                </p>
              </div>
            </AnimatedSection>

            {projects.length > 0 ? (
              <div className="relative px-0 sm:px-4 md:px-0">
                <ProjectCarousel projects={projects} />
              </div>
            ) : (
              <div className="text-center text-foreground/30 dark:text-white/30 border border-dashed border-foreground/[0.06] dark:border-white/[0.06] rounded-2xl py-16">
                <Code2 className="mx-auto h-8 w-8 mb-3 opacity-40" />
                <p className="text-sm">No featured projects yet. Add some from the admin dashboard.</p>
              </div>
            )}
          </div>
        </ScrollScaleSection>

        {/* Experience Section */}
        <section
          id="experience"
          className="py-28 md:py-40 relative"
        >
          <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection as="div" variant="blur-in" className="mb-16 md:mb-20">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-brand mb-4 block">
                Career
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.03em] text-foreground dark:text-white">
                Experience
              </h2>
            </AnimatedSection>

            <ExperienceTimeline experiences={experiences} />
          </div>
        </section>

        {/* Contact Section */}
        <ScrollScaleSection
          id="contact"
          className="py-28 md:py-40 relative overflow-hidden bg-gradient-to-b from-transparent via-indigo-50/30 to-purple-50/20 dark:via-transparent dark:to-transparent"
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/[0.08] dark:bg-brand/[0.04] blur-[150px]" />
          </div>

          <AnimatedSection as="div" variant="blur-in" className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <div className="mb-10">
              <span className="text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-brand mb-6 block">
                Contact
              </span>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] text-foreground dark:text-white mb-6">
                Let&apos;s work{" "}
                <span className="text-gradient bg-gradient-to-r from-brand via-purple-500 to-blue-500 animate-gradient-shift">
                  together
                </span>
              </h2>
              <p className="text-lg md:text-xl text-foreground/45 dark:text-white/45 max-w-xl mx-auto font-light">
                I&apos;m always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-8">
              <MagneticButton href="mailto:diasgsputra@gmail.com">
                <span className="relative inline-flex items-center gap-3 px-10 py-5 text-base font-semibold rounded-full bg-foreground dark:bg-white text-background dark:text-black hover:opacity-90 transition-all duration-300 group">
                  Say Hello
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </MagneticButton>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/diasgsputra/"
                  target="_blank"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-foreground/[0.06] dark:border-white/[0.06] text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white hover:border-foreground/20 dark:hover:border-white/20 hover:scale-110 transition-all duration-300"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/diasgsputra/"
                  target="_blank"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-foreground/[0.06] dark:border-white/[0.06] text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white hover:border-foreground/20 dark:hover:border-white/20 hover:scale-110 transition-all duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="mailto:diasgsputra@gmail.com"
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-foreground/[0.06] dark:border-white/[0.06] text-foreground/40 dark:text-white/40 hover:text-foreground dark:hover:text-white hover:border-foreground/20 dark:hover:border-white/20 hover:scale-110 transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </ScrollScaleSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/[0.04] dark:border-white/[0.04] py-12 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl border border-foreground/[0.08] dark:border-white/[0.08] flex items-center justify-center">
                <span className="font-display text-xs font-bold text-foreground/50 dark:text-white/50">
                  {profile?.name ? profile.name.charAt(0).toUpperCase() : "P"}
                </span>
              </div>
              <span className="font-display text-sm font-medium text-foreground/50 dark:text-white/50">
                {profile?.name || "Portfolio"}
              </span>
            </div>

            {/* Copyright */}
            <p className="text-xs text-foreground/30 dark:text-white/30 font-mono">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin/login"
                className="text-[10px] font-mono text-foreground/20 dark:text-white/15 hover:text-foreground/50 dark:hover:text-white/40 transition-colors uppercase tracking-[0.15em]"
              >
                Admin
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-full border border-foreground/[0.06] dark:border-white/[0.06] flex items-center justify-center text-foreground/30 dark:text-white/30 hover:text-foreground/60 dark:hover:text-white/60 hover:border-foreground/10 dark:hover:border-white/10 transition-all duration-300"
                aria-label="Back to top"
              >
                <ChevronUp className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
