'use client'

import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import type { JSX } from 'react'

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
import { TableSkeleton } from './table-skeleton'

// Importações para o formulário
import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { NameField } from '@/components/dynamic-form/form/name-field'

// Hooks customizados
import { useClientForm } from '@/hooks/dynamic-form/useClientForm'
import { useCreateUpdateClient, useDeleteClient } from '@/hooks/dynamic-form/useClientMutations'
import { useClientList } from '@/hooks/dynamic-form/useClientQueries'
import { useClientTable } from '@/hooks/dynamic-form/useClientTable'

// Utils
import type { ClienteFormData } from '@/schemas'
import { formatCep, formatCpfCnpj, formatDate, formatPhone } from '@/utils/formatters'

const TableListClient = (): JSX.Element => {
  // Hooks customizados
  const { data, isLoading, isError } = useClientList()
  const deleteMutation = useDeleteClient()
  const updateMutation = useCreateUpdateClient()
  const methods = useClientForm()
  const {
    isEditing,
    isCreating,
    selectedClient,
    deleteConfirmOpen,
    clientToDelete,
    handleEdit,
    handleCreate,
    handleDelete,
    closeModal,
    closeDeleteDialog,
  } = useClientTable()

  // Handlers
  const handleOnEdit = async (id: string) => {
    const client = await handleEdit(id)
    if (client) {
      methods.populateForm(client)
    }
  }

  const handleOnSubmit = (data: ClienteFormData) => {
    updateMutation.mutate(
      {
        data,
        isCreating,
        clientId: selectedClient?.id,
      },
      {
        onSuccess: () => {
          closeModal()
          methods.reset()
        },
      }
    )
  }

  const handleOnDelete = () => {
    if (clientToDelete) {
      deleteMutation.mutate(clientToDelete, {
        onSuccess: closeDeleteDialog,
      })
    }
  }

  // Loading e Error states
  if (isLoading) {
    return <TableSkeleton />
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
                    onClick={() => cliente.id && handleOnEdit(cliente.id)}
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
                <TableCell colSpan={7} className="text-muted-foreground text-center">
                  Nenhum cliente cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de Edição/Criação Combinado */}
      <Dialog open={isEditing || isCreating} onOpenChange={open => !open && closeModal()}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{isCreating ? 'Novo Cliente' : 'Editar Cliente'}</DialogTitle>
          </DialogHeader>

          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(handleOnSubmit)} className="space-y-6">
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
                <Button type="button" variant="outline" onClick={closeModal}>
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
      <Dialog open={deleteConfirmOpen} onOpenChange={open => !open && closeDeleteDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p>Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.</p>
          <DialogFooter>
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleOnDelete}
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
