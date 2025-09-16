'use client'

import type { JSX } from 'react'

import { useThemeConfig } from '@/components/themes/theme-active'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const DEFAULT_THEMES = [
  {
    name: 'Cinza',
    value: 'default',
  },
  {
    name: 'Azul',
    value: 'blue',
  },
  {
    name: 'Verde',
    value: 'green',
  },
  {
    name: 'Laranja',
    value: 'amber',
  },
  {
    name: 'Rosa',
    value: 'pink',
  },
  {
    name: 'Lilás',
    value: 'purple',
  },
]

const SCALED_THEMES = [
  {
    name: 'Padrão',
    value: 'default-scaled',
  },
  {
    name: 'Pequeno',
    value: 'blue-scaled',
  },
]

const MONO_THEMES = [
  {
    name: 'Mono',
    value: 'mono-scaled',
  },
]

const ThemeSelector = (): JSX.Element => {
  const { activeTheme, setActiveTheme } = useThemeConfig()

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-selector" className="sr-only">
        Theme
      </Label>

      <Select value={activeTheme} onValueChange={setActiveTheme}>
        <SelectTrigger
          id="theme-selector"
          size="sm"
          className="bg-primary/20 dark:bg-primary/30 hover:bg-primary/90 dark:hover:bg-primary/80 justify-start hover:text-zinc-200 *:data-[slot=select-value]:w-12"
        >
          <span className="text-muted-foreground hidden sm:block">Selecione o tema:</span>
          <span className="text-muted-foreground block sm:hidden">Tema:</span>
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>

        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Cores</SelectLabel>
            {DEFAULT_THEMES.map(theme => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectLabel>Tamanho</SelectLabel>
            {SCALED_THEMES.map(theme => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>

          <SelectGroup>
            <SelectLabel>Monospaced</SelectLabel>
            {MONO_THEMES.map(theme => (
              <SelectItem key={theme.name} value={theme.value}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export { ThemeSelector }
