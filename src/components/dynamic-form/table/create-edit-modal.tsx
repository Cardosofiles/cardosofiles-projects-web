'use client'

import { Loader2, Plus, Save, X } from 'lucide-react'
import type { JSX } from 'react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormLabel } from '@/components/ui/form'

import { AddressesField } from '@/components/dynamic-form/form/addresses-field'
import { ContactField } from '@/components/dynamic-form/form/contact-field'
import { DateBirth } from '@/components/dynamic-form/form/date-birth'
import { DocsField } from '@/components/dynamic-form/form/docs-field'
import { EmailField } from '@/components/dynamic-form/form/email-field'
import { NameField } from '@/components/dynamic-form/form/name-field'
import { ErrorDisplay } from '@/components/ux/error-display'

import type { ClienteFormData } from '@/schemas'

interface CreateEditModalProps {
  isOpen: boolean
  isCreating: boolean
  isLoading: boolean
  methods: UseFormReturn<ClienteFormData>
  onClose: () => void
  onSubmit: (data: ClienteFormData) => void
}

const CreateEditModal = ({
  isOpen,
  isCreating,
  isLoading,
  methods,
  onClose,
  onSubmit,
}: CreateEditModalProps): JSX.Element => {
  const phone = '5534996741823'
  const whatsappMessage = 'Olá, preciso de ajuda para me cadastrar no FormDynamic.'
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`
  const supportEmail = 'support@formdynamic.com'

  const handleClose = () => {
    onClose()
    methods.clearErrors()
  }

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && handleClose()}>
      <DialogContent className="h-screen w-screen max-w-none overflow-y-auto p-0 md:h-auto md:w-auto md:max-w-3xl md:p-6">
        <div className="flex h-full flex-col">
          <DialogHeader className="border-b px-4 py-4 md:border-0 md:px-0 md:py-0">
            <DialogTitle className="text-left">
              {isCreating ? 'Novo Cliente' : 'Editar Cliente'}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 md:px-0">
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                <NameField control={methods.control} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <DocsField control={methods.control} />
                  <DateBirth control={methods.control} />
                  <EmailField control={methods.control} />
                  <ContactField control={methods.control} />
                  <div className="col-span-1 space-y-2 md:col-span-2">
                    <FormLabel>Endereço</FormLabel>
                    <AddressesField control={methods.control} />
                  </div>
                </div>

                {/* Exibição melhorada de erros de validação */}
                <ErrorDisplay
                  errors={methods.formState.errors}
                  supportEmail={supportEmail}
                  whatsappLink={whatsappLink}
                />
              </form>
            </Form>
          </div>

          <DialogFooter className="bg-background border-t p-4 md:border-0 md:bg-transparent md:p-0">
            <div className="flex w-full gap-3 md:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 md:flex-none"
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>

              <Button
                type="button" // Mudou para "button" para usar onClick
                disabled={isLoading}
                onClick={methods.handleSubmit(onSubmit)} // Força o submit do form
                className="flex-1 md:flex-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isCreating ? 'Criando...' : 'Salvando...'}
                  </>
                ) : isCreating ? (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Cliente
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { CreateEditModal }
