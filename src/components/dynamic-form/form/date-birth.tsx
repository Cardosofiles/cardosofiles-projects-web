'use client'

import type { JSX } from 'react'
import { type Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

interface DateBirthProps {
  control: Control<ClienteFormData>
}

const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  return digits
    .replace(/^(\d{2})(\d)/, '$1/$2')
    .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .slice(0, 10)
}

const DateBirth = ({ control }: DateBirthProps): JSX.Element => {
  return (
    <FormField
      control={control}
      name="birthDate"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Data de Nascimento</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="DD/MM/AAAA"
              onChange={e => field.onChange(formatDate(e.target.value))}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { DateBirth }
