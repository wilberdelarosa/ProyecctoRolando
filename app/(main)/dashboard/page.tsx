"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, FileText, HardHat, PlusCircle, Ticket, Truck } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const kpiData = [
  { title: "Cotizaciones Hoy", value: "3", icon: FileText, color: "text-sky-500" },
  { title: "Reportes Hoy", value: "2", icon: HardHat, color: "text-orange-500" },
  { title: "Facturas Hoy", value: "1", icon: DollarSign, color: "text-green-500" },
  { title: "Tickets Abiertos", value: "4", icon: Ticket, color: "text-red-500" },
]

const equipmentUtilizationData = [
  { name: "VOL-01", utilization: 85 },
  { name: "CAT-320", utilization: 60 },
  { name: "GRE-01", utilization: 75 },
  { name: "RET-05", utilization: 90 },
]

const monthlyRevenueData = [
  { month: "Ene", revenue: 450000 },
  { month: "Feb", revenue: 520000 },
  { month: "Mar", revenue: 780000 },
  { month: "Abr", revenue: 610000 },
  { month: "May", revenue: 890000 },
  { month: "Jun", revenue: 950000 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Nueva Cotización
          </Button>
          <Button variant="secondary">
            <FileText className="mr-2 h-4 w-4" /> Facturar
          </Button>
          <Button variant="secondary">
            <Truck className="mr-2 h-4 w-4" /> Planificar Equipo
          </Button>
          <Button variant="outline">
            <Ticket className="mr-2 h-4 w-4" /> Nuevo Ticket
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 text-muted-foreground ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">+2.1% desde ayer</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Utilización de Equipos (%)</CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={equipmentUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="utilization" fill="var(--color-brand)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresos por Mes (DOP)</CardTitle>
            <CardDescription>Acumulado del año</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `RD$${Number(value) / 1000}k`} />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        formatter={(value) =>
                          new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" }).format(Number(value))
                        }
                      />
                    }
                  />
                  <Bar dataKey="revenue" fill="var(--color-brand)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
