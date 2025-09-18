import type { SearchFilters } from '@/components/dynamic-form/table/table-search'
import type { Client } from '@/types'
import { useMemo, useState } from 'react'

export const useClientSearch = (clients: Client[] = []) => {
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null)

  const filteredClients = useMemo(() => {
    if (!searchFilters || !searchFilters.searchTerm) {
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

        case 'all':
        default:
          const cleanCpfCnpj2 = client.cpfCnpj.replace(/\D/g, '')
          const cleanSearchTerm2 = term.replace(/\D/g, '')

          return (
            client.name.toLowerCase().includes(term) ||
            client.email.toLowerCase().includes(term) ||
            cleanCpfCnpj2.includes(cleanSearchTerm2) ||
            client.cpfCnpj.toLowerCase().includes(term)
          )
      }
    })
  }, [clients, searchFilters])

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters)
  }

  const handleClearSearch = () => {
    setSearchFilters(null)
  }

  const isSearchActive = !!searchFilters?.searchTerm

  return {
    filteredClients,
    handleSearch,
    handleClearSearch,
    isSearchActive,
    searchFilters,
  }
}
