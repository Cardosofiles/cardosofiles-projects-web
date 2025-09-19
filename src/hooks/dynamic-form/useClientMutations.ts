import { formActionDeleteClient } from '@/actions/dynamic-form/form'
import type { ClienteFormData } from '@/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCreateClient } from './useCreateClient'

interface ErrorWithMessage {
  message?: string
}

interface MutationOptions {
  onSuccess?: () => void
  onError?: (error: ErrorWithMessage) => void
}

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
  const createClient = useCreateClient()

  return {
    mutate: (
      params: {
        data: ClienteFormData
        isCreating: boolean
        clientId?: string
      },
      options?: MutationOptions
    ) => {
      if (params.isCreating) {
        // Para criação, usar o hook específico
        createClient.mutate(params.data, {
          onSuccess: result => {
            if (result.success) {
              options?.onSuccess?.()
            } else {
              options?.onError?.({ message: result.error })
            }
          },
          onError: (error: ErrorWithMessage) => options?.onError?.(error),
        })
      } else {
        // Para edição, usar a lógica existente
        // ...existing update logic...
      }
    },
    isPending: createClient.isPending,
  }
}
