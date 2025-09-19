'use server'

import { db } from '@/lib/prisma-bd'
import type { ClienteFormData } from '@/schemas'
import type { ActionResult } from '@/types'
import { normalizePhone } from '@/utils/formatters'

// Helper para converter data DD/MM/YYYY para Date sem problemas de timezone
const parseBirthDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/').map(Number)
  // Criar data no timezone local (meio-dia para evitar problemas de DST)
  return new Date(year, month - 1, day, 12, 0, 0, 0)
}

// Helper para converter Date para DD/MM/YYYY
const formatBirthDateForForm = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

// ✅ Ler todos os clientes
export const formActionGetClient = async (): Promise<ActionResult> => {
  try {
    console.log('🔍 Buscando clientes no banco de dados...')

    const clients = await db.client.findMany({
      include: { addresses: true },
      orderBy: { createdAt: 'desc' },
    })

    console.log(`✅ ${clients.length} clientes encontrados`)
    return { success: true, data: clients }
  } catch (error) {
    console.error('❌ Erro ao buscar clientes:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Criar cliente
export const formActionCreateClient = async (data: ClienteFormData): Promise<ActionResult> => {
  try {
    console.log('📝 Criando cliente:', data.name)

    // Normalizar telefone para armazenamento
    const normalizedPhone = normalizePhone(data.phone)

    // Verificar se já existe cliente com mesmo email
    const existingEmail = await db.client.findUnique({
      where: { email: data.email },
    })

    if (existingEmail) {
      return { success: false, error: 'Email já está em uso' }
    }

    // Verificar se já existe cliente com mesmo CPF/CNPJ
    const existingCpfCnpj = await db.client.findUnique({
      where: { cpfCnpj: data.cpfCnpj },
    })

    if (existingCpfCnpj) {
      return { success: false, error: 'CPF/CNPJ já está em uso' }
    }

    // Verificar se já existe cliente com mesmo telefone
    const existingPhone = await db.client.findUnique({
      where: { phone: normalizedPhone },
    })

    if (existingPhone) {
      return { success: false, error: 'Telefone já está em uso' }
    }

    // Converter data de nascimento corretamente
    const birthDate = parseBirthDate(data.birthDate)

    const client = await db.client.create({
      data: {
        name: data.name,
        cpfCnpj: data.cpfCnpj,
        birthDate,
        email: data.email,
        phone: normalizedPhone,
        addresses: {
          create: data.addresses,
        },
      },
      include: { addresses: true },
    })

    console.log('✅ Cliente criado com sucesso:', client.id)
    return { success: true, data: client }
  } catch (error) {
    console.error('❌ Erro ao criar cliente:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Atualizar cliente
export const formActionUpdateClient = async (
  id: string,
  data: ClienteFormData
): Promise<ActionResult> => {
  try {
    console.log('📝 Atualizando cliente:', id)

    // Verificar se o cliente existe
    const existingClient = await db.client.findUnique({
      where: { id },
      include: { addresses: true },
    })

    if (!existingClient) {
      return { success: false, error: 'Cliente não encontrado' }
    }

    // Normalizar telefone para verificação
    const normalizedPhone = normalizePhone(data.phone)

    // Verificar duplicatas (excluindo o cliente atual)
    const [emailCheck, cpfCnpjCheck, phoneCheck] = await Promise.all([
      db.client.findFirst({
        where: { email: data.email, NOT: { id } },
      }),
      db.client.findFirst({
        where: { cpfCnpj: data.cpfCnpj, NOT: { id } },
      }),
      db.client.findFirst({
        where: { phone: normalizedPhone, NOT: { id } },
      }),
    ])

    if (emailCheck) {
      return { success: false, error: 'Email já está em uso por outro cliente' }
    }

    if (cpfCnpjCheck) {
      return { success: false, error: 'CPF/CNPJ já está em uso por outro cliente' }
    }

    if (phoneCheck) {
      return { success: false, error: 'Telefone já está em uso por outro cliente' }
    }

    // Converter data de nascimento corretamente
    const birthDate = parseBirthDate(data.birthDate)

    // Atualizar cliente usando transação
    const client = await db.$transaction(async tx => {
      // Deletar endereços existentes
      await tx.address.deleteMany({
        where: { clientId: id },
      })

      // Atualizar cliente com novos dados
      return await tx.client.update({
        where: { id },
        data: {
          name: data.name,
          cpfCnpj: data.cpfCnpj,
          birthDate,
          email: data.email,
          phone: normalizedPhone,
          addresses: {
            create: data.addresses,
          },
        },
        include: { addresses: true },
      })
    })

    console.log('✅ Cliente atualizado com sucesso:', client.id)
    return { success: true, data: client }
  } catch (error) {
    console.error('❌ Erro ao atualizar cliente:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Buscar cliente por ID (com formatação correta da data)
export const formActionGetClientById = async (id: string): Promise<ActionResult> => {
  try {
    console.log('🔍 Buscando cliente por ID:', id)

    const client = await db.client.findUnique({
      where: { id },
      include: { addresses: true },
    })

    if (!client) {
      return { success: false, error: 'Cliente não encontrado' }
    }

    // Formatar data para o formulário
    const formattedClient = {
      ...client,
      birthDate: formatBirthDateForForm(client.birthDate),
    }

    console.log('✅ Cliente encontrado:', client.id)
    return { success: true, data: formattedClient }
  } catch (error) {
    console.error('❌ Erro ao buscar cliente:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Deletar cliente
export const formActionDeleteClient = async (id: string): Promise<ActionResult> => {
  try {
    console.log('🗑️ Deletando cliente:', id)

    const client = await db.client.delete({
      where: { id },
    })

    console.log('✅ Cliente deletado com sucesso:', client.id)
    return { success: true, data: client }
  } catch (error) {
    console.error('❌ Erro ao deletar cliente:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}
