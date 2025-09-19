import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { JSX } from 'react'

import { FormCreateCliente } from '@/components/dynamic-form/form'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Criar Cliente - Dynamic Form',
  description: 'Cadastrar novo cliente no sistema de gerenciamento.',
}

const CreateClientPage = (): JSX.Element => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-border border-b backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/dynamic-form">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-foreground text-2xl font-bold">Criar Novo Cliente</h1>
              <p className="text-muted-foreground">
                Preencha os dados para cadastrar um novo cliente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <FormCreateCliente />
      </div>
    </div>
  )
}

export default CreateClientPage
