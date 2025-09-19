import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { clienteSchema, type ClienteFormData } from '@/schemas'
import type { Client } from '@/types'
import { formatPhone } from '@/utils/formatters'

export const useClientForm = () => {
  const form = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      name: '',
      cpfCnpj: '',
      birthDate: '',
      email: '',
      phone: '',
      addresses: [
        {
          cep: '',
          street: '',
          neighborhood: '',
          city: '',
          state: '',
          number: '',
          complement: '',
        },
      ],
    },
  })

  const { setValue, reset, handleSubmit, control } = form

  const populateForm = useCallback(
    (client: Client) => {
      console.log('🔄 Populando formulário com cliente:', client)

      // Garantir que a data está no formato correto para o formulário
      let formattedBirthDate = ''
      if (client.birthDate) {
        if (typeof client.birthDate === 'string') {
          if (client.birthDate.includes('/')) {
            formattedBirthDate = client.birthDate
          } else {
            // Se está no formato ISO, converter
            const dateObj = new Date(client.birthDate)
            const day = dateObj.getDate().toString().padStart(2, '0')
            const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
            const year = dateObj.getFullYear().toString()
            formattedBirthDate = `${day}/${month}/${year}`
          }
        } else {
          // Se é objeto Date
          const day = client.birthDate.getDate().toString().padStart(2, '0')
          const month = (client.birthDate.getMonth() + 1).toString().padStart(2, '0')
          const year = client.birthDate.getFullYear().toString()
          formattedBirthDate = `${day}/${month}/${year}`
        }
      }

      // Formatar telefone para exibição no formulário
      const formattedPhone = formatPhone(client.phone)

      setValue('name', client.name)
      setValue('cpfCnpj', client.cpfCnpj)
      setValue('birthDate', formattedBirthDate)
      setValue('email', client.email)
      setValue('phone', formattedPhone)
      setValue(
        'addresses',
        (client.addresses || []).map(address => ({
          ...address,
          complement: address.complement ?? undefined,
        }))
      )

      console.log('✅ Formulário populado - data:', formattedBirthDate, 'telefone:', formattedPhone)
    },
    [setValue]
  )

  return {
    ...form,
    populateForm,
    reset,
    handleSubmit,
    control,
    setValue,
  }
}
