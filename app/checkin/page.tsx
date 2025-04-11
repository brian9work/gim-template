"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, LogOut, Search, UserCheck, UserX } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

// Mock data for demonstration
const mockMembers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    membershipId: "M001",
    subscription: "Mensual",
    status: "Activo",
    expiryDate: "15-12-2023",
    lastCheckin: "10-11-2023 10:15 AM",
    checkedIn: false,
  },
  {
    id: 2,
    name: "María González",
    membershipId: "M002",
    subscription: "Semanal",
    status: "Activo",
    expiryDate: "17-11-2023",
    lastCheckin: "10-11-2023 10:05 AM",
    checkedIn: true,
  },
  {
    id: 3,
    name: "Juan Pérez",
    membershipId: "M003",
    subscription: "Quincenal",
    status: "Activo",
    expiryDate: "24-11-2023",
    lastCheckin: "10-11-2023 9:45 AM",
    checkedIn: false,
  },
  {
    id: 4,
    name: "Ana Martínez",
    membershipId: "M004",
    subscription: "Mensual",
    status: "Activo",
    expiryDate: "05-12-2023",
    lastCheckin: "10-11-2023 9:30 AM",
    checkedIn: false,
  },
  {
    id: 5,
    name: "Luis Sánchez",
    membershipId: "M005",
    subscription: "Mensual",
    status: "Expirado",
    expiryDate: "05-11-2023",
    lastCheckin: "05-11-2023 9:15 AM",
    checkedIn: false,
  },
]

export default function CheckinPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [members, setMembers] = useState(mockMembers)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would search the database
  }

  const handleCheckin = (id: number) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, checkedIn: true } : member)))
  }

  const handleCheckout = (id: number) => {
    setMembers(members.map((member) => (member.id === id ? { ...member, checkedIn: false } : member)))
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchTerm.toLowerCase()),
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
          <h1 className="text-2xl font-semibold">Sistema de Entradas</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Entrada/Salida de Miembros</CardTitle>
            <CardDescription>Buscar miembros por nombre o ID de membresía</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mb-6">
              <Input
                type="search"
                placeholder="Buscar miembros..."
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
                    <TableHead>Suscripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Expiración</TableHead>
                    <TableHead>Última Entrada</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.membershipId}</TableCell>
                      <TableCell>{member.subscription}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Activo" ? "default" : "destructive"}>{member.status}</Badge>
                      </TableCell>
                      <TableCell>{member.expiryDate}</TableCell>
                      <TableCell>{member.lastCheckin}</TableCell>
                      <TableCell>
                        {member.status === "Expirado" ? (
                          <Button variant="outline" size="sm" disabled>
                            Expirado
                          </Button>
                        ) : member.checkedIn ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCheckout(member.id)}
                            className="gap-1"
                          >
                            <UserX className="h-4 w-4" />
                            Salida
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleCheckin(member.id)}
                            className="gap-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            Entrada
                          </Button>
                        )}
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
