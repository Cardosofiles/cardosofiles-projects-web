export const formatCpfCnpj = (value: string): string => {
  if (!value) return ''

  const digits = value.replace(/\D/g, '')

  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
}

export const formatCep = (value: string): string => {
  if (!value) return ''

  const digits = value.replace(/\D/g, '')
  return digits.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

export const formatPhone = (phone: string): string => {
  if (!phone) return ''

  // Remove todos os caracteres não numéricos
  const numbersOnly = phone.replace(/\D/g, '')

  // Aplica formatação baseada no tamanho
  if (numbersOnly.length === 10) {
    // (11) 1234-5678
    return numbersOnly.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (numbersOnly.length === 11) {
    // (11) 91234-5678
    return numbersOnly.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  return phone // Retorna original se não conseguir formatar
}

// Helper para normalizar telefone (apenas números)
export const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '')
}

export const formatDate = (date: string | Date | null): string => {
  if (!date) return 'N/A'

  try {
    let dateObj: Date

    if (typeof date === 'string') {
      // Se for string no formato ISO (do banco), criar sem conversão de timezone
      if (date.includes('T') || date.includes('-')) {
        // Formato ISO do banco: "1996-05-13T00:00:00.000Z"
        // Extrair apenas a parte da data para evitar problemas de timezone
        const datePart = date.split('T')[0] // "1996-05-13"
        const [year, month, day] = datePart.split('-').map(Number)
        dateObj = new Date(year, month - 1, day) // Criar data local
      } else {
        // Formato DD/MM/YYYY
        const [day, month, year] = date.split('/').map(Number)
        dateObj = new Date(year, month - 1, day)
      }
    } else {
      dateObj = new Date(date)
    }

    // Verificar se a data é válida
    if (isNaN(dateObj.getTime())) {
      return 'Data inválida'
    }

    // Formatar como DD/MM/YYYY usando métodos locais
    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear().toString()

    return `${day}/${month}/${year}`
  } catch (error) {
    console.error('Erro ao formatar data:', error)
    return 'Data inválida'
  }
}

// Função específica para converter data para o formato do input date (YYYY-MM-DD)
export const formatDateForInput = (value: string | Date): string => {
  if (!value) return ''

  let date: Date

  if (typeof value === 'string') {
    if (value.includes('/')) {
      // DD/MM/YYYY -> Date
      const [day, month, year] = value.split('/').map(Number)
      date = new Date(year, month - 1, day)
    } else {
      date = new Date(value)
    }
  } else {
    date = value
  }

  if (isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
