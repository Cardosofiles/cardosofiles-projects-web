'use client'

import { Pencil, Trash2 } from 'lucide-react'
import type { JSX } from 'react'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { Client } from '@/types'
import { formatCep, formatCpfCnpj, formatDate, formatPhone } from '@/utils/formatters'

interface ClientTableProps {
  clients: Client[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isSearchActive: boolean
  searchTerm?: string
}

const ClientTable = ({
  clients,
  onEdit,
  onDelete,
  isSearchActive,
  searchTerm,
}: ClientTableProps): JSX.Element => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Endereços</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients?.map(cliente => (
            <TableRow key={cliente.id}>
              <TableCell className="font-medium">{cliente.name}</TableCell>
              <TableCell className="font-mono text-sm">{formatCpfCnpj(cliente.cpfCnpj)}</TableCell>
              <TableCell className="text-sm">
                {cliente.birthDate ? formatDate(cliente.birthDate) : 'N/A'}
              </TableCell>
              <TableCell className="text-sm">{cliente.email}</TableCell>
              <TableCell className="font-mono text-sm">{formatPhone(cliente.phone)}</TableCell>
              <TableCell>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  {cliente.addresses.map(addr => (
                    <li key={addr.id} className="leading-relaxed">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {addr.street}, {addr.number}
                          {addr.complement && ` - ${addr.complement}`}
                        </span>
                        <span className="text-xs">
                          {addr.neighborhood} - {addr.city}/{addr.state}
                        </span>
                        <span className="font-mono text-xs">CEP: {formatCep(addr.cep)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </TableCell>

              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Editar cliente"
                  onClick={() => cliente.id && onEdit(cliente.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  aria-label="Excluir cliente"
                  onClick={() => cliente.id && onDelete(cliente.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {clients?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground text-center">
                {isSearchActive
                  ? `Nenhum cliente encontrado para &ldquo;${searchTerm}&rdquo;`
                  : 'Nenhum cliente cadastrado'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { ClientTable }
