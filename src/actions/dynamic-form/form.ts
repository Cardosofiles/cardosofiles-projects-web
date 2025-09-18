'use server'

import { db } from '@/lib/prisma-bd'
import { type ClienteFormData, clienteSchema } from '@/schemas'
import { getClientByCpfCnpj, getClientByEmail, getClientByNumber } from '@/services/client'
import { parseDateToDateObj } from '@/utils/formatters'

// Tipos para os retornos das actions
interface ActionResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

interface PrismaError extends Error {
  code?: string
  meta?: {
    target?: string[]
  }
}

// Converte "DD/MM/YYYY" ou "YYYY-MM-DD" para Date

// ✅ Criar cliente
export const formActionClientCreate = async (data: ClienteFormData): Promise<ActionResult> => {
  try {
    const validatedFields = clienteSchema.safeParse(data)

    if (!validatedFields.success) {
      console.log(validatedFields.error)
      return { success: false, error: 'Dados inválidos.' }
    }

    const { name, cpfCnpj, birthDate, email, phone, addresses } = validatedFields.data

    // Normaliza o email e o cpfCnpj para evitar problemas de case/espacos
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedCpfCnpj = cpfCnpj.replace(/\D/g, '')

    // Verifica se já existe cliente com o mesmo email
    const existingClient = await getClientByEmail({ email: normalizedEmail })
    if (existingClient) {
      return {
        success: false,
        error: 'Já existe uma conta com este email.',
      }
    }

    // Verifica se já existe cliente com o mesmo CPF/CNPJ
    const existingCpfCnpj = await getClientByCpfCnpj({ cpfCnpj: normalizedCpfCnpj })
    if (existingCpfCnpj) {
      return {
        success: false,
        error: 'Já existe uma conta com este CPF/CNPJ.',
      }
    }

    const existingPhone = await getClientByNumber({ phone: phone })
    if (existingPhone) {
      return {
        success: false,
        error: 'Já existe uma conta com este telefone.',
      }
    }

    // Converter data corretamente para evitar problemas de timezone
    const parsedBirthDate = parseDateToDateObj(birthDate)
    if (!parsedBirthDate) {
      return { success: false, error: 'Data de nascimento inválida.' }
    }

    await db.client.create({
      data: {
        email: normalizedEmail,
        name,
        cpfCnpj: normalizedCpfCnpj,
        birthDate: parsedBirthDate, // Usar a data corretamente parseada
        phone,
        addresses: { create: addresses },
      },
    })

    return { success: true }
  } catch (error) {
    const prismaError = error as PrismaError

    // Trata erro de constraint única do Prisma
    if (prismaError.code === 'P2002') {
      if (prismaError.meta?.target?.includes('cpfCnpj')) {
        return { success: false, error: 'Já existe uma conta com este CPF/CNPJ.' }
      }
      if (prismaError.meta?.target?.includes('email')) {
        return { success: false, error: 'Já existe uma conta com este email.' }
      }
      return { success: false, error: 'Já existe um registro com dados duplicados.' }
    }

    console.log(error)
    return { success: false, error: 'Erro ao criar cliente.' }
  }
}

// ✅ Ler todos os clientes
export const formActionGetClient = async (): Promise<ActionResult> => {
  try {
    const clients = await db.client.findMany({
      include: { addresses: true },
      orderBy: { createdAt: 'desc' },
    })

    return { success: true, data: clients }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Ler cliente por ID
export const formActionGetClientById = async (id: string): Promise<ActionResult> => {
  try {
    const client = await db.client.findUnique({
      where: { id },
      include: { addresses: true },
    })

    if (!client) {
      return { success: false, error: 'Cliente não encontrado' }
    }

    return { success: true, data: client }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Editar cliente
export const formActionUpdateClient = async (
  id: string,
  data: ClienteFormData
): Promise<ActionResult> => {
  try {
    // Converter data corretamente
    const parsedBirthDate = parseDateToDateObj(data.birthDate)
    if (!parsedBirthDate) {
      return { success: false, error: 'Data de nascimento inválida.' }
    }

    const updated = await db.client.update({
      where: { id },
      data: {
        name: data.name,
        cpfCnpj: data.cpfCnpj.replace(/\D/g, ''), // Normalizar CPF/CNPJ também no update
        birthDate: parsedBirthDate, // Usar a data corretamente parseada
        email: data.email.trim().toLowerCase(), // Normalizar email também no update
        phone: data.phone,
        addresses: {
          deleteMany: {},
          create: data.addresses.map(addr => ({
            cep: addr.cep,
            street: addr.street,
            city: addr.city,
            state: addr.state,
            number: addr.number,
            complement: addr.complement,
            neighborhood: addr.neighborhood,
          })),
        },
      },
      include: { addresses: true },
    })

    return { success: true, data: updated }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}

// ✅ Deletar cliente
export const formActionDeleteClient = async (id: string): Promise<ActionResult> => {
  try {
    await db.client.delete({ where: { id } })

    return { success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return { success: false, error: errorMessage }
  }
}
