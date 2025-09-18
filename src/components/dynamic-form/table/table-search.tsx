'use client'

import { Search, X } from 'lucide-react'
import { useCallback, useState, type JSX } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ClientSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
}

export interface SearchFilters {
  searchTerm: string
  searchType: 'all' | 'name' | 'cpfCnpj' | 'email'
}

const ClientSearch = ({ onSearch, onClear }: ClientSearchProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<SearchFilters['searchType']>('all')

  const handleSearch = useCallback(() => {
    if (searchTerm.trim()) {
      onSearch({
        searchTerm: searchTerm.trim(),
        searchType,
      })
    }
  }, [searchTerm, searchType, onSearch])

  const handleClear = useCallback(() => {
    setSearchTerm('')
    setSearchType('all')
    onClear()
  }, [onClear])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          {/* Campo de busca */}
          <div className="flex-1">
            <Label htmlFor="search-input" className="text-sm font-medium">
              Buscar cliente
            </Label>
            <div className="relative mt-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                id="search-input"
                type="text"
                placeholder="Digite o nome, CPF/CNPJ ou email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtro de tipo */}
          <div className="w-full md:w-48">
            <Label htmlFor="search-type" className="text-sm font-medium">
              Buscar por
            </Label>
            <Select
              value={searchType}
              onValueChange={(value: SearchFilters['searchType']) => setSearchType(value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os campos</SelectItem>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="cpfCnpj">CPF/CNPJ</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botões */}
          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className="flex-1 md:flex-none"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>

            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!searchTerm}
              className="flex-1 md:flex-none"
            >
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
          </div>
        </div>

        {/* Indicador de busca ativa */}
        {searchTerm && (
          <div className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
            <Search className="h-3 w-3" />
            <span>
              Buscando por: <strong>"{searchTerm}"</strong>
              {searchType !== 'all' && (
                <span className="ml-1">
                  em{' '}
                  {searchType === 'name' ? 'nome' : searchType === 'cpfCnpj' ? 'CPF/CNPJ' : 'email'}
                </span>
              )}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ClientSearch }
