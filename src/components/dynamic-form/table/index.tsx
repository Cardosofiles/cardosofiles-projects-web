'use client'

import type { JSX } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { TableSkeleton } from './table-skeleton'

import { ClientTable } from '@/components/dynamic-form/table/client-table'
import { CreateEditModal } from '@/components/dynamic-form/table/create-edit-modal'
import { DeleteModal } from '@/components/dynamic-form/table/delete-modal'
import { SearchResults } from '@/components/dynamic-form/table/search-results'
import { TableHeader } from '@/components/dynamic-form/table/table-header'
import { ClientSearch } from '@/components/dynamic-form/table/table-search'

import { useClientForm } from '@/hooks/dynamic-form/useClientForm'
import { useCreateUpdateClient, useDeleteClient } from '@/hooks/dynamic-form/useClientMutations'
import { useClientList } from '@/hooks/dynamic-form/useClientQueries'
import { useClientSearch } from '@/hooks/dynamic-form/useClientSearch'
import { useClientTable } from '@/hooks/dynamic-form/useClientTable'

import type { ClienteFormData } from '@/schemas'

interface ErrorWithMessage {
  message?: string
}

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
    console.log('🚀 Submitting form:', { data, isCreating, clientId: selectedClient?.id })

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
          toast.success(
            isCreating ? 'Cliente criado com sucesso!' : 'Cliente atualizado com sucesso!'
          )
        },
        onError: (error: ErrorWithMessage) => {
          console.error('Erro na operação:', error)

          const errorMessage = error?.message || 'Erro desconhecido'

          if (errorMessage.includes('Email já está em uso')) {
            methods.setError('email', {
              type: 'manual',
              message: 'Este email já está sendo usado por outro cliente',
            })
            toast.error('Email já está em uso por outro cliente')
          } else if (errorMessage.includes('CPF/CNPJ já está em uso')) {
            methods.setError('cpfCnpj', {
              type: 'manual',
              message: 'Este CPF/CNPJ já está sendo usado por outro cliente',
            })
            toast.error('CPF/CNPJ já está em uso por outro cliente')
          } else if (errorMessage.includes('Telefone já está em uso')) {
            methods.setError('phone', {
              type: 'manual',
              message: 'Este telefone já está sendo usado por outro cliente',
            })
            toast.error('Telefone já está em uso por outro cliente')
          } else {
            toast.error(`Erro ao ${isCreating ? 'criar' : 'atualizar'} cliente: ${errorMessage}`)
          }
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
      <TableHeader onCreateClient={handleCreate} />

      <ClientSearch onSearch={handleSearch} onClear={handleClearSearch} />

      <ClientTable
        clients={filteredClients || []}
        onEdit={handleOnEdit}
        onDelete={handleDelete}
        isSearchActive={isSearchActive}
        searchTerm={searchFilters?.searchTerm}
      />

      <SearchResults
        isSearchActive={isSearchActive}
        filteredClients={filteredClients || []}
        totalClients={data?.length}
      />

      <CreateEditModal
        isOpen={isEditing || isCreating}
        isCreating={isCreating}
        isLoading={updateMutation.isPending}
        methods={methods}
        onClose={closeModal}
        onSubmit={handleOnSubmit}
      />

      <DeleteModal
        isOpen={deleteConfirmOpen}
        isLoading={deleteMutation.isPending}
        onClose={closeDeleteDialog}
        onConfirm={handleOnDelete}
      />
    </div>
  )
}

export { TableListClient }
