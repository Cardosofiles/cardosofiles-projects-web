import { useMutation, useQueryClient } from '@tanstack/react-query'

import { formActionCreateClient } from '@/actions/dynamic-form/form'

import type { ClienteFormData } from '@/schemas'

export const useCreateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ClienteFormData) => formActionCreateClient(data),
    onSuccess: () => {
      // Invalidar cache dos clientes para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
    onError: error => {
      console.error('Erro ao criar cliente:', error)
    },
  })
}
