import type { JSX } from 'react'

import { ThemeSelector } from '@/components/themes/theme-selector'
import { ModeToggle } from '@/components/themes/theme-toggle'

const Header = (): JSX.Element => {
  return (
    <header className="bg-background/10 fixed top-0 z-50 w-full border-b border-white/10 shadow-md backdrop-blur-md transition-all duration-300">
      <div className="mx-auto border-x border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="hidden text-4xl font-bold text-zinc-950 drop-shadow-md lg:block dark:text-white">
            LinkedIn<span className="text-primary">Publications</span>
          </h1>

          <div className="flex items-center">
            <div className="mr-3 flex items-center gap-2 text-xs sm:text-sm">
              <div className="scale-90 sm:scale-100">
                <ThemeSelector />
              </div>
              <div className="scale-90 sm:scale-100">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export { Header }
