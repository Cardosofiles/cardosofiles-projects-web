import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BarChart3, DollarSign, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Status: Em Planejamento</p>
            </div>
          </div>
        </div>

        {/* Preview Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-muted-foreground text-xs">+20.1% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45.231</div>
              <p className="text-muted-foreground text-xs">+15.1% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
              <TrendingUp className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4%</div>
              <p className="text-muted-foreground text-xs">+2.1% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessões Ativas</CardTitle>
              <BarChart3 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-muted-foreground text-xs">+8.2% em relação à semana passada</p>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Section */}
        <Card className="p-12 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard em Desenvolvimento</CardTitle>
            <CardDescription className="text-lg">
              Este projeto está em fase de planejamento. Em breve você poderá conferir:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="mx-auto max-w-md space-y-2 text-left">
              <li>📊 Gráficos interativos com Chart.js</li>
              <li>📈 Métricas em tempo real</li>
              <li>👥 Analytics de usuários</li>
              <li>💰 Relatórios financeiros</li>
              <li>📱 Interface responsiva</li>
            </ul>
            <div className="mt-8">
              <Button asChild>
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
