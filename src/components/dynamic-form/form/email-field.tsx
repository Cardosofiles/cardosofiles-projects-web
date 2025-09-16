'use client'

import type { JSX } from 'react'
import { useFormContext, type Control } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { EmailProviderSelector } from '@/components/ux/email-input'

import type { ClienteFormData } from '@/schemas'

interface EmailFieldProps {
  control: Control<ClienteFormData>
}

const EmailField = ({ control }: EmailFieldProps): JSX.Element => {
  const { setValue, watch } = useFormContext()
  const emailValue = watch('email')

  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <EmailProviderSelector
              value={emailValue}
              onChange={value => setValue('email', value)}
              placeholder="exemplo@email.com"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { EmailField }
