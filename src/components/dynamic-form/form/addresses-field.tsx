'use client'

import { useMutation } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import type { JSX } from 'react'
import { Control, useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { ClienteFormData } from '@/schemas'

import { fetchAddressByCep } from '@/utils/cep'

interface AddressesFieldProps {
  control: Control<ClienteFormData>
}

const formatCep = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9)
}

const AddressesField = ({ control }: AddressesFieldProps): JSX.Element => {
  const { setValue, watch } = useFormContext<ClienteFormData>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  const cepMutation = useMutation({
    mutationFn: async ({ cep, index }: { cep: string; index: number }) => {
      const data = await fetchAddressByCep(cep)
      return { data, index }
    },
    onSuccess: result => {
      setValue(`addresses.${result.index}.street`, result.data.street)
      setValue(`addresses.${result.index}.neighborhood`, result.data.neighborhood)
      setValue(`addresses.${result.index}.city`, result.data.city)
      setValue(`addresses.${result.index}.state`, result.data.state)
    },
  })

  const handleCepChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value)
    setValue(`addresses.${index}.cep`, formatted)

    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 8) {
      cepMutation.mutateAsync({ cep: digits, index })
    }
  }

  return (
    <div className="space-y-4">
      {fields.map((field, index) => {
        // Garante valor string para todos os campos controlados
        const cepValue = watch(`addresses.${index}.cep`) ?? ''
        const streetValue = watch(`addresses.${index}.street`) ?? ''
        const neighborhoodValue = watch(`addresses.${index}.neighborhood`) ?? ''
        const cityValue = watch(`addresses.${index}.city`) ?? ''
        const stateValue = watch(`addresses.${index}.state`) ?? ''
        const numberValue = watch(`addresses.${index}.number`) ?? ''
        const complementValue = watch(`addresses.${index}.complement`) ?? ''

        return (
          <div key={field.id} className="space-y-3 rounded-xl border p-4">
            {/* CEP */}
            <FormField
              control={control}
              name={`addresses.${index}.cep`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        {...field}
                        value={cepValue}
                        onChange={e => handleCepChange(index, e)}
                        placeholder="00000-000"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                        className="cursor-pointer"
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rua */}
            <FormField
              control={control}
              name={`addresses.${index}.street`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} value={streetValue} readOnly className="cursor-not-allowed" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bairro, Cidade e Estado */}
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={control}
                name={`addresses.${index}.neighborhood`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={neighborhoodValue}
                        readOnly
                        className="cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`addresses.${index}.city`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} value={cityValue} readOnly className="cursor-not-allowed" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`addresses.${index}.state`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={stateValue}
                        readOnly
                        className="cursor-not-allowed"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Número e Complemento */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={control}
                name={`addresses.${index}.number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} value={numberValue} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`addresses.${index}.complement`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input {...field} value={complementValue} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )
      })}

      {/* Botão adicionar endereço */}
      <Button
        type="button"
        variant="secondary"
        onClick={() =>
          append({
            cep: '',
            street: '',
            neighborhood: '',
            city: '',
            state: '',
            number: '',
            complement: '',
          })
        }
        className="border-primary/50 text-primary hover:bg-primary/10 w-full cursor-pointer border border-dashed"
      >
        <Plus className="mr-2 h-4 w-4" /> Adicionar Endereço
      </Button>
    </div>
  )
}

export { AddressesField }
