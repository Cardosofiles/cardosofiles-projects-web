import { formActionGetClient, formActionGetClientById } from '@/actions/dynamic-form/form'
import type { Client } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const useClientList = () => {
  return useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await formActionGetClient()
      if (!res.success) throw new Error(res.error || 'Erro ao carregar clientes')
      return res.data as Client[]
    },
  })
}

export const useClientById = (id: string) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const res = await formActionGetClientById(id)
      if (!res.success) throw new Error(res.error || 'Cliente não encontrado')
      return res.data as Client
    },
    enabled: !!id,
  })
}
