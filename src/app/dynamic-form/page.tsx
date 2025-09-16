import type { JSX } from 'react'

import { FormCliente } from '@/components/dynamic-form/form'

const DynamicForm = (): JSX.Element => {
  return (
    <>
      <FormCliente />
      {/* <TableClient /> */}
    </>
  )
}

export default DynamicForm
