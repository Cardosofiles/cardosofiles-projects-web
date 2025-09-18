import { clienteSchema, type ClienteFormData } from '@/schemas'
import type { Client } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const useClientForm = () => {
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

  const populateForm = (client: Client) => {
    // Converter data para formato DD/MM/YYYY para o formulário (corrigido)
    let birthDateFormatted = ''
    if (client.birthDate) {
      let date: Date

      if (client.birthDate instanceof Date) {
        date = client.birthDate
      } else {
        // Se vier como string do banco, converter corretamente
        date = new Date(client.birthDate)
      }

      // Garantir que a data está correta usando métodos locais
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      birthDateFormatted = `${day}/${month}/${year}`
    }

    // Preencher formulário com dados do cliente SEM formatação adicional
    methods.reset({
      name: client.name,
      cpfCnpj: client.cpfCnpj,
      birthDate: birthDateFormatted,
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
  }

  return {
    ...methods,
    populateForm,
  }
}
