'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, MapPin, Save, User2, X } from 'lucide-react'
import { useState, useTransition, type JSX } from 'react'
import { useForm } from 'react-hook-form'

import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { Messages } from '@/components/dynamic-form/form/message'
import { NameField } from '@/components/dynamic-form/form/name-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'

import { formClientCreate } from '@/actions/dynamic-form/form'
import { cn } from '@/lib/utils'
import { clienteSchema, type ClienteFormData } from '@/schemas'

const FormCliente = (): JSX.Element => {
  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<string>()

  const [isPending, startTransition] = useTransition()

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

  const { handleSubmit, reset } = methods

  const handleSave = (data: ClienteFormData) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      formClientCreate(data).then(values => {
        if (values) {
          setError(values.error ?? undefined)
          if (!values.error) {
            setSuccess('Cliente salvo com sucesso!')
            reset()
          }
        }
      })
    })
  }

  return (
    <>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(handleSave)}
          className={cn(
            'mx-auto my-5 max-w-6xl space-y-6 rounded-2xl bg-transparent p-5 shadow-none md:p-0'
          )}
        >
          {/* Card: Informações Básicas */}
          <Card className="bg-primary/1 mb-4 border-none">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <User2 className="text-primary h-4 w-4" />
                <CardTitle className="text-base">Informações Básicas</CardTitle>
              </div>
              <CardDescription className="">Dados principais do cliente</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 space-y-4 md:grid-cols-1">
              <NameField control={methods.control} />
              <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
                <DocsField control={methods.control} />
                <DateBirth control={methods.control} />
              </div>
            </CardContent>
          </Card>

          {/* Card: Informações de Contato */}
          <Card className="bg-primary/1 mb-4 border-none">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <Mail className="text-primary h-5 w-5" />
                <CardTitle className="text-base">Informações de Contato</CardTitle>
              </div>
              <CardDescription>Emails e telefones para contato</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <EmailField control={methods.control} />
              <ContactField control={methods.control} />
            </CardContent>
          </Card>

          {/* Card: Endereço */}
          <Card className="bg-primary/1 mb-4 border-none">
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <MapPin className="text-primary h-5 w-5" />
                <CardTitle className="text-base">Endereço</CardTitle>
              </div>
              <CardDescription>Endereço completo do cliente</CardDescription>
            </CardHeader>
            <CardContent>
              <AddressesField control={methods.control} />
            </CardContent>
          </Card>

          <Messages error={error} success={success} />

          <div className="flex justify-end gap-2">
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              className="hover:bg-primary/10 mt-6 w-full max-w-48 cursor-pointer"
              onClick={() => reset()}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>

            <Button
              disabled={isPending}
              type="submit"
              className="mt-6 w-full max-w-64 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Cliente
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export { FormCliente }
