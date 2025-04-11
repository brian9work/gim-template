"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, LogOut, Plus, Pencil, ArrowLeft } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const mockPlans = [
  {
    id: 1,
    name: "Básico Semanal",
    type: "Semanal",
    price: 15.0,
    description: "Acceso básico a las instalaciones del gimnasio por una semana",
    status: "Activo",
    membersCount: 12,
  },
  {
    id: 2,
    name: "Estándar Quincenal",
    type: "Quincenal",
    price: 30.0,
    description: "Acceso estándar a las instalaciones del gimnasio por dos semanas",
    status: "Activo",
    membersCount: 25,
  },
  {
    id: 3,
    name: "Premium Mensual",
    type: "Mensual",
    price: 50.0,
    description: "Acceso completo a todas las instalaciones y clases del gimnasio por un mes",
    status: "Activo",
    membersCount: 145,
  },
  {
    id: 4,
    name: "VIP Mensual",
    type: "Mensual",
    price: 75.0,
    description: "Acceso VIP incluyendo sesiones con entrenador personal",
    status: "Activo",
    membersCount: 32,
  },
  {
    id: 5,
    name: "Especial de Verano",
    type: "Mensual",
    price: 45.0,
    description: "Plan con descuento especial de verano",
    status: "Inactivo",
    membersCount: 0,
  },
]

export default function MembershipPlansPage() {
  const [plans, setPlans] = useState(mockPlans)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<any>(null)
  const [newPlan, setNewPlan] = useState({
    name: "",
    type: "Mensual",
    price: "",
    description: "",
    status: "Activo",
  })

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault()
    const planToAdd = {
      ...newPlan,
      id: plans.length + 1,
      price: Number.parseFloat(newPlan.price),
      membersCount: 0,
    }
    setPlans([...plans, planToAdd])
    setNewPlan({
      name: "",
      type: "Mensual",
      price: "",
      description: "",
      status: "Activo",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditPlan = (e: React.FormEvent) => {
    e.preventDefault()
    const updatedPlans = plans.map((plan) =>
      plan.id === currentPlan.id ? { ...currentPlan, price: Number.parseFloat(currentPlan.price.toString()) } : plan,
    )
    setPlans(updatedPlans)
    setIsEditDialogOpen(false)
  }

  const openEditDialog = (plan: any) => {
    setCurrentPlan(plan)
    setIsEditDialogOpen(true)
  }

  const handleCurrentPlanChange = (field: string, value: string) => {
    setCurrentPlan({ ...currentPlan, [field]: value })
  }

  const handleNewPlanChange = (field: string, value: string) => {
    setNewPlan({ ...newPlan, [field]: value })
  }

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
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="gap-1 mr-4">
              <Link href="/subscriptions">
                <ArrowLeft className="h-4 w-4" />
                Volver a Suscripciones
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Planes de Membresía</h1>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" />
                Agregar Nuevo Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddPlan}>
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Plan de Membresía</DialogTitle>
                  <DialogDescription>
                    Crea un nuevo plan de membresía para tu gimnasio. Haz clic en guardar cuando hayas terminado.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      value={newPlan.name}
                      onChange={(e) => handleNewPlanChange("name", e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Tipo
                    </Label>
                    <Select value={newPlan.type} onValueChange={(value) => handleNewPlanChange("type", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona el tipo de plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Semanal">Semanal</SelectItem>
                        <SelectItem value="Quincenal">Quincenal</SelectItem>
                        <SelectItem value="Mensual">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Precio ($)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newPlan.price}
                      onChange={(e) => handleNewPlanChange("price", e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Descripción
                    </Label>
                    <Input
                      id="description"
                      value={newPlan.description}
                      onChange={(e) => handleNewPlanChange("description", e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Estado
                    </Label>
                    <Select value={newPlan.status} onValueChange={(value) => handleNewPlanChange("status", value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Guardar Plan</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Planes de Membresía Disponibles</CardTitle>
            <CardDescription>Gestiona los planes de membresía y precios de tu gimnasio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Miembros</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell>{plan.type}</TableCell>
                      <TableCell>${plan.price.toFixed(2)}</TableCell>
                      <TableCell className="max-w-xs truncate">{plan.description}</TableCell>
                      <TableCell>
                        <Badge variant={plan.status === "Activo" ? "default" : "secondary"}>{plan.status}</Badge>
                      </TableCell>
                      <TableCell>{plan.membersCount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={isEditDialogOpen && currentPlan?.id === plan.id}
                          onOpenChange={setIsEditDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-1" onClick={() => openEditDialog(plan)}>
                              <Pencil className="h-4 w-4" />
                              Editar
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            {currentPlan && (
                              <form onSubmit={handleEditPlan}>
                                <DialogHeader>
                                  <DialogTitle>Editar Plan de Membresía</DialogTitle>
                                  <DialogDescription>
                                    Realiza cambios en el plan de membresía. Haz clic en guardar cuando hayas terminado.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-name" className="text-right">
                                      Nombre
                                    </Label>
                                    <Input
                                      id="edit-name"
                                      value={currentPlan.name}
                                      onChange={(e) => handleCurrentPlanChange("name", e.target.value)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-type" className="text-right">
                                      Tipo
                                    </Label>
                                    <Select
                                      value={currentPlan.type}
                                      onValueChange={(value) => handleCurrentPlanChange("type", value)}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecciona el tipo de plan" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Semanal">Semanal</SelectItem>
                                        <SelectItem value="Quincenal">Quincenal</SelectItem>
                                        <SelectItem value="Mensual">Mensual</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-price" className="text-right">
                                      Precio ($)
                                    </Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      step="0.01"
                                      min="0"
                                      value={currentPlan.price}
                                      onChange={(e) => handleCurrentPlanChange("price", e.target.value)}
                                      className="col-span-3"
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-description" className="text-right">
                                      Descripción
                                    </Label>
                                    <Input
                                      id="edit-description"
                                      value={currentPlan.description}
                                      onChange={(e) => handleCurrentPlanChange("description", e.target.value)}
                                      className="col-span-3"
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-status" className="text-right">
                                      Estado
                                    </Label>
                                    <Select
                                      value={currentPlan.status}
                                      onValueChange={(value) => handleCurrentPlanChange("status", value)}
                                    >
                                      <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Selecciona el estado" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Activo">Activo</SelectItem>
                                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button type="submit">Guardar Cambios</Button>
                                </DialogFooter>
                              </form>
                            )}
                          </DialogContent>
                        </Dialog>
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
