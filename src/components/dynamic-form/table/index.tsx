'use client'

import { Loader2, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
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

import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { NameField } from '@/components/dynamic-form/form/name-field'
import { ClientSearch } from '@/components/dynamic-form/table/table-search'

import { useClientForm } from '@/hooks/dynamic-form/useClientForm'
import { useCreateUpdateClient, useDeleteClient } from '@/hooks/dynamic-form/useClientMutations'
import { useClientList } from '@/hooks/dynamic-form/useClientQueries'
import { useClientSearch } from '@/hooks/dynamic-form/useClientSearch'
import { useClientTable } from '@/hooks/dynamic-form/useClientTable'

import type { ClienteFormData } from '@/schemas'
import { formatCep, formatCpfCnpj, formatDate, formatPhone } from '@/utils/formatters'

const TableListClient = (): JSX.Element => {
  const { data, isLoading, isError, error } = useClientList()
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

  // Hook de busca
  const { filteredClients, handleSearch, handleClearSearch, isSearchActive, searchFilters } =
    useClientSearch(data)

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

  if (isLoading) {
    return <TableSkeleton />
  }

  if (isError) {
    console.error('Erro no useClientList:', error)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mb-4 text-center text-red-500">Erro ao carregar clientes</p>
        <p className="text-muted-foreground mb-4 text-sm">
          {error instanceof Error ? error.message : 'Erro desconhecido'}
        </p>
        <Button onClick={() => window.location.reload()}>Tentar Novamente</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 py-5 lg:px-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Lista de Clientes</h2>
        <Button variant="default" onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      {/* Componente de busca */}
      <ClientSearch onSearch={handleSearch} onClear={handleClearSearch} />

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
            {filteredClients?.map(cliente => (
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

            {filteredClients?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground text-center">
                  {isSearchActive
                    ? `Nenhum cliente encontrado para "${searchFilters?.searchTerm}"`
                    : 'Nenhum cliente cadastrado'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Indicador de resultados */}
      {isSearchActive && filteredClients && filteredClients.length > 0 && (
        <div className="text-muted-foreground text-sm">
          <span>
            {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''} encontrado
            {filteredClients.length !== 1 ? 's' : ''}
            {data && ` de ${data.length} total`}
          </span>
        </div>
      )}

      {/* Modal de Edição/Criação Combinado */}
      <Dialog open={isEditing || isCreating} onOpenChange={open => !open && closeModal()}>
        <DialogContent className="h-screen w-screen max-w-none overflow-y-auto p-0 md:h-auto md:w-auto md:max-w-3xl md:p-6">
          <div className="flex h-full flex-col">
            <DialogHeader className="border-b px-4 py-4 md:border-0 md:px-0 md:py-0">
              <DialogTitle className="text-left">
                {isCreating ? 'Novo Cliente' : 'Editar Cliente'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-4 py-4 md:px-0">
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
                </form>
              </Form>
            </div>

            <DialogFooter className="bg-background border-t p-4 md:border-0 md:bg-transparent md:p-0">
              <div className="flex w-full gap-3 md:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  className="flex-1 md:flex-none"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  onClick={methods.handleSubmit(handleOnSubmit)}
                  className="flex-1 md:flex-none"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isCreating ? 'Criando...' : 'Salvando...'}
                    </>
                  ) : isCreating ? (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Criar Cliente
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <Dialog open={deleteConfirmOpen} onOpenChange={open => !open && closeDeleteDialog()}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <div className="flex w-full gap-3 md:w-auto">
              <Button variant="outline" onClick={closeDeleteDialog} className="flex-1 md:flex-none">
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleOnDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 md:flex-none"
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
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { TableListClient }
