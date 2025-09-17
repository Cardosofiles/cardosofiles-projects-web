# Cardoso Files - Dynamic Form Project

<div align="center">
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/tailwind_css.png" alt="Tailwind CSS" title="Tailwind CSS"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png" alt="React" title="React"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/typescript.png" alt="TypeScript" title="TypeScript"/></code>
	<code><img width="50" src="https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/next_js.png" alt="Next.js" title="Next.js"/></code>
</div>

## 📋 Visão Geral

Este projeto é uma aplicação web completa de gerenciamento de clientes, construída com Next.js 15, React 19 e TypeScript. A aplicação implementa um sistema CRUD (Create, Read, Update, Delete) com formulários dinâmicos, validação robusta e interface moderna usando Shadcn/UI.

## 🚀 Tecnologias Utilizadas

### **Core Framework & Runtime**

- **Next.js 15.5.3** - Framework React com SSR/SSG
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **TypeScript 5** - Superset do JavaScript com tipagem estática

### **Formulários & Validação**

- **React Hook Form 7.62.0** - Gerenciamento de formulários performático
- **@hookform/resolvers 5.2.2** - Integração com bibliotecas de validação
- **Zod 3.25.76** - Schema validation e type inference

### **Banco de Dados & ORM**

- **Prisma 6.16.1** - ORM moderno para TypeScript
- **@prisma/client 6.16.1** - Cliente gerado pelo Prisma
- **PostgreSQL** - Banco de dados relacional (Neon.tech)

### **Estado & Cache**

- **TanStack Query 5.87.4** - Gerenciamento de estado servidor/cache

### **UI & Styling**

- **Tailwind CSS 4** - Framework CSS utility-first
- **Shadcn/UI** - Componentes UI baseados em Radix UI
- **Radix UI** - Primitivos acessíveis para React
- **Lucide React** - Ícones SVG otimizados
- **Class Variance Authority** - Utilitário para classes condicionais

### **HTTP Client**

- **Axios 1.12.2** - Cliente HTTP para APIs

### **Ferramentas de Desenvolvimento**

- **ESLint 9** - Linter para qualidade de código
- **Prettier** - Formatador de código
- **Turbopack** - Bundler de alta performance

## 🏗️ Arquitetura do Projeto

### **1. Estrutura de Diretórios**

```
src/
├── actions/dynamic-form/     # Server Actions para operações CRUD
├── components/
│   ├── dynamic-form/form/    # Componentes do formulário
│   ├── dynamic-form/table/   # Componente da tabela CRUD
│   ├── ui/                   # Componentes base do Shadcn/UI
│   └── ux/                   # Componentes de experiência do usuário
├── lib/                      # Configurações e utilitários
├── providers/                # Providers React (TanStack Query)
├── schemas/                  # Schemas Zod para validação
├── services/                 # Serviços de dados
├── types/                    # Definições de tipos TypeScript
└── utils/                    # Funções utilitárias
```

## 📝 Implementação Detalhada

### **1. Schema de Validação (Zod)**

**Arquivo:** `src/schemas/index.ts`

```typescript
// Schema para endereços
export const addressSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(2, 'Rua obrigatória'),
  neighborhood: z.string().min(2, 'Bairro obrigatório'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().min(2, 'Estado obrigatório'),
  number: z.string().min(1, 'Número obrigatório'),
  complement: z.string().optional(), // Campo opcional
})

// Schema principal do cliente
export const clienteSchema = z.object({
  name: z.string().min(3, 'Nome obrigatório'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido'),
  birthDate: z.string().min(10, 'Data inválida'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  addresses: z.array(addressSchema).min(1, 'Informe ao menos um endereço'),
})
```

**Decisões Técnicas:**

- **Zod** foi escolhido por sua integração perfeita com TypeScript
- **Validação granular** com mensagens específicas em português
- **Type inference** automática para manter consistência entre frontend e backend

### **2. Tipagens TypeScript**

**Arquivo:** `src/types/index.d.ts`

```typescript
export type Address = {
  id?: string
  cep: string
  street: string
  neighborhood: string
  city: string
  state: string
  number: string
  complement?: string | null // Compatível com Prisma (null) e Zod (undefined)
  clientId?: string
}

export type Client = {
  id?: string
  name: string
  cpfCnpj: string
  birthDate: string | Date // Flexível para diferentes contextos
  email: string
  phone: string
  addresses: Address[]
  createdAt?: Date
  updatedAt?: Date
}
```

