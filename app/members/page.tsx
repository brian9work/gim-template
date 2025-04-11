"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, LogOut, Search, Plus, Pencil, Trash2, AlertCircle } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for demonstration
const mockMembers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "555-123-4567",
    membershipId: "M001",
    subscription: "Mensual",
    status: "Activo",
    expiryDate: "15-12-2023",
    joinDate: "15-01-2023",
    hasCheckins: true,
  },
  {
    id: 2,
    name: "María González",
    email: "maria@ejemplo.com",
    phone: "555-234-5678",
    membershipId: "M002",
    subscription: "Semanal",
    status: "Activo",
    expiryDate: "17-11-2023",
    joinDate: "20-02-2023",
    hasCheckins: true,
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan@ejemplo.com",
    phone: "555-345-6789",
    membershipId: "M003",
    subscription: "Quincenal",
    status: "Activo",
    expiryDate: "24-11-2023",
    joinDate: "10-03-2023",
    hasCheckins: true,
  },
  {
    id: 4,
    name: "Ana Martínez",
    email: "ana@ejemplo.com",
    phone: "555-456-7890",
    membershipId: "M004",
    subscription: "Mensual",
    status: "Activo",
    expiryDate: "05-12-2023",
    joinDate: "05-04-2023",
    hasCheckins: false,
  },
  {
    id: 5,
    name: "Luis Sánchez",
    email: "luis@ejemplo.com",
    phone: "555-567-8901",
    membershipId: "M005",
    subscription: "Mensual",
    status: "Expirado",
    expiryDate: "05-11-2023",
    joinDate: "15-05-2023",
    hasCheckins: true,
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [members, setMembers] = useState(mockMembers)
  const [memberToDelete, setMemberToDelete] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would search the database
  }

  const openDeleteDialog = (member: any) => {
    setMemberToDelete(member)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteMember = () => {
    if (memberToDelete && !memberToDelete.hasCheckins) {
      setMembers(members.filter((member) => member.id !== memberToDelete.id))
    }
    setIsDeleteDialogOpen(false)
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <h1 className="text-2xl font-semibold">Gestión de Miembros</h1>
          <Link href="/members/add" passHref>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Agregar Miembro
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Todos los Miembros</CardTitle>
            <CardDescription>Ver y gestionar todos los miembros del gimnasio</CardDescription>
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
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Suscripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha de Expiración</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>{member.membershipId}</TableCell>
                      <TableCell>{member.subscription}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Activo" ? "default" : "destructive"}>{member.status}</Badge>
                      </TableCell>
                      <TableCell>{member.expiryDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" asChild>
                            <Link href={`/members/edit/${member.id}`}>
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Editar</span>
                            </Link>
                          </Button>
                          <Dialog
                            open={isDeleteDialogOpen && memberToDelete?.id === member.id}
                            onOpenChange={setIsDeleteDialogOpen}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="text-destructive"
                                onClick={() => openDeleteDialog(member)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Eliminar Miembro</DialogTitle>
                                <DialogDescription>
                                  ¿Estás seguro de que quieres eliminar este miembro? Esta acción no se puede deshacer.
                                </DialogDescription>
                              </DialogHeader>
                              {memberToDelete?.hasCheckins && (
                                <Alert variant="destructive">
                                  <AlertCircle className="h-4 w-4" />
                                  <AlertTitle>No se puede eliminar el miembro</AlertTitle>
                                  <AlertDescription>
                                    Este miembro tiene historial de entradas y no puede ser eliminado del sistema.
                                  </AlertDescription>
                                </Alert>
                              )}
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                  Cancelar
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={handleDeleteMember}
                                  disabled={memberToDelete?.hasCheckins}
                                >
                                  Eliminar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
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
