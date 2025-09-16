import axios from 'axios'

export const fetchAddressByCep = async (cep: string) => {
  const sanitizedCep = cep.replace(/\D/g, '')
  if (sanitizedCep.length !== 8) throw new Error('CEP inválido')

  const { data } = await axios.get(`https://viacep.com.br/ws/${sanitizedCep}/json/`)
  if (data.erro) throw new Error('CEP não encontrado')

  return {
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  }
}
