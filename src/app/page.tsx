import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, ExternalLink } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export default async function Home() {
  const [profile, projects, experiences] = await Promise.all([
    db.profile.findFirst(),
    db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" }
    }),
    db.experience.findMany({
      orderBy: { startDate: "desc" }
    })
  ])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl">{profile?.name || "Portfolio"}</div>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="#about" className="transition-colors hover:text-foreground/80">About</Link>
            <Link href="#projects" className="transition-colors hover:text-foreground/80">Projects</Link>
            <Link href="#experience" className="transition-colors hover:text-foreground/80">Experience</Link>
            <Link href="#contact" className="transition-colors hover:text-foreground/80">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/*Hero Section */}
        <AnimatedSection className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Hi, I'm <span className="text-primary">{profile?.name || "a Developer"}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-[800px]">
            {profile?.title || "Crafting digital experiences with modern web technologies."}
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href="#projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </AnimatedSection>

        {/*About Section */}
        <AnimatedSection id="about" className="bg-muted/30 py-24" delay={0.2}>
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="prose prose-lg dark:prose-invert mx-auto text-center leading-relaxed">
              <p>{profile?.bio || "No bio available yet. I am passionate about building fullstack applications."}</p>
            </div>
          </div>
        </AnimatedSection>

        {/*Featured Projects */}
        <AnimatedSection id="projects" className="py-24" delay={0.2}>
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(project => (
                <div key={project.id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.split(',').map(tech => (
                        <span key={tech} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex gap-4 mt-auto">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link href={project.liveUrl} target="_blank" className="flex items-center text-sm font-medium hover:text-primary transition-colors">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="col-span-full text-center text-muted-foreground">No featured projects yet.</p>}
            </div>
          </div>
        </AnimatedSection>

        {/*Experience Section */}
        <AnimatedSection id="experience" className="bg-muted/30 py-24" delay={0.2}>
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <div className="space-y-12 border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 md:pl-0 md:border-l-0">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative md:pl-0">
                  <div className="absolute w-4 h-4 rounded-full bg-primary -left-[41px] md:hidden mt-1.5" />
                  <div className="md:flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{exp.position}</h3>
                      <div className="text-lg text-muted-foreground font-medium mb-2">{exp.company}</div>
                    </div>
                    <div className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded-full font-medium inline-block md:mt-0 mb-4 md:mb-0">
                      {exp.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                      {exp.endDate ? ` ${exp.endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : " Present"}
                    </div>
                  </div>
                  <div className="inline-flex items-center rounded-sm bg-muted px-2 py-1 text-xs font-medium mb-4 text-muted-foreground">
                    {exp.type}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
              {experiences.length === 0 && <p className="text-center text-muted-foreground">No experience records yet.</p>}
            </div>
          </div>
        </AnimatedSection>

        {/*Contact Section */}
        <AnimatedSection id="contact" className="py-24 text-center" delay={0.2}>
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Open for opportunities and interesting projects. Reach out if you'd like to collaborate!
            </p>
            <div className="flex justify-center gap-6">
              {profile?.githubUrl && (
                <Link href={profile.githubUrl} target="_blank" className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
                  <Github className="h-6 w-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
              )}
              {profile?.linkedinUrl && (
                <Link href={profile.linkedinUrl} target="_blank" className="p-3 rounded-full bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              )}
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-muted/20">
        <p>© {new Date().getFullYear()} {profile?.name || "Portfolio"}. Crafted with Next.js.</p>
        <Link href="/admin/login" className="mt-4 inline-block hover:underline text-xs text-muted-foreground/50">Admin Access</Link>
      </footer>
    </div>
  )
}
