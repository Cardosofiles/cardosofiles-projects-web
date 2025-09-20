import { formActionUpdateClient } from '@/actions/dynamic-form/form'
import type { ClienteFormData } from '@/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateClient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClienteFormData }) =>
      formActionUpdateClient(id, data),
    onSuccess: () => {
      // Invalidar cache dos clientes para recarregar a lista
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
    onError: error => {
      console.error('Erro ao atualizar cliente:', error)
    },
  })
}
