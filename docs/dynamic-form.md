# 📋 Dynamic Form - Sistema de Gerenciamento de Clientes

<div align="center">

![Status](https://img.shields.io/badge/Status-✅_Completo-green?style=for-the-badge)
![Tipo](https://img.shields.io/badge/Tipo-CRUD_System-blue?style=for-the-badge)

**Sistema completo de gerenciamento de clientes com formulários dinâmicos**

[🔗 Acessar Projeto](https://cardosofiles-projects-web.vercel.app/dynamic-form) • [🏠 Voltar ao Hub](https://github.com/Cardosofiles/cardosofiles-projects-web)

</div>

---

## 🎯 Objetivo do Projeto

Desenvolver um sistema CRUD completo e robusto para gerenciamento de clientes, demonstrando expertise em:

- **Formulários complexos** com validação robusta
- **Operações CRUD** otimizadas
- **UX avançada** com autocompletação e máscaras
- **Arquitetura escalável** com custom hooks

---

## ✨ Funcionalidades Principais

### 📝 Formulário Dinâmico

- ✅ **Validação em tempo real** com Zod
- ✅ **Máscaras automáticas** para CPF/CNPJ, telefone e CEP
- ✅ **Autocompletar de email** com provedores populares
- ✅ **Preenchimento automático** via API de CEP
- ✅ **Campos dinâmicos** para múltiplos endereços

### 🗃️ Gerenciamento de Dados

- ✅ **CRUD completo** (Create, Read, Update, Delete)
- ✅ **Listagem paginada** com skeleton loading
- ✅ **Busca e filtros** inteligentes
- ✅ **Validação de duplicatas** (email, CPF, telefone)
- ✅ **Cache otimizado** com TanStack Query

### 🎨 Interface & Experiência

- ✅ **Design responsivo** para todos os dispositivos
- ✅ **Modal unificado** para criação e edição
- ✅ **Confirmação de exclusão** com feedback visual
- ✅ **Estados de carregamento** e tratamento de erros
- ✅ **Acessibilidade** com navegação por teclado

---

## 🛠️ Stack Tecnológica

### Core

- **Next.js 15** - Framework com App Router
- **React 19** - Biblioteca UI com Server Components
- **TypeScript** - Tipagem forte

### Formulários & Validação

- **React Hook Form** - Gerenciamento performático
- **Zod** - Schema validation e type inference
- **@hookform/resolvers** - Integração RHF + Zod

### Banco de Dados

- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Banco relacional (Neon.tech)
- **Server Actions** - API routes nativas do Next.js

### UI & Styling

- **Shadcn/UI** - Componentes base
- **Tailwind CSS** - Styling utility-first
- **Radix UI** - Primitivos acessíveis

### Estado & Cache

- **TanStack Query** - Server state management
- **Custom Hooks** - Lógica reutilizável

---

## 🏗️ Arquitetura do Projeto

```
src/
├── app/dynamic-form/          # Página principal
├── components/
│   ├── dynamic-form/form/     # Componentes do formulário
│   ├── dynamic-form/table/    # Tabela CRUD + modais
│   └── ux/                    # Email input customizado
├── hooks/dynamic-form/        # Custom hooks
│   ├── useClientForm.ts       # Gerenciamento do formulário
│   ├── useClientQueries.ts    # Queries TanStack
│   ├── useClientMutations.ts  # Mutations (CRUD)
│   └── useClientTable.ts      # Estado da tabela
├── actions/dynamic-form/      # Server Actions
├── schemas/                   # Validação Zod
├── services/                  # Serviços de dados
└── utils/                     # Formatters e utilitários
```

---

## 💡 Soluções Técnicas Implementadas

### 1. **Validação Híbrida**

```typescript
// Frontend: Validação instantânea
const schema = z.object({
  email: z.string().email('Email inválido'),
  cpfCnpj: z.string().min(11, 'CPF/CNPJ inválido')
})

// Backend: Verificação de negócio
const existingClient = await getClientByEmail(email)
if (existingClient) {
  return { error: 'Email já existe' }
}
```

### 2. **Hooks Customizados Especializados**

```typescript
// Separação clara de responsabilidades
const useClientForm()      // Formulário e validação
const useClientQueries()   // Busca de dados
const useClientMutations() // Operações CRUD
const useClientTable()     // Estado da interface
```

### 3. **Formatação Inteligente**

```typescript
// Dados limpos no banco vs formatação visual
const formatCpfCnpj = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits.length <= 11
    ? formatAsCPF(digits)    // 000.000.000-00
    : formatAsCNPJ(digits)   // 00.000.000/0000-00
}
```

### 4. **UX Avançada no Email**

```typescript
// Autocompletar inteligente com navegação por teclado
const EmailProviderSelector = () => {
  const shouldShow = value.length > 0 && !value.includes('@')
  // Suporte a Tab, setas, Enter, Escape
}
```

---

## 📊 Modelo de Dados

### Cliente

```typescript
interface Client {
  id?: string
  name: string
  cpfCnpj: string        // Normalizado (só números)
  birthDate: Date
  email: string          // Lowercase
  phone: string
  addresses: Address[]   // Relação 1:N
  createdAt?: Date
  updatedAt?: Date
}
```

### Endereço

```typescript
interface Address {
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
```

---

## 🔄 Fluxo de Dados

### Criação de Cliente

1. **Preenchimento** → Validação em tempo real
2. **Submit** → Validação Zod completa
3. **Server Action** → Normalização + verificações
4. **Prisma** → Inserção transacional
5. **TanStack Query** → Invalidação do cache
6. **UI** → Atualização automática

### Edição de Cliente

1. **Busca** → `useQuery` com cache
2. **População** → `populateForm()` personalizada
3. **Edição** → Validação contínua
4. **Update** → Server Action otimizada
5. **Sincronização** → Cache atualizado

---

## 🎨 Componentes Principais

### FormField Components

- **NameField** - Input simples com validação
- **DocsField** - CPF/CNPJ com máscara dinâmica
- **EmailField** - Autocompletar de provedores
- **ContactField** - Telefone com máscara
- **DateBirth** - Date picker customizado
- **AddressesField** - Array dinâmico com CEP API

### Table Components

- **TableListClient** - Container principal
- **TableSkeleton** - Loading state
- **CRUD Modals** - Criação/edição unificada

---

## 🚀 Performance & Otimizações

### TanStack Query

```typescript
// Cache inteligente com invalidação seletiva
queryClient.invalidateQueries({ queryKey: ['clients'] })

// Stale time otimizado
staleTime: 1000 * 60, // 1 minuto
refetchOnWindowFocus: false
```

### React Hook Form

```typescript
// Performance otimizada com useCallback
const handleSubmit = useCallback((data) => {
  // Evita re-renders desnecessários
}, [dependencies])
```

### Lazy Loading

- **Componentes** carregados sob demanda
- **Queries** executadas apenas quando necessário
- **Skeleton states** para feedback imediato

---

## 🧪 Validações & Testes

### Validação de Dados

- **Formato**: Email, CPF/CNPJ, telefone, CEP
- **Unicidade**: Email, CPF/CNPJ, telefone
- **Integridade**: Relacionamentos e constraints
- **Segurança**: Sanitização e normalização

### Casos de Teste Cobertos

- ✅ Criação com dados válidos
- ✅ Validação de campos obrigatórios
- ✅ Verificação de duplicatas
- ✅ Edição de registros existentes
- ✅ Exclusão com confirmação
- ✅ Estados de loading e erro

---

## 📱 Responsividade

### Breakpoints

- **Mobile** (320px+) - Layout em coluna única
- **Tablet** (768px+) - Grid 2 colunas
- **Desktop** (1024px+) - Layout completo
- **Wide** (1440px+) - Máxima largura

### Adaptações Móveis

- **Formulário** - Campos em stack vertical
- **Tabela** - Scroll horizontal com dados essenciais
- **Modais** - Fullscreen em mobile
- **Navegação** - Touch-friendly

---

## 🔮 Evoluções Futuras

### Funcionalidades Planejadas

- [ ] **Busca avançada** com filtros múltiplos
- [ ] **Export/Import** de dados (CSV, Excel)
- [ ] **Histórico de alterações** (audit log)
- [ ] **Dashboard** com métricas
- [ ] **Notificações** em tempo real
- [ ] **Tema customizável** por usuário

### Melhorias Técnicas

- [ ] **Testes unitários** com Jest/Testing Library
- [ ] **Testes E2E** com Playwright
- [ ] **Storybook** para componentes
- [ ] **Performance monitoring** com métricas
- [ ] **Error boundary** robusto
- [ ] **PWA** capabilities

---

## 📚 Aprendizados & Insights

### Challenges Superados

1. **Tipagem complexa** - Union types para compatibilidade
2. **Performance** - Otimização de re-renders
3. **UX** - Feedback visual em todas as ações
4. **Validação** - Híbrida frontend/backend
5. **Estado** - Sincronização entre cache e UI

### Best Practices Aplicadas

- **Separation of Concerns** - Hooks especializados
- **Type Safety** - TypeScript em toda aplicação
- **Error Handling** - Tratamento consistente
- **Code Reusability** - Componentes e utils reutilizáveis
- **Performance** - Memoização e lazy loading

---

## 🎯 Conclusão

O **Dynamic Form** representa uma implementação completa e profissional de um sistema CRUD, demonstrando:

- **Expertise técnica** em React/Next.js ecosystem
- **Atenção aos detalhes** na experiência do usuário
- **Arquitetura escalável** com padrões modernos
- **Qualidade de código** com TypeScript e validações
- **Performance otimizada** com cache inteligente

Este projeto serve como base sólida para sistemas mais complexos e demonstra capacidade de **transformar requisitos em soluções técnicas elegantes**.

---

<div align="center">

[🔗 **Testar o Projeto**](/dynamic-form) • [🏠 **Voltar ao Hub**](../)

**Projeto #1 de 12 - Dynamic Form System** ✅

</div>
