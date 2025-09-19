import { z } from 'zod'

export const addressSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(2, 'Rua obrigatória'),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  number: z.string().min(1, 'Número obrigatório'),
  complement: z.string().optional(),
})

// Validação customizada para data DD/MM/YYYY
const dateValidation = z.string().refine(
  date => {
    if (!date) return false

    // Verificar formato DD/MM/YYYY
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(date)) return false

    // Verificar se é uma data válida
    const [day, month, year] = date.split('/').map(Number)
    const dateObj = new Date(year, month - 1, day)

    return (
      dateObj.getDate() === day &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getFullYear() === year
    )
  },
  {
    message: 'Data deve estar no formato DD/MM/YYYY e ser válida',
  }
)

// Validação melhorada para telefone
const phoneValidation = z.string().refine(
  phone => {
    if (!phone) return false

    // Remove todos os caracteres não numéricos
    const numbersOnly = phone.replace(/\D/g, '')

    // Aceita telefones com 10 ou 11 dígitos (com ou sem DDD)
    // 10 dígitos: (11) 1234-5678 ou 1133334444
    // 11 dígitos: (11) 91234-5678 ou 11912345678
    return numbersOnly.length === 10 || numbersOnly.length === 11
  },
  {
    message: 'Telefone deve ter 10 ou 11 dígitos',
  }
)

export const clienteSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  birthDate: dateValidation, // Usar validação customizada
  email: z.string().email('Email inválido'),
  phone: phoneValidation, // Usar validação melhorada
  addresses: z.array(addressSchema).min(1, 'Informe ao menos um endereço'),
})

export type ClienteFormData = z.infer<typeof clienteSchema>
