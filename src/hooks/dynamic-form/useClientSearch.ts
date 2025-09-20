import { useMemo, useState } from 'react'

import type { SearchFilters } from '@/components/dynamic-form/table/table-search'

import type { Client } from '@/types'

export const useClientSearch = (clients: Client[] = []) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null)

  const filteredClients = useMemo(() => {
    // Se não há filtros ou é "Todos os registros", retorna todos
    if (!searchFilters || searchFilters.searchType === 'all' || !searchFilters.searchTerm) {
      return clients
    }

    const { searchTerm, searchType } = searchFilters
    const term = searchTerm.toLowerCase()

    return clients.filter(client => {
      switch (searchType) {
        case 'name':
          return client.name.toLowerCase().includes(term)

        case 'cpfCnpj':
          // Remove formatação para busca
          const cleanCpfCnpj = client.cpfCnpj.replace(/\D/g, '')
          const cleanSearchTerm = term.replace(/\D/g, '')
          return (
            cleanCpfCnpj.includes(cleanSearchTerm) || client.cpfCnpj.toLowerCase().includes(term)
          )

        case 'email':
          return client.email.toLowerCase().includes(term)

        default:
          return true
      }
    })
  }, [clients, searchFilters])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
  }

  const handleClearSearch = () => {
    setSearchFilters(null)
  }

  // Considera busca ativa apenas quando há termo de busca E não é "all"
  const isSearchActive = !!(searchFilters?.searchTerm && searchFilters.searchType !== 'all')

  return {
    filteredClients,
    handleSearch,
    handleClearSearch,
    isSearchActive,
    searchFilters,
  }
}
