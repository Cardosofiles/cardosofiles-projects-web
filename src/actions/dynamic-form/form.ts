'use server'

import { db } from '@/lib/prisma-bd'
import { type ClienteFormData, clienteSchema } from '@/schemas'
import { getClientByCpfCnpj, getClientByEmail, getClientByNumber } from '@/services/client'

function parseDateToDateObj(dateStr: string): Date | null {
  // Espera "DD/MM/YYYY" ou "YYYY-MM-DD"
  if (!dateStr) return null
  if (dateStr.includes('/')) {
    const [day, month, year] = dateStr.split('/')
    if (!day || !month || !year) return null
    return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`)
  }
  // Se já está em formato YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(`${dateStr}T00:00:00Z`)
  }
  // fallback
  return new Date(dateStr)
}

export const formClientCreate = async (data: ClienteFormData) => {
  try {
    const validatedFields = clienteSchema.safeParse(data)

    if (!validatedFields.success) {
      console.log(validatedFields.error)
      return { error: 'Dados inválidos.' }
    }

    const { name, cpfCnpj, birthDate, email, phone, addresses } = validatedFields.data

    // Normaliza o email e o cpfCnpj para evitar problemas de case/espacos
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedCpfCnpj = cpfCnpj.replace(/\D/g, '')

    // Verifica se já existe cliente com o mesmo email
    const existingClient = await getClientByEmail({ email: normalizedEmail })
    if (existingClient) {
      return {
        error: 'Já existe uma conta com este email.',
      }
    }

    // Verifica se já existe cliente com o mesmo CPF/CNPJ
    const existingCpfCnpj = await getClientByCpfCnpj({ cpfCnpj: normalizedCpfCnpj })
    if (existingCpfCnpj) {
      return {
        error: 'Já existe uma conta com este CPF/CNPJ.',
      }
    }

    const existingPhone = await getClientByNumber({ phone: phone })
    if (existingPhone) {
      return {
        error: 'Já existe uma conta com este telefone.',
      }
    }

    await db.client.create({
      data: {
        email: normalizedEmail,
        name,
        cpfCnpj: normalizedCpfCnpj,
        birthDate: parseDateToDateObj(birthDate) || new Date(),
        phone,
        addresses: { create: addresses },
      },
    })

    return { success: true }
  } catch (error: any) {
    // Trata erro de constraint única do Prisma
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('cpfCnpj')) {
        return { error: 'Já existe uma conta com este CPF/CNPJ.' }
      }
      if (error.meta?.target?.includes('email')) {
        return { error: 'Já existe uma conta com este email.' }
      }
      return { error: 'Já existe um registro com dados duplicados.' }
    }
    console.log(error)
    return { error: 'Erro ao criar cliente.' }
  }
}

export const formClientUpdate = async (id: string, data: ClienteFormData) => {
  try {
    const validatedFields = clienteSchema.safeParse(data)
    if (!validatedFields.success) {
      return { error: 'Dados inválidos.' }
    }

    const { name, cpfCnpj, birthDate, email, phone, addresses } = validatedFields.data

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedCpfCnpj = cpfCnpj.replace(/\D/g, '')

    await db.client.update({
      where: { id },
      data: {
        name,
        email: normalizedEmail,
        cpfCnpj: normalizedCpfCnpj,
        birthDate: birthDate ? new Date(birthDate) : undefined,
        phone,
        addresses: {
          deleteMany: {}, // remove todos os antigos
          create: addresses, // recria atualizados
        },
      },
    })

    return { success: true }
  } catch (error: any) {
    console.error(error)
    return { error: 'Erro ao atualizar cliente.' }
  }
}
