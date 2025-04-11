"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, LogOut, Search, Plus, RefreshCw, AlertCircle } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

// Mock data for demonstration
const mockSubscriptions = [
  {
    id: 1,
    memberName: "Carlos Rodríguez",
    membershipId: "M001",
    type: "Mensual",
    status: "Activo",
    startDate: "15-11-2023",
    expiryDate: "15-12-2023",
    price: "$50.00",
  },
  {
    id: 2,
    memberName: "María González",
    membershipId: "M002",
    type: "Semanal",
    status: "Activo",
    startDate: "10-11-2023",
    expiryDate: "17-11-2023",
    price: "$15.00",
  },
  {
    id: 3,
    memberName: "Juan Pérez",
    membershipId: "M003",
    type: "Quincenal",
    status: "Activo",
    startDate: "10-11-2023",
    expiryDate: "24-11-2023",
    price: "$30.00",
  },
  {
    id: 4,
    memberName: "Ana Martínez",
    membershipId: "M004",
    type: "Mensual",
    status: "Activo",
    startDate: "05-11-2023",
    expiryDate: "05-12-2023",
    price: "$50.00",
  },
  {
    id: 5,
    memberName: "Luis Sánchez",
    membershipId: "M005",
    type: "Mensual",
    status: "Expirado",
    startDate: "05-10-2023",
    expiryDate: "05-11-2023",
    price: "$50.00",
  },
]

export default function SubscriptionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subscriptions] = useState(mockSubscriptions)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would search the database
  }

  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscription.membershipId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <DollarSign className="h-6 w-6" />
          <span>GymTrack Pro</span>
        </Link>
        <DashboardNav />
        <div className="ml-auto flex items-center gap-4">
          <Link href="/" passHref>
            <Button variant="outline" size="sm" className="gap-1">
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Gestión de Suscripciones</h1>
          <Link href="/subscriptions/plans" passHref>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Gestionar Planes
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Suscripciones Activas</CardTitle>
            <CardDescription>Ver y gestionar suscripciones de miembros</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mb-6">
              <Input
                type="search"
                placeholder="Buscar suscripciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Buscar</span>
              </Button>
            </form>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Miembro</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Inicio</TableHead>
                    <TableHead>Fecha de Expiración</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => (
                    <TableRow key={subscription.id}>
                      <TableCell className="font-medium">{subscription.memberName}</TableCell>
                      <TableCell>{subscription.membershipId}</TableCell>
                      <TableCell>{subscription.type}</TableCell>
                      <TableCell>
                        <Badge variant={subscription.status === "Activo" ? "default" : "destructive"}>
                          {subscription.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{subscription.startDate}</TableCell>
                      <TableCell>{subscription.expiryDate}</TableCell>
                      <TableCell>{subscription.price}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            disabled={subscription.status === "Expirado"}
                          >
                            <RefreshCw className="h-4 w-4" />
                            Renovar
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 text-amber-500">
                            <AlertCircle className="h-4 w-4" />
                            Detalles
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
