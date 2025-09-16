import { CircleCheckBig } from 'lucide-react'
import type { JSX } from 'react'

interface FormSuccessProps {
  message?: string
  userName?: string
}

const FormSuccess = ({ message, userName }: FormSuccessProps): JSX.Element | null => {
  if (!message) return null

  return (
    <div
      role="status"
      className="flex flex-col gap-1 rounded-md bg-emerald-500/15 p-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
    >
      <div className="flex items-center gap-x-2">
        <CircleCheckBig className="h-4 w-4" />
        <span>{message}</span>
      </div>
      {userName && (
        <span className="text-xs font-normal text-emerald-700 dark:text-emerald-300">
          Bem-vindo, <span className="font-bold">{userName}</span>!
        </span>
      )}
    </div>
  )
}

export { FormSuccess }
