export const formatCpfCnpj = (value: string): string => {
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

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11) {
    // Celular: (00) 90000-0000
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  } else if (digits.length === 10) {
    // Fixo: (00) 0000-0000
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return value
}

export const formatCep = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  return digits.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

// Função para converter string de data para objeto Date (corrigida)
export const parseDateToDateObj = (dateStr: string): Date | null => {
  if (!dateStr) return null

  // Se é formato DD/MM/YYYY
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/')
    if (!day || !month || !year) return null

    // Criar data local sem timezone issues
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date
  }

  // Se já está em formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split('-')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  // fallback
  return new Date(dateStr)
}

// Função melhorada para formatar data (evita problemas de timezone)
export const formatDate = (value: string | Date): string => {
  if (!value) return ''

  let date: Date

  if (typeof value === 'string') {
    // Se vier do banco como string ISO, converter corretamente
    if (value.includes('T')) {
      date = new Date(value)
    } else {
      date = new Date(value)
    }
  } else {
    date = value
  }

  if (isNaN(date.getTime())) return ''

  // Usar getDate(), getMonth() e getFullYear() para evitar problemas de timezone
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

// Função específica para converter data para o formato do input date (YYYY-MM-DD)
export const formatDateForInput = (value: string | Date): string => {
  if (!value) return ''

  const date = typeof value === 'string' ? new Date(value) : value

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
