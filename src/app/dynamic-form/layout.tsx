import { HeaderDynamicForm } from '@/components/dynamic-form/layout/header'

const DynamicFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-10 min-h-screen px-10 lg:mt-20">
      <HeaderDynamicForm />
      <main>{children}</main>
    </div>
  )
}

export default DynamicFormLayout
