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

export const formatDate = (value: string | Date): string => {
  const date = typeof value === 'string' ? new Date(value) : value

  if (isNaN(date.getTime())) return ''

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
