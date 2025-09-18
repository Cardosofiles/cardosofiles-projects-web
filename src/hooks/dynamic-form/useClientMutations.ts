import {
  formActionClientCreate,
  formActionDeleteClient,
  formActionUpdateClient,
} from '@/actions/dynamic-form/form'
import type { ClienteFormData } from '@/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await formActionDeleteClient(id)
      if (!res.success) throw new Error(res.error || 'Erro ao deletar cliente')
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}

export const useCreateUpdateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      data,
      isCreating,
      clientId,
    }: {
      data: ClienteFormData
      isCreating: boolean
      clientId?: string
    }) => {
      if (isCreating) {
        const created = await formActionClientCreate(data)
        if (created.error) throw new Error(created.error)
        return created
      } else if (clientId) {
        const updated = await formActionUpdateClient(clientId, data)
        if (!updated.success) throw new Error(updated.error || 'Erro ao atualizar cliente')
        return updated.data
      }
      throw new Error('ID do cliente não encontrado')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}
