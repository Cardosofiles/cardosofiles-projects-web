export type Address = {
  id?: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  complement?: string
}

export type Client = {
  id?: string
  name: string
  cpfCnpj: string
  birthDate: string
  email: string
  phone: string
  addresses: Address[]
}
