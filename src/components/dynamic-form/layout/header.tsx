'use client'

import { Home, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const HeaderDynamicForm = (): JSX.Element => {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Página inicial',
    },
    {
      href: '/dynamic-form/create-client',
      label: 'Cadastro',
      icon: Plus,
      description: 'Novo cliente',
    },
    {
      href: '/dynamic-form',
      label: 'Lista',
      icon: Users,
      description: 'Gerenciar clientes',
    },
  ]

  return (
    <Card className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          <nav className="flex items-center space-x-1">
            {navItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className="flex cursor-pointer items-center"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      <Separator />
    </Card>
  )
}

export { HeaderDynamicForm }
