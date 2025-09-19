'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

import { Button } from '@/components/ui/button'

interface TableHeaderProps {
  onCreateClient: () => void
}

const TableHeader = ({ onCreateClient }: TableHeaderProps): JSX.Element => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-2xl font-bold">Lista de Clientes</h2>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="/dynamic-form/create-client">
            <Plus className="mr-2 h-4 w-4" /> Formulário Completo
          </Link>
        </Button>
        <Button variant="default" onClick={onCreateClient}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>
    </div>
  )
}

export { TableHeader }
