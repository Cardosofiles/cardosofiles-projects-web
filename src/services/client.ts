import { db } from '@/lib/prisma-bd'

interface GetClientByEmailProps {
  email: string
}

interface GetClientByUniqueFieldProps {
  cpfCnpj: string
}

interface GetClientByPhoneProps {
  phone: string
}

export const getClientByEmail = async ({ email }: GetClientByEmailProps) => {
  try {
    const user = await db.client.findUnique({
      where: { email },
    })

    return user
  } catch {
    return null
  }
}

export async function getClientByCpfCnpj({ cpfCnpj }: GetClientByUniqueFieldProps) {
  try {
    const user = await db.client.findUnique({
      where: { cpfCnpj },
    })

    return user
  } catch {
    return null
  }
}

export async function getClientByNumber({ phone }: GetClientByPhoneProps) {
  try {
    const user = await db.client.findFirst({
      where: { phone },
    })

    return user
  } catch {
    return null
  }
}
