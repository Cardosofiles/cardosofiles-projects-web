import { HeaderDynamicForm } from '@/components/dynamic-form/layout/header'

const DynamicFormLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-5 min-h-screen px-10">
      <HeaderDynamicForm />
      <main className="">{children}</main>
    </div>
  )
}

export default DynamicFormLayout