**Decisões Técnicas:**

- **Union types** (`string | Date`) para flexibilidade entre frontend/backend
- **Optional properties** para compatibilidade com diferentes estados da aplicação
- **Null vs Undefined** tratados adequadamente para integração Prisma

### **3. Server Actions (Next.js 15)**

**Arquivo:** `src/actions/dynamic-form/form.ts`

Implementação completa de operações CRUD usando Server Actions:

#### **Create Operation**

```typescript
export const formActionClientCreate = async (data: ClienteFormData) => {
  // 1. Validação com Zod
  const validatedFields = clienteSchema.safeParse(data)

  // 2. Verificação de duplicatas (email, CPF, telefone)
  const existingClient = await getClientByEmail({ email: normalizedEmail })

  // 3. Normalização de dados
  const normalizedCpfCnpj = cpfCnpj.replace(/\D/g, '')

  // 4. Criação no banco com transação implícita
  await db.client.create({
    data: {
      // ... dados normalizados
      addresses: { create: addresses }, // Relação aninhada
    },
  })
}
```

#### **Read Operations**

```typescript
// Buscar todos os clientes
export const formActionGetClient = async () => {
  const clients = await db.client.findMany({
    include: { addresses: true }, // Eager loading
    orderBy: { createdAt: 'desc' },
  })
}

// Buscar cliente específico
export const formActionGetClientById = async (id: string) => {
  const client = await db.client.findUnique({
    where: { id },
    include: { addresses: true },
  })
}
```

**Decisões Técnicas:**

- **Server Actions** para operações server-side nativas do Next.js
- **Validação dupla**: Zod no frontend + verificações de negócio no backend
- **Normalização de dados** (CPF sem máscara, email lowercase)
- **Tratamento de erros** padronizado com tipos de retorno consistentes

### **4. Componentes de Formulário**

#### **EmailField com Autocompletar**

**Arquivo:** `src/components/ux/email-input.tsx`

```typescript
const EmailProviderSelector = ({ value, onChange, ...props }) => {
  const [showProviders, setShowProviders] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Mostra sugestões quando não há @ no email
  const shouldShow = value.length > 0 && !value.includes('@')

  // Navegação por teclado (Tab, setas, Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Implementação de navegação por teclado
  }
}
```

**Features Implementadas:**

- **Autocompletar inteligente** com provedores populares
- **Navegação por teclado** (Tab, setas, Enter)
- **Acessibilidade** completa com ARIA
- **UX otimizada** com foco automático

#### **DocsField com Máscara**

**Arquivo:** `src/components/dynamic-form/form/docs-field.tsx`

```typescript
const formatDocs = (value: string): string => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
}
```

#### **AddressesField com API de CEP**

**Arquivo:** `src/components/dynamic-form/form/addresses-field.tsx`

```typescript
const AddressesField = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  })

  const cepMutation = useMutation({
    mutationFn: async ({ cep, index }) => {
      const data = await fetchAddressByCep(cep)
      return { data, index }
    },
    onSuccess: result => {
      // Preenche automaticamente os campos de endereço
      setValue(`addresses.${result.index}.street`, result.data.street)
      setValue(`addresses.${result.index}.city`, result.data.city)
      setValue(`addresses.${result.index}.state`, result.data.state)
    },
  })
}
```

**Features Implementadas:**

- **Array dinâmico** de endereços com useFieldArray
- **Preenchimento automático** via API de CEP
- **Validação em tempo real** com feedback visual
- **Responsividade** para diferentes tamanhos de tela

### **5. Tabela CRUD Completa**

**Arquivo:** `src/components/dynamic-form/table/index.tsx`

#### **Gerenciamento de Estado**

```typescript
const TableListClient = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // TanStack Query para cache otimizado
  const { data, isLoading, isError } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await formActionGetClient()
      return res.data as Client[]
    },
  })
}
```

#### **Operações CRUD**

```typescript
// Mutação unificada para Create/Update
const updateMutation = useMutation({
  mutationFn: async (data: ClienteFormData) => {
    if (isCreating) {
      return await formActionClientCreate(data)
    } else if (selectedClient?.id) {
      return await formActionUpdateClient(selectedClient.id, data)
    }
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] })
    // Reset do estado
  },
})
```

**Decisões Técnicas:**

