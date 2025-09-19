'use client'

import { AlertTriangle, HelpCircle, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'
import type { FieldErrors } from 'react-hook-form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'

interface ErrorDisplayProps {
  errors: FieldErrors
  supportEmail?: string
  whatsappLink?: string
}

const fieldLabels: Record<string, string> = {
  name: 'Nome',
  cpfCnpj: 'CPF/CNPJ',
  email: 'Email',
  phone: 'Telefone',
  birthDate: 'Data de Nascimento',
  addresses: 'Endereços',
}

const ErrorDisplay = ({
  errors,
  supportEmail = 'support@formdynamic.com',
  whatsappLink,
}: ErrorDisplayProps): JSX.Element | null => {
  const errorCount = Object.keys(errors).length

  if (errorCount === 0) return null

  return (
    <Alert variant="destructive" className="bg-destructive/5">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <span>
          {errorCount === 1
            ? 'Há 1 erro que precisa ser corrigido'
            : `Há ${errorCount} erros que precisam ser corrigidos`}
        </span>
      </AlertTitle>

      <AlertDescription className="mt-3">
        <div className="space-y-2">
          {Object.entries(errors).map(([field, error]) => (
            <div key={field} className="flex items-start gap-2">
              <div className="bg-destructive/20 mt-0.5 h-1.5 w-1.5 rounded-full" />
              <div className="text-sm">
                <span className="font-medium">{fieldLabels[field] || field}:</span>{' '}
                <span className="text-destructive-foreground/80">{error?.message?.toString()}</span>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive h-auto p-0 text-xs font-normal hover:bg-transparent"
            >
              <HelpCircle className="mr-1 h-3 w-3" />
              Precisa de ajuda?
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-3">
            <div className="bg-muted/30 rounded-md p-3">
              <p className="text-muted-foreground mb-3 text-xs">
                Entre em contato conosco para obter suporte:
              </p>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                  <Link href={`mailto:${supportEmail}`}>
                    <Mail className="mr-1 h-3 w-3" />
                    Enviar Email
                  </Link>
                </Button>

                {whatsappLink && (
                  <Button asChild variant="outline" size="sm" className="h-8 text-xs">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1 h-3 w-3" />
                      WhatsApp
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </AlertDescription>
    </Alert>
  )
}

export { ErrorDisplay }
