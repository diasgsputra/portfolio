import { db } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, ExternalLink, Mail, ArrowRight, Code2, Terminal, Briefcase, Layout, Database } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProjectCarousel } from "@/components/project-carousel"

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
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-[100px] md:blur-[180px] opacity-70 mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-500/10 blur-[100px] md:blur-[180px] opacity-70 mix-blend-screen" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60vw] h-[30vw] rounded-full bg-blue-500/5 dark:bg-blue-500/5 blur-[120px] opacity-50 mix-blend-screen" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:[mask-image:linear-gradient(180deg,black,rgba(0,0,0,0))] opacity-20 dark:opacity-10" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-foreground/5 dark:border-white/5 bg-background/60 dark:bg-background/40 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
        <div className="container mx-auto px-4 h-[72px] flex items-center justify-between">
          <Link href="/" className="font-bold text-xl flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-foreground/80 to-foreground text-transparent bg-clip-text dark:from-white dark:to-white/70">
              {profile?.name ? profile.name.split(' ')[0] : "Portfolio"}
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link href="#about" className="text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#projects" className="text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white transition-colors relative group">
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#experience" className="text-foreground/70 hover:text-foreground dark:text-white/70 dark:hover:text-white transition-colors relative group">
              Experience
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" className="hidden md:inline-flex rounded-full border-foreground/10 hover:bg-foreground/5 dark:border-white/10 dark:hover:bg-white/5 backdrop-blur-sm">
              <Link href="#contact">Contact Me</Link>
            </Button>
            <Button asChild className="md:hidden rounded-full bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link href="#contact">Contact</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <AnimatedSection className="container mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center relative">
          {profile?.avatarUrl && (
            <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10 rounded-full z-10 group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-40 blur-xl group-hover:opacity-70 transition-opacity duration-500"></div>
              <img src={profile.avatarUrl} alt={profile.name || "Avatar"} className="relative w-full h-full object-cover rounded-full border-2 border-background dark:border-white/10 group-hover:scale-[1.02] transition-transform duration-500 bg-zinc-100 dark:bg-zinc-900" />
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-xs font-medium text-indigo-700 dark:text-indigo-200">Available for Opportunities</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 relative z-10 w-full max-w-5xl">
            <span className="block text-foreground/90 dark:text-white/90 mb-2 md:mb-4">Hello, I'm</span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 dark:from-indigo-400 dark:via-purple-500 dark:to-blue-500 bg-clip-text text-transparent px-2">
              {profile?.name || "a Developer"}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-foreground/60 dark:text-white/60 mb-10 max-w-[700px] leading-relaxed relative z-10 font-light">
            {profile?.title || "Crafting digital experiences with modern web technologies, focusing on beautiful and functional design."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 relative z-50">
            <Button asChild size="lg" className="rounded-full h-14 px-8 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 hover:scale-105 transition-all duration-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <Link href="#projects">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 border-foreground/10 bg-foreground/5 dark:border-white/10 dark:bg-white/5 backdrop-blur-md hover:bg-foreground/10 dark:hover:bg-white/10 transition-all duration-300">
              <Link href="#contact">Contact Me</Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection id="about" className="py-24 md:py-32 relative border-t border-foreground/5 dark:border-white/5" delay={0.1}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 text-left">About Me</h2>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-white text-left">Dedicated to building exceptional digital products.</h3>
                <div className="prose prose-lg dark:prose-invert text-foreground/70 dark:text-white/70 leading-relaxed text-left">
                  {profile?.bio?.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )) || <p>No bio available yet. I am passionate about building fullstack applications that solve real-world problems.</p>}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-foreground/5 dark:bg-white/5 border border-foreground/5 dark:border-white/5 backdrop-blur-sm">
                    <Code2 className="h-6 w-6 text-indigo-500 dark:text-indigo-400 mb-3" />
                    <h4 className="font-semibold text-foreground dark:text-white mb-1">Frontend</h4>
                    <p className="text-sm text-foreground/50 dark:text-white/50">React, Next.js, UI/UX</p>
                  </div>
                  <div className="p-4 rounded-xl bg-foreground/5 dark:bg-white/5 border border-foreground/5 dark:border-white/5 backdrop-blur-sm">
                    <Database className="h-6 w-6 text-purple-500 dark:text-purple-400 mb-3" />
                    <h4 className="font-semibold text-foreground dark:text-white mb-1">Backend</h4>
                    <p className="text-sm text-foreground/50 dark:text-white/50">Node.js, SQL, APIs</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-foreground/10 dark:border-white/10 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 backdrop-blur-md flex items-center justify-center p-8">
                {/* Abstract decorative element for about section */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
                <div className="relative z-10 bg-background/80 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-xl p-6 w-full shadow-2xl">
                  <div className="flex items-center gap-2 mb-4 border-b border-foreground/10 dark:border-white/10 pb-4">
                    <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <pre className="text-sm font-mono text-indigo-700 dark:text-indigo-300 overflow-x-auto">
                    <code>
                      {`const engineer = {
  name: "${profile?.name?.split(' ')[0] || 'Dev'}",
  passion: "Building Apps",
  skills: [
    "TypeScript",
    "React / Next.js",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL"
  ],
  status: "Turning ideas into code"
};`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Featured Projects */}
        <AnimatedSection id="projects" className="py-24 md:py-32 relative border-t border-foreground/5 dark:border-white/5 bg-foreground/[0.02] dark:bg-zinc-950/50" delay={0.2}>
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">Portfolio</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground dark:text-white">Featured Projects</h3>
              <p className="mt-4 text-foreground/60 dark:text-white/60 max-w-2xl text-lg">A selection of my recent work, highlighting my skills in full-stack development and UI/UX design.</p>
            </div>

            {projects.length > 0 ? (
              <div className="relative px-4 sm:px-12 md:px-0">
                <ProjectCarousel projects={projects} />
              </div>
            ) : (
              <div className="text-center text-foreground/40 dark:text-white/40 border border-foreground/5 dark:border-white/5 border-dashed rounded-2xl bg-foreground/5 dark:bg-white/5 backdrop-blur-sm py-12">
                <Code2 className="mx-auto h-10 w-10 mb-3 opacity-50" />
                <p>No featured projects found. Add some from the admin dashboard.</p>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="py-24 md:py-32 relative border-t border-foreground/5 dark:border-white/5" delay={0.2}>
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col items-center mb-16 text-center">
              <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">Career</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-foreground dark:text-white">Professional Experience</h3>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-[15px] md:left-0 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent" />

              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div key={exp.id} className="relative pl-12 md:pl-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-[11px] md:-left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] dark:shadow-[0_0_15px_rgba(129,140,248,0.8)] ring-4 ring-background transition-transform duration-300 group-hover:scale-150 group-hover:bg-purple-500 dark:group-hover:bg-purple-400 dark:group-hover:shadow-[0_0_20px_rgba(192,132,252,0.8)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]" />

                    <div className="md:grid md:grid-cols-4 gap-4 items-baseline">
                      <div className="md:col-span-1 mb-2 md:mb-0">
                        <div className="text-sm font-mono text-indigo-700 dark:text-indigo-300">
                          {exp.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} —
                          <br className="hidden md:block" />
                          {exp.endDate ? ` ${exp.endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : " Present"}
                        </div>
                      </div>
                      <div className="md:col-span-3 bg-background dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-foreground/5 dark:hover:bg-white/10 transition-colors duration-300 group-hover:border-indigo-500/30">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h4 className="text-xl font-bold text-foreground dark:text-white">{exp.position}</h4>
                          <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                            {exp.type}
                          </span>
                        </div>
                        <div className="text-lg text-foreground/70 dark:text-white/70 font-medium mb-4 flex items-center gap-2">
                          <Briefcase className="h-4 w-4 opacity-70" /> {exp.company}
                        </div>
                        <ul className="space-y-2 text-foreground/60 dark:text-white/60 text-sm leading-relaxed">
                          {exp.description?.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="text-indigo-500/50 mt-1.5 shrink-0 block h-1.5 w-1.5 rounded-full" />
                              <span className="flex-1">{line.replace(/^[-•*]\s*/, '').trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && (
                  <p className="text-center text-foreground/40 dark:text-white/40 italic">No experience records found.</p>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact CTA Section */}
        <AnimatedSection id="contact" className="py-24 md:py-32 relative overflow-hidden" delay={0.3}>
          {/* Decorative background for CTA */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-900/10 dark:to-indigo-950/40 pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

          <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center bg-background/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-foreground/10 dark:border-white/10 rounded-3xl p-10 md:p-20 shadow-2xl">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-indigo-500/20">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-white">Ready to work together?</h2>
            <p className="text-xl text-foreground/60 dark:text-white/60 mb-10 max-w-2xl mx-auto font-light">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button asChild size="lg" className="rounded-full h-14 px-10 bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 transition-all duration-300">
                <a href="mailto:diasgsputra@gmail.com">
                  Say Hello
                </a>
              </Button>

              <div className="flex justify-center gap-4 items-center">
                <Link href={"https://github.com/diasgsputra/"} target="_blank" className="p-4 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 hover:bg-foreground/10 dark:hover:bg-white/10 hover:border-foreground/20 dark:hover:border-white/20 hover:scale-110 transition-all duration-300 group">
                  <Github className="h-6 w-6 text-foreground/70 dark:text-white/70 group-hover:text-foreground dark:group-hover:text-white" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href={"https://www.linkedin.com/in/diasgsputra/"} target="_blank" className="p-4 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10 hover:bg-foreground/10 dark:hover:bg-white/10 hover:border-foreground/20 dark:hover:border-white/20 hover:scale-110 transition-all duration-300 group">
                  <Linkedin className="h-6 w-6 text-foreground/70 dark:text-white/70 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="border-t border-foreground/10 dark:border-white/10 py-10 relative bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-indigo-500" />
            <span className="font-bold text-foreground/90 dark:text-white/90">{profile?.name || "Portfolio"}</span>
          </div>
          <p className="text-sm text-foreground/50 dark:text-white/50">
            © {new Date().getFullYear()} All rights reserved. Crafted with Next.js array of emotions.
          </p>
          <Link href="/admin/login" className="text-xs font-mono text-foreground/40 dark:text-white/30 hover:text-foreground/70 dark:hover:text-white/70 transition-colors uppercase tracking-wider">
            Admin Portal
          </Link>
        </div>
      </footer>
    </div>
  )
}
