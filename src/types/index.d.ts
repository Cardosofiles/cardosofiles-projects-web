export type Address = {
  id?: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  complement?: string | null
  clientId?: string
}

export type Client = {
  id?: string
  name: string
  cpfCnpj: string
  birthDate: string | Date
  email: string
  phone: string
  addresses: Address[]
  createdAt?: Date
  updatedAt?: Date
}
