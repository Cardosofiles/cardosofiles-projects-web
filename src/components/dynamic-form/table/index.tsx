'use client'

import axios from 'axios'
import { Loader2, Pencil, Trash2 } from 'lucide-react'
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Client } from '@/types'

const TableClient = (): JSX.Element => {
  const fetchClients = async (): Promise<Client[]> => {
    const { data } = await axios.get('/api/form')
    return data
  }

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: fetchClients,
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/form/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return <p className="text-center text-red-500">Erro ao carregar clientes</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CPF/CNPJ</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Endereços</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(cliente => (
            <TableRow key={cliente.id}>
              <TableCell>{cliente.name}</TableCell>
              <TableCell>{cliente.cpfCnpj}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{cliente.phone}</TableCell>
              <TableCell>
                <ul className="text-muted-foreground space-y-1 text-sm">
                  {cliente.addresses.map(addr => (
                    <li key={addr.id}>
                      {addr.street}, {addr.number} - {addr.city}/{addr.state}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Editar cliente"
                  onClick={() => console.log('Editar:', cliente.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  aria-label="Excluir cliente"
                  onClick={() => cliente.id && deleteMutation.mutate(cliente.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {data?.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-muted-foreground text-center">
                Nenhum cliente cadastrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export { TableClient }
