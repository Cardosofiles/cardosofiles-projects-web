import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { JSX } from 'react'

import { TableListClient } from '@/components/dynamic-form/table'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dynamic Form - Sistema CRUD de Clientes',
  description:
    'Sistema completo de gerenciamento de clientes com formulários dinâmicos, validação robusta usando React Hook Form e Zod, máscaras automáticas e integração com API de CEP.',
  keywords: [
    'sistema crud react',
    'formulário dinâmico nextjs',
    'react hook form',
    'zod validation',
    'gerenciamento clientes',
    'máscaras automáticas',
    'api cep',
    'prisma orm',
    'typescript crud',
  ],
  openGraph: {
    title: 'Dynamic Form - Sistema CRUD de Clientes | Cardoso Files',
    description:
      'Sistema completo de gerenciamento de clientes com formulários dinâmicos, validação robusta e máscaras automáticas.',
    url: 'https://cardosofiles-projects-web.vercel.app/dynamic-form',
    images: [
      {
        url: '/og-dynamic-form.png',
        width: 1200,
        height: 630,
        alt: 'Dynamic Form - Sistema CRUD com React e TypeScript',
      },
    ],
  },
  alternates: {
    canonical: 'https://cardosofiles-projects-web.vercel.app/dynamic-form',
  },
}

const ListClientPage = (): JSX.Element => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-border border-b backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-foreground text-2xl font-bold">
                Sistema de Gerenciamento de Clientes
              </h1>
              <p className="text-muted-foreground">Formulário dinâmico com validação robusta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <TableListClient />
    </div>
  )
}

export default ListClientPage
