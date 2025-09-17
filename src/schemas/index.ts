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

export const clienteSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  birthDate: z.string().min(10, 'Data inválida'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  addresses: z.array(addressSchema).min(1, 'Informe ao menos um endereço'),
})

export type ClienteFormData = z.infer<typeof clienteSchema>
