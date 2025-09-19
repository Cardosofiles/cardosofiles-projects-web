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
import { NameField } from '@/components/dynamic-form/form/name-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'

import { clienteSchema, type ClienteFormData } from '@/schemas'

import { cn } from '@/lib/utils'
import Link from 'next/link'

const FormCreateCliente = (): JSX.Element => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

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

  const { handleSubmit, reset, setError: setFormError } = methods

  const handleSave = (data: ClienteFormData) => {
    startTransition(() => {
      // Implementar lógica de criação aqui
      console.log('Criando cliente:', data)
      // Para uso futuro quando conectar com as actions
    })
  }

  const phone = '5534996741823'
  const whatsappMessage = 'Olá, preciso de ajuda para me cadastrar no FormDynamic.'
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`
  const supportEmail = 'support@formdynamic.com'

  return (
    <>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit(handleSave)}
          className={cn(
            'mx-auto my-5 space-y-6 rounded-2xl bg-transparent shadow-none md:p-0 lg:max-w-6xl lg:p-5'
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

          {/* <Messages error={error} success={success} /> */}

          {/* Exibição adicional de erros de validação */}
          {Object.keys(methods.formState.errors).length > 0 && (
            <div className="bg-destructive/10 text-destructive flex flex-col gap-2 rounded-md p-3 text-sm font-semibold">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-destructive">Corrija os seguintes erros:</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <ul className="list-disc space-y-1 pl-5">
                      {Object.entries(methods.formState.errors).map(([field, error]) => (
                        <li key={field}>
                          <strong>
                            {field === 'name' && 'Nome'}
                            {field === 'cpfCnpj' && 'CPF/CNPJ'}
                            {field === 'email' && 'Email'}
                            {field === 'phone' && 'Telefone'}
                            {field === 'birthDate' && 'Data de Nascimento'}
                            {field === 'addresses' && 'Endereços'}
                          </strong>
                          : {error?.message}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-destructive/80 mt-2 text-xs font-normal">
                    <span>Precisa de ajuda? </span>
                    <Link
                      href={`mailto:${supportEmail}`}
                      className="hover:text-destructive underline"
                    >
                      Contate o suporte via email
                    </Link>
                    <span> ou </span>
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-destructive underline"
                    >
                      fale conosco no WhatsApp
                    </Link>
                    <span> para mais informações.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 md:flex-row md:justify-end lg:flex-row lg:justify-end">
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              className="hover:bg-primary/10 mt-6 w-full cursor-pointer md:max-w-28 lg:max-w-48"
              onClick={() => {
                reset()
                setError('')
                setSuccess('')
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>

            <Button
              disabled={isPending}
              type="submit"
              className="mt-6 w-full cursor-pointer md:max-w-40 lg:max-w-64"
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

export { FormCreateCliente }