- **TanStack Query** para cache inteligente e sincronização
- **Modal unificado** para criação e edição
- **Confirmação de exclusão** com modal dedicado
- **Formatação de dados** apenas na camada de apresentação

### **6. Utilitários de Formatação**

**Arquivo:** `src/utils/formatters.ts`

```typescript
export const formatCpfCnpj = (value: string): string => {
  const digits = value.replace(/\D/g, '')

  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
}

export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11) {
    // Celular: (00) 90000-0000
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
  } else if (digits.length === 10) {
    // Fixo: (00) 0000-0000
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
  }

  return value
}
```

**Princípios Aplicados:**

- **Dados limpos no banco** (apenas números)
- **Formatação na apresentação** (máscaras visuais)
- **Funções puras** para facilitar testes
- **Reutilização** em diferentes componentes

### **7. Configuração do Prisma**

**Arquivo:** `src/lib/prisma-bd.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export { db }
```

**Decisões Técnicas:**

- **Instância simples** adequada para ambientes serverless (Vercel)
- **Sem pool global** para evitar problemas em produção
- **Nome descritivo** (`db`) para clareza no código

### **8. Configuração TanStack Query**

**Arquivo:** `src/providers/tanstack-query.tsx`

```typescript
const TanstackQueryProvider = ({ children }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 minuto
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
```

**Configurações Otimizadas:**

- **Cache de 1 minuto** para dados de clientes
- **Sem refetch automático** no foco da janela
- **Retry limitado** para melhor UX

## 🎯 Boas Práticas Implementadas

### **1. Arquitetura Limpa**

- **Separação de responsabilidades** clara entre camadas
- **Server Actions** para lógica de negócio
- **Componentes reutilizáveis** e testáveis
- **Tipagem forte** em toda aplicação

### **2. Performance**

- **TanStack Query** para cache eficiente
- **React Hook Form** para formulários performáticos
- **Lazy loading** de componentes quando necessário
- **Otimização de bundle** com Turbopack

### **3. Experiência do Usuário**

- **Feedback visual** em todas as operações
- **Validação em tempo real** com mensagens claras
- **Acessibilidade** com ARIA labels e navegação por teclado
- **Design responsivo** para todos os dispositivos

### **4. Manutenibilidade**

- **Código autodocumentado** com TypeScript
- **Padrões consistentes** em toda a aplicação
- **Tratamento centralizado** de erros
- **Utilitários reutilizáveis** para formatação

## 🚀 Como Executar

### **Pré-requisitos**

```bash
Node.js 18+
PostgreSQL (ou Neon.tech)
```

### **Instalação**

```bash
# Instalar dependências
pnpm install // recomendo pnpm, mas npm ou yarn também funcionam

# Configurar banco de dados
pnpm prisma generate
pnpm prisma db push

# Executar em desenvolvimento
pnpm run dev
```

### **Build e Deploy**

```bash
# Build para produção
pnpm run build

# Iniciar em produção
pnpm start
```

## 🔧 Configuração de Ambiente

```bash
# .env
DATABASE_URL="postgresql://user:password@host:port/database"
```

## 📈 Métricas e Monitoramento

- **Bundle size otimizado** com Turbopack
- **Performance de formulários** com React Hook Form
- **Cache hit rate** otimizado com TanStack Query
- **Acessibilidade** validada com ferramentas automáticas

## 🤝 Contribuição

Este projeto segue padrões rigorosos de qualidade:

- **ESLint** para linting
- **Prettier** para formatação
- **TypeScript strict mode** habilitado
- **Conventional commits** para controle de versão

---

**Desenvolvido com foco para Praticar Formulários Dinâmicos**

## 📫 Contato

<div align="center">

<a href="mailto:cardosofiles@outlook.com">
  <img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white" alt="Email"/>
</a>
<a href="https://www.linkedin.com/in/joaobatista-dev/" target="_blank">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
</a>
<a href="https://github.com/Cardosofiles" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
</a>
<a href="https://cardosofiles.dev/" target="_blank">
  <img src="https://img.shields.io/badge/Portfólio-222222?style=for-the-badge&logo=about.me&logoColor=white" alt="Portfólio"/>
</a>

</div>

---

<div align="center">
  <i>⭐ Marque o repositório com uma estrela se você o achar interessante!</i>
  <br />
  <i>🔀 Faça uma pull request com alterações que você gostaria de ver!</i>
</div>
