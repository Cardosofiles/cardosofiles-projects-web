'use client'

import { Mail } from 'lucide-react'
import { useRef, useState, type JSX } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface EmailProvider {
  name: string
  domain: string
  icon: string
}

interface EmailProviderSelectorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  providers?: EmailProvider[]
  id?: string
  required?: boolean
  disabled?: boolean
}

const defaultProviders: EmailProvider[] = [
  { name: 'Gmail', domain: '@gmail.com', icon: '📧' },
  { name: 'Outlook', domain: '@outlook.com', icon: '📨' },
  { name: 'Yahoo', domain: '@yahoo.com', icon: '📬' },
  { name: 'Hotmail', domain: '@hotmail.com', icon: '📮' },
  { name: 'iCloud', domain: '@icloud.com', icon: '📪' },
]

const EmailProviderSelector = ({
  value,
  onChange,
  placeholder = 'Digite seu email',
  className = '',
  providers = defaultProviders,
  id,
  required,
  disabled = false,
  ...props
}: EmailProviderSelectorProps): JSX.Element => {
  const [showProviders, setShowProviders] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [popoverFocused, setPopoverFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const handleEmailChange = (newValue: string) => {
    if (disabled) return
    onChange(newValue)
    // Mostra o popover quando há texto no campo e não há @
    const shouldShow = newValue.length > 0 && !newValue.includes('@')
    setShowProviders(shouldShow)
    setSelectedIndex(0) // Reset selection when typing
  }

  const selectProvider = (domain: string) => {
    if (disabled) return
    const emailPart = value.split('@')[0]
    onChange(emailPart + domain)
    setShowProviders(false)
    setSelectedIndex(0)
    // Return focus to input
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || !showProviders) return

    switch (e.key) {
      case 'Tab':
        if (!e.shiftKey) {
          e.preventDefault()
          // Tab entra no popover
          popoverRef.current?.focus()
        }
        break
      case 'Escape':
        e.preventDefault()
        setShowProviders(false)
        inputRef.current?.focus()
        break
    }
  }

  const handlePopoverKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        e.stopPropagation()
        setSelectedIndex(prev => (prev < providers.length - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        e.stopPropagation()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : providers.length - 1))
        break
      case 'Enter':
        e.preventDefault()
        e.stopPropagation()
        selectProvider(providers[selectedIndex].domain)
        break
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        setShowProviders(false)
        inputRef.current?.focus()
        break
      case 'Tab':
        if (e.shiftKey) {
          e.preventDefault()
          // Shift+Tab volta para o input
          inputRef.current?.focus()
        }
        break
    }
  }

  return (
    <Popover open={showProviders && !disabled} onOpenChange={setShowProviders}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            ref={inputRef}
            id={id}
            type="email"
            placeholder={placeholder}
            value={value}
            onChange={e => handleEmailChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className={className}
            required={required}
            disabled={disabled}
            {...props}
          />
          {value.length > 0 && !value.includes('@') && !disabled && (
            <Mail className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          'mt-1.5 w-[302px] p-3 lg:w-[462px]',
          // light styles
          'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
          // dark styles
          'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(25,255,255,.1)]'
        )}
        align="start"
        side="bottom"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <div
          ref={popoverRef}
          className="focus:ring-ring space-y-2 rounded-md outline-none focus:ring-2 focus:ring-offset-2"
          tabIndex={0}
          onKeyDown={handlePopoverKeyDown}
          onFocus={() => setPopoverFocused(true)}
          onBlur={() => setPopoverFocused(false)}
        >
          <div className="flex items-center justify-between px-1 py-1">
            <p className="text-muted-foreground text-xs font-medium">
              Selecione um provedor de email:
            </p>
          </div>
          <div className="space-y-1">
            {providers.map((provider, index) => (
              <Button
                key={provider.domain}
                variant="ghost"
                className={`h-10 w-full justify-start gap-3 px-2 transition-colors ${
                  index === selectedIndex
                    ? 'bg-accent/50 text-accent-foreground border-primary/50 border-2'
                    : 'hover:bg-accent/50'
                }`}
                onMouseDown={e => e.preventDefault()}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => selectProvider(provider.domain)}
                disabled={disabled}
              >
                <span className="text-base">{provider.icon}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{provider.name}</span>
                  <span className="text-muted-foreground max-w-[300px] truncate text-xs">
                    {value}
                    {provider.domain}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { EmailProviderSelector }
