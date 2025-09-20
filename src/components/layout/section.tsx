'use client'

import { projects } from '@/data/dynamic-form/projects'
import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import { Card, Carousel } from '@/components/ui/cards-carousel'

export function SectionProjects() {
  const cards = projects.map((project, index) => (
    <Card
      key={project.id}
      card={{
        src: project.image,
        title: project.title,
        project: project.project,
        content: <ProjectContent project={project} />,
      }}
      index={index}
    />
  ))

  return (
    <div className="h-full w-full">
      <Carousel items={cards} />
    </div>
  )
}

const ProjectContent = ({ project }: { project: (typeof projects)[0] }) => {
  return (
    <div className="mb-4 rounded-3xl bg-[#F5F5F7] p-8 md:p-14 dark:bg-neutral-800">
      <p className="mx-auto max-w-3xl font-sans text-base text-neutral-600 md:text-2xl dark:text-neutral-400">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">{project.title}</span>{' '}
        {project.description}
      </p>

      <div className="mt-6">
        <h4 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Tecnologias utilizadas:
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href={project.link}
          className="w-fit rounded-full bg-black px-4 py-1 text-sm text-white transition-colors hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
        >
          {project.status === 'completed' ? 'Acessar Projeto' : 'Ver Preview'}
        </Link>

        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              project.status === 'completed'
                ? 'bg-green-500'
                : project.status === 'in-progress'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400'
            }`}
          />
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {project.status === 'completed'
              ? 'Finalizado'
              : project.status === 'in-progress'
                ? 'Em desenvolvimento'
                : 'Planejado'}
          </span>
        </div>
      </div>
    </div>
  )
}
