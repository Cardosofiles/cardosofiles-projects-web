'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Mail, MapPin, Save, User2, X } from 'lucide-react'
import { type JSX } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { NameField } from '@/components/dynamic-form/form/name-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { ErrorDisplay } from '@/components/ux/error-display'

import { useCreateClient } from '@/hooks/dynamic-form/useCreateClient'
import { clienteSchema, type ClienteFormData } from '@/schemas'

import { cn } from '@/lib/utils'

const FormCreateCliente = (): JSX.Element => {
  // Remover estados não utilizados
  const createClientMutation = useCreateClient()

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
    createClientMutation.mutate(data, {
      onSuccess: result => {
        if (result.success) {
          reset()
          toast.success('Cliente criado com sucesso!')
        } else {
          // Tratamento específico para erros de validação de unicidade
          if (result.error?.includes('Email já está em uso')) {
            setFormError('email', {
              type: 'manual',
              message: 'Este email já está sendo usado por outro cliente',
            })
          } else if (result.error?.includes('CPF/CNPJ já está em uso')) {
            setFormError('cpfCnpj', {
              type: 'manual',
              message: 'Este CPF/CNPJ já está sendo usado por outro cliente',
            })
          } else if (result.error?.includes('Telefone já está em uso')) {
            setFormError('phone', {
              type: 'manual',
              message: 'Este telefone já está sendo usado por outro cliente',
            })
          }

          toast.error(result.error || 'Erro ao criar cliente')
        }
      },
      onError: error => {
        console.error('Erro inesperado:', error)
        toast.error('Erro inesperado ao salvar cliente')
      },
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

          {/* Exibição melhorada de erros de validação */}
          <ErrorDisplay
            errors={methods.formState.errors}
            supportEmail={supportEmail}
            whatsappLink={whatsappLink}
          />

          <div className="flex flex-col gap-2 md:flex-row md:justify-end lg:flex-row lg:justify-end">
            <Button
              disabled={createClientMutation.isPending}
              variant="outline"
              type="button"
              className="hover:bg-primary/10 mt-6 w-full cursor-pointer md:max-w-28 lg:max-w-48"
              onClick={() => {
                reset()
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>

            <Button
              disabled={createClientMutation.isPending}
              type="submit"
              className="mt-6 w-full cursor-pointer md:max-w-40 lg:max-w-64"
            >
              {createClientMutation.isPending ? (
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
