'use client'

import type { JSX } from 'react'

import type { Client } from '@/types'

interface SearchResultsProps {
  isSearchActive: boolean
  filteredClients: Client[]
  totalClients?: number
}

const SearchResults = ({
  isSearchActive,
  filteredClients,
  totalClients,
}: SearchResultsProps): JSX.Element | null => {
  if (!isSearchActive || !filteredClients || filteredClients.length === 0) {
    return null
  }

  return (
    <div className="text-muted-foreground text-sm">
      <span>
        {filteredClients.length} cliente{filteredClients.length !== 1 ? 's' : ''} encontrado
        {filteredClients.length !== 1 ? 's' : ''}
        {totalClients && ` de ${totalClients} total`}
      </span>
    </div>
  )
}

export { SearchResults }
