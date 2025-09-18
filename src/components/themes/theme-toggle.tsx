'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { JSX } from 'react'

import { Button } from '@/components/ui/button'

const ModeToggle = (): JSX.Element => {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button className="cursor-pointer" size="lg" onClick={toggleTheme} aria-label="Alternar tema">
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}

export { ModeToggle }
