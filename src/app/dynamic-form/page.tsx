import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

import { TableListClient } from '@/components/dynamic-form/table'
import { Button } from '@/components/ui/button'

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
