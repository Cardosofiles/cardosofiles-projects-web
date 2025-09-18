import { formActionGetClientById } from '@/actions/dynamic-form/form'
import type { Client } from '@/types'
import { useState } from 'react'

export const useClientTable = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)

  const fetchClient = async (id: string) => {
    const res = await formActionGetClientById(id)
    if (res.success && res.data) {
      const client = res.data as Client

      // Mapeia o cliente para garantir tipos compatíveis
      const mappedClient: Client = {
        ...client,
        birthDate: client.birthDate,
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
      return mappedClient
    }
    return null
  }

  const handleEdit = async (id: string) => {
    const client = await fetchClient(id)
    if (client) {
      setIsEditing(true)
      setIsCreating(false)
      return client
    }
  }

  const handleCreate = () => {
    setIsCreating(true)
    setIsEditing(false)
    setSelectedClient(null)
  }

  const handleDelete = (id: string) => {
    setClientToDelete(id)
    setDeleteConfirmOpen(true)
  }

  const closeModal = () => {
    setIsEditing(false)
    setIsCreating(false)
    setSelectedClient(null)
  }

  const closeDeleteDialog = () => {
    setDeleteConfirmOpen(false)
    setClientToDelete(null)
  }

  return {
    // States
    isEditing,
    isCreating,
    selectedClient,
    deleteConfirmOpen,
    clientToDelete,

    // Actions
    handleEdit,
    handleCreate,
    handleDelete,
    closeModal,
    closeDeleteDialog,

    // Setters (para casos específicos)
    setIsEditing,
    setIsCreating,
    setSelectedClient,
  }
}
