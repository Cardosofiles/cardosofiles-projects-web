import type { JSX } from 'react'

import { FormError } from '@/components/ux/form-error'
import { FormSuccess } from '@/components/ux/form-success'

interface MessagesProps {
  error?: string
  success?: string
}

const Messages = ({ error, success }: MessagesProps): JSX.Element => {
  return (
    <>
      <FormError message={error} />
      <FormSuccess message={success} />
    </>
  )
}

export { Messages }
