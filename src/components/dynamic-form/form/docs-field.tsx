'use client'

import type { JSX } from 'react'
import type { Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

interface DocsFieldProps {
  control: Control<ClienteFormData>
}

const formatDocs = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  } else {
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
}

const DocsField = ({ control }: DocsFieldProps): JSX.Element => {
  return (
    <FormField
      control={control}
      name="cpfCnpj"
      render={({ field }) => (
        <FormItem>
          <FormLabel>CPF/CNPJ</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Digite o CPF ou CNPJ"
              onChange={e => field.onChange(formatDocs(e.target.value))}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { DocsField }
