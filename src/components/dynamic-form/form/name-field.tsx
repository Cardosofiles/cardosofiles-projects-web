'use client'

import type { JSX } from 'react'
import { type Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

interface NameFieldProps {
  control: Control<ClienteFormData>
}

const NameField = ({ control }: NameFieldProps): JSX.Element => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome Completo</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Nome completo" />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { NameField }
