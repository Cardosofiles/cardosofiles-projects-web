'use client'

import type { JSX } from 'react'
import { type Control, useController } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

interface ContactFieldProps {
  control: Control<ClienteFormData>
}

const ContactField = ({ control }: ContactFieldProps): JSX.Element => {
  const { field } = useController({
    name: 'phone',
    control,
  })

  const handlePhoneChange = (value: string) => {
    // Remove caracteres não numéricos para validação
    const numbersOnly = value.replace(/\D/g, '')

    // Aplica máscara apenas na exibição
    let formattedValue = value
    if (numbersOnly.length <= 11) {
      if (numbersOnly.length === 10) {
        formattedValue = numbersOnly.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
      } else if (numbersOnly.length === 11) {
        formattedValue = numbersOnly.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
      } else {
        formattedValue = numbersOnly
      }
    }

    field.onChange(formattedValue)
  }

  return (
    <FormField
      control={control}
      name="phone"
      render={({ field: renderField }) => (
        <FormItem>
          <FormLabel>Contato</FormLabel>
          <FormControl>
            <Input
              {...renderField}
              placeholder="(11) 99999-9999"
              value={field.value || ''}
              onChange={e => handlePhoneChange(e.target.value)}
              maxLength={15} // (11) 99999-9999
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ContactField }
