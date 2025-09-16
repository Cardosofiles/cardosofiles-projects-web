'use client'

import type { JSX } from 'react'
import { type Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

interface ContactFieldProps {
  control: Control<ClienteFormData>
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

const ContactField = ({ control }: ContactFieldProps): JSX.Element => {
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contato</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="(99) 99999-9999"
              onChange={e => field.onChange(formatPhone(e.target.value))}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ContactField }
