export interface Project {
  id: string
  title: string
  project: string
  description: string
  technologies: string[]
  link: string
  image: string
  status: 'completed' | 'in-progress' | 'planned'
}

export const projects: Project[] = [
  {
    id: 'dynamic-form',
    title: 'Sistema de Gerenciamento de Clientes',
    project: 'Dynamic Form',
    description: 'CRUD completo com formulários dinâmicos, validação robusta e integração com APIs',
    technologies: [
      'Next.js 15',
      'React Hook Form',
      'Zod',
      'Prisma',
      'PostgreSQL',
      'TanStack Query',
    ],
    link: '/dynamic-form',
    image:
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'completed',
  },
  {
    id: 'dashboard-analytics',
    title: 'Dashboard de Analytics',
    project: 'Analytics Dashboard',
    description: 'Dashboard interativo com gráficos e métricas em tempo real',
    technologies: ['Next.js', 'Chart.js', 'Prisma', 'WebSockets'],
    link: '/dashboard-preview',
    image:
      'https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'planned',
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Moderno',
    project: 'E-commerce Platform',
    description: 'Plataforma de e-commerce completa com pagamentos integrados',
    technologies: ['Next.js', 'Stripe', 'Prisma', 'NextAuth'],
    link: '/dashboard-preview',
    image:
      'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'planned',
  },
  {
    id: 'task-manager',
    title: 'Gerenciador de Tarefas',
    project: 'Task Manager',
    description: 'Sistema de gerenciamento de tarefas com colaboração em tempo real',
    technologies: ['Next.js', 'Socket.io', 'Prisma', 'Drag & Drop'],
    link: '/dashboard-preview',
    image:
      'https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'planned',
  },
  {
    id: 'chat-app',
    title: 'Chat em Tempo Real',
    project: 'Real-time Chat',
    description: 'Aplicativo de chat com salas, mensagens privadas e compartilhamento de arquivos',
    technologies: ['Next.js', 'Socket.io', 'Prisma', 'AWS S3'],
    link: '/dashboard-preview',
    image:
      'https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'planned',
  },
  {
    id: 'portfolio-builder',
    title: 'Construtor de Portfólio',
    project: 'Portfolio Builder',
    description: 'Ferramenta para criar portfólios profissionais de forma visual e intuitiva',
    technologies: ['Next.js', 'Drag & Drop', 'Canvas API', 'Prisma'],
    link: '/dashboard-preview',
    image:
      'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    status: 'planned',
  },
]
