import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign } from "lucide-react"
import StatsCards from "@/components/stats-cards"
import MembershipChart from "@/components/membership-chart"
import RecentCheckinsTable from "@/components/recent-checkins-table"

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6" />
          <span>GymTrack Pro</span>
        </Link>
        <nav className="ml-auto flex gap-2">
          <Link href="/login" passHref>
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards />
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="checkins">Entradas</TabsTrigger>
            <TabsTrigger value="members">Miembros</TabsTrigger>
            <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Resumen de Membresías</CardTitle>
                  <CardDescription>Distribución de tipos de membresía entre todos los miembros activos</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <MembershipChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Entradas Recientes</CardTitle>
                  <CardDescription>Última actividad de miembros en el gimnasio</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentCheckinsTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="checkins" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de Entradas</CardTitle>
                <CardDescription>Gestionar entradas y salidas de miembros</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/checkin" passHref>
                  <Button className="w-full">Ir al Sistema de Entradas</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Miembros</CardTitle>
                <CardDescription>Ver y gestionar miembros del gimnasio</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/members" passHref>
                  <Button className="w-full">Ir a Gestión de Miembros</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Suscripciones</CardTitle>
                <CardDescription>Gestionar planes de membresía y renovaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/subscriptions" passHref>
                  <Button className="w-full">Ir a Gestión de Suscripciones</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
