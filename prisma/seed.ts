import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedData = [
  {
    name: 'João Silva Santos',
    cpfCnpj: '12345678901',
    email: 'joao.silva@gmail.com',
    phone: '11987654321',
    birthDate: new Date('1990-05-15'),
    addresses: [
      {
        cep: '01310100',
        street: 'Avenida Paulista',
        number: '1000',
        complement: 'Apto 101',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
      },
    ],
  },
  {
    name: 'Maria Oliveira Costa',
    cpfCnpj: '98765432100',
    email: 'maria.oliveira@outlook.com',
    phone: '21987654321',
    birthDate: new Date('1985-12-22'),
    addresses: [
      {
        cep: '22071900',
        street: 'Avenida Atlântica',
        number: '500',
        complement: null,
        neighborhood: 'Copacabana',
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
    ],
  },
  {
    name: 'Tech Solutions LTDA',
    cpfCnpj: '12345678000195',
    email: 'contato@techsolutions.com.br',
    phone: '1133334444',
    birthDate: new Date('2010-03-10'),
    addresses: [
      {
        cep: '04038001',
        street: 'Rua Tutóia',
        number: '1157',
        complement: 'Sala 203',
        neighborhood: 'Vila Mariana',
        city: 'São Paulo',
        state: 'SP',
      },
    ],
  },
]

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  for (const clientData of seedData) {
    const { addresses, ...client } = clientData

    const createdClient = await prisma.client.create({
      data: {
        ...client,
        addresses: {
          create: addresses,
        },
      },
      include: {
        addresses: true,
      },
    })

    console.log(`✅ Cliente criado: ${createdClient.name} (${createdClient.email})`)
  }

  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch(e => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
