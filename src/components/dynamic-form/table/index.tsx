'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState, type JSX } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormLabel } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Importa suas server actions
import {
  formActionClientCreate,
  formActionDeleteClient,
  formActionGetClient,
  formActionGetClientById,
  formActionUpdateClient,
} from '@/actions/dynamic-form/form'

// Importações para o formulário
import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { NameField } from '@/components/dynamic-form/form/name-field'
import { ClienteFormData, clienteSchema } from '@/schemas'
import { formatCep, formatCpfCnpj, formatDate, formatPhone } from '@/utils/formatters'

import type { Client } from '@/types'

const TableListClient = (): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false) // Novo state para criação
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)

  const queryClient = useQueryClient()

  // Form para edição e criação
  const methods = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      name: '',
      cpfCnpj: '',
      birthDate: '',
      email: '',
      phone: '',
      addresses: [
        { cep: '', street: '', neighborhood: '', city: '', state: '', number: '', complement: '' },
      ],
    },
  })

  // 🔹 Buscar clientes
  const { data, isLoading, isError } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await formActionGetClient()
      if (!res.success) throw new Error(res.error || 'Erro ao carregar clientes')
      return res.data as Client[] // Cast explícito para Client[]
    },
  })

  // 🔹 Buscar cliente por ID para edição
  const fetchClient = async (id: string) => {
    const res = await formActionGetClientById(id)
    if (res.success && res.data) {
      const client = res.data

      // Formatar data de nascimento para string no formato esperado pelo formulário
      const birthDateString =
        client.birthDate instanceof Date
          ? client.birthDate.toISOString().split('T')[0]
          : new Date(client.birthDate).toISOString().split('T')[0]

      // Preencher formulário com dados do cliente
      methods.reset({
        name: client.name,
        cpfCnpj: formatCpfCnpj(client.cpfCnpj),
        birthDate: formatDate(birthDateString),
        email: client.email,
        phone: client.phone,
        addresses: client.addresses.map(addr => ({
          cep: addr.cep,
          street: addr.street,
          neighborhood: addr.neighborhood || '',
          city: addr.city,
          state: addr.state,
          number: addr.number,
          complement: addr.complement ?? '',
        })),
      })

      // Mapeia o cliente para garantir tipos compatíveis
      const mappedClient: Client = {
        ...client,
        birthDate: birthDateString,
        addresses: client.addresses.map(addr => ({
          id: addr.id,
          cep: addr.cep,
          street: addr.street,
          neighborhood: addr.neighborhood || '',
          city: addr.city,
          state: addr.state,
          number: addr.number,
          complement: addr.complement,
          clientId: addr.clientId,
        })),
      }

      setSelectedClient(mappedClient)
      setIsEditing(true)
      setIsCreating(false)
    }
  }

  // 🔹 Mutação para deletar
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await formActionDeleteClient(id)
      if (!res.success) throw new Error(res.error || 'Erro ao deletar cliente')
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setDeleteConfirmOpen(false)
      setClientToDelete(null)
    },
  })

  // 🔹 Mutação para editar
  const updateMutation = useMutation({
    mutationFn: async (data: ClienteFormData) => {
      if (isCreating) {
        const created = await formActionClientCreate(data)
        if (created.error) throw new Error(created.error)
        return created
      } else if (selectedClient?.id) {
        const updated = await formActionUpdateClient(selectedClient.id, data)
        if (!updated.success) throw new Error(updated.error || 'Erro ao atualizar cliente')
        return updated.data
      }
      throw new Error('ID do cliente não encontrado')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setIsEditing(false)
      setIsCreating(false)
      setSelectedClient(null)
      methods.reset()
    },
  })

  const handleEdit = (id: string) => {
    fetchClient(id)
  }

  const handleCreate = () => {
    methods.reset()
    setIsCreating(true)
    setIsEditing(false)
    setSelectedClient(null)
  }

  const handleDelete = (id: string) => {
    setClientToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const handleSubmitEdit = (data: ClienteFormData) => {
    updateMutation.mutate(data)
  }

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
    <div className="space-y-4 py-5 lg:px-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lista de Clientes</h2>
        <Button variant="default" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

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
            {data?.map(cliente => (
              <TableRow key={cliente.id}>
                <TableCell className="font-medium">{cliente.name}</TableCell>

                <TableCell className="font-mono text-sm">
                  {formatCpfCnpj(cliente.cpfCnpj)}
                </TableCell>

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
                    onClick={() => cliente.id && handleEdit(cliente.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    aria-label="Excluir cliente"
                    onClick={() => cliente.id && handleDelete(cliente.id)}
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

      {/* Modal de Edição/Criação Combinado */}
      <Dialog
        open={isEditing || isCreating}
        onOpenChange={open => {
          if (!open) {
            setIsEditing(false)
            setIsCreating(false)
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Novo Cliente' : 'Editar Cliente'}</DialogTitle>
          </DialogHeader>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmitEdit)} className="space-y-6">
              <NameField control={methods.control} />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DocsField control={methods.control} />
                <DateBirth control={methods.control} />
                <EmailField control={methods.control} />
                <ContactField control={methods.control} />
                <div className="col-span-1 space-y-2 md:col-span-2">
                  <FormLabel>Endereço</FormLabel>
                  <AddressesField control={methods.control} />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false)
                    setIsCreating(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isCreating ? 'Criando...' : 'Salvando...'}
                    </>
                  ) : isCreating ? (
                    'Criar Cliente'
                  ) : (
                    'Salvar Alterações'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => clientToDelete && deleteMutation.mutate(clientToDelete)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { TableListClient }
