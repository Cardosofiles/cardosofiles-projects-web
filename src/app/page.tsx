import { ArrowRight, Code2, Github, Globe, Linkedin, Mail, Rocket, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { JSX } from 'react'

import { SectionProjects } from '@/components/layout/section'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Home - Portfolio de Desenvolvedor Full Stack',
  description:
    'Cardoso Files - Desenvolvedor Full Stack com 2+ anos de experiência em React, Next.js, TypeScript e Node.js. Explore 12 projetos demonstrando expertise em desenvolvimento web moderno.',
  keywords: [
    'cardoso files',
    'desenvolvedor full stack brasil',
    'react developer portfolio',
    'nextjs projetos',
    'typescript developer',
    'portfolio desenvolvedor',
    'projetos web react',
    'desenvolvedor frontend backend',
  ],
  openGraph: {
    title: 'Cardoso Files - Portfolio de Desenvolvedor Full Stack',
    description:
      'Explore 12 projetos inovadores desenvolvidos com React, Next.js e TypeScript. Desde formulários dinâmicos até dashboards complexos.',
    url: 'https://cardosofiles-projects-web.vercel.app',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Cardoso Files - Projetos Full Stack',
      },
    ],
  },
  alternates: {
    canonical: 'https://cardosofiles-projects-web.vercel.app',
  },
}

const Home = (): JSX.Element => {
  return (
    <div className="from-background via-background/90 to-primary/5 min-h-screen bg-gradient-to-br">
      {/* Header Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="from-primary/5 via-primary/10 to-primary/5 absolute inset-0 bg-gradient-to-r backdrop-blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="from-primary via-primary/80 to-primary absolute -inset-1 rounded-full bg-gradient-to-r opacity-75 blur"></div>
                <div className="bg-background border-border relative flex h-24 w-24 items-center justify-center rounded-full border">
                  <Code2 className="text-primary h-12 w-12" />
                </div>
              </div>
            </div>

            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="from-primary via-primary/80 to-primary bg-gradient-to-r bg-clip-text text-transparent">
                Cardoso Files
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras. Explore meus
              projetos e conecte-se comigo nas redes sociais.
            </p>

            {/* Social Links */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link
                  href="https://www.linkedin.com/in/Cardosofiles/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link
                  href="https://github.com/Cardosofiles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href="https://cardosofiles.dev/" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-5 w-5" />
                  Website
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="bg-card/80 border-border/50 rounded-lg border p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                  <Rocket className="text-primary mr-3 h-8 w-8" />
                  <div>
                    <p className="text-card-foreground text-2xl font-bold">5+</p>
                    <p className="text-muted-foreground text-sm">Projetos</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 border-border/50 rounded-lg border p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                  <Zap className="text-primary mr-3 h-8 w-8" />
                  <div>
                    <p className="text-card-foreground text-2xl font-bold">2+</p>
                    <p className="text-muted-foreground text-sm">Anos</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 border-border/50 rounded-lg border p-6 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                  <Code2 className="text-primary mr-3 h-8 w-8" />
                  <div>
                    <p className="text-card-foreground text-2xl font-bold">10+</p>
                    <p className="text-muted-foreground text-sm">Tecnologias</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Sobre Mim
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Transformando ideias em código há mais de 2 anos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="border-border/50 bg-card/80 hover:bg-card/90 backdrop-blur-sm transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
                    <Code2 className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle className="text-card-foreground">Frontend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  Especialista em React, Next.js e TypeScript. Criando interfaces modernas e
                  responsivas com foco na experiência do usuário.
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 hover:bg-card/90 backdrop-blur-sm transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
                    <Zap className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle className="text-card-foreground">Backend</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  Desenvolvimento de APIs robustas e escaláveis com Node.js, Prisma e bancos de
                  dados modernos como PostgreSQL.
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Prisma</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">API Rest</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/80 hover:bg-card/90 backdrop-blur-sm transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
                    <Rocket className="text-primary h-6 w-6" />
                  </div>
                  <CardTitle className="text-card-foreground">DevOps</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base">
                  Deploy e manutenção de aplicações em plataformas como Vercel, com integração
                  contínua e boas práticas de desenvolvimento.
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">Vercel</Badge>
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">Docker</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Carousel Section */}
      <section className="bg-muted/30 border-border/50 border-y px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Meus Projetos
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Explore os projetos que desenvolvi para o LinkedIn
            </p>
          </div>

          <SectionProjects />
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Vamos Conversar?
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Estou sempre aberto a novas oportunidades e colaborações interessantes.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 bg-gradient-to-r"
            >
              <Link
                href="https://www.linkedin.com/in/Cardosofiles/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Conectar no LinkedIn
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="mailto:cardosofiles@outlook.com">
                <Mail className="mr-2 h-5 w-5" />
                Enviar Email
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 Cardoso Files. Desenvolvido com ❤️ usando Next.js e Tailwind CSS.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link
                href="https://www.linkedin.com/in/Cardosofiles/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/Cardosofiles"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://cardosofiles.dev/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
