import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import type { JSX } from 'react'

interface FormErrorProps {
  message?: string
  supportEmail?: string
}

const FormError = ({
  message,
  supportEmail = 'support@formdynamic.com',
}: FormErrorProps): JSX.Element | null => {
  if (!message) return null

  const phone = '5534996741823'
  const whatsappMessage = 'Olá, preciso de ajuda para me cadastrar no FormDynamic.'
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="bg-destructive/10 text-destructive flex flex-col gap-2 rounded-md p-3 text-sm font-semibold">
      <div className="flex items-center gap-x-2">
        <AlertTriangle className="h-4 w-4" />
        <span>{message}</span>
      </div>
      <div className="text-destructive/80 text-xs font-normal">
        <span>Precisa de ajuda? </span>
        <Link href={`mailto:${supportEmail}`} className="hover:text-destructive underline">
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
  )
}

export { FormError }
