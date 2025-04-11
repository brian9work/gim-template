"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, LogOut, ArrowLeft } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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

export default function EditMemberPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = Number.parseInt(params.id as string)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subscription: "",
    status: "",
  })
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // In a real app, you would fetch the member from the database
    const foundMember = mockMembers.find((m) => m.id === memberId)
    if (foundMember) {
      setMember(foundMember)
      setFormData({
        name: foundMember.name,
        email: foundMember.email,
        phone: foundMember.phone,
        subscription: foundMember.subscription.toLowerCase(),
        status: foundMember.status.toLowerCase(),
      })
    } else {
      setError("Miembro no encontrado")
    }
    setLoading(false)
  }, [memberId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubscriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subscription: value }))
  }

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would update the member in the database
    console.log("Form submitted:", formData)
    router.push("/members")
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Cargando...</div>
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
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
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="gap-1 mr-4">
            <Link href="/members">
              <ArrowLeft className="h-4 w-4" />
              Volver a Miembros
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Editar Miembro</h1>
        </div>
        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Miembro</CardTitle>
              <CardDescription>Editar los detalles de {member.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="Ingresa el nombre completo del miembro"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresa el correo electrónico del miembro"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="Ingresa el número de teléfono del miembro"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subscription">Tipo de Suscripción</Label>
                <Select value={formData.subscription} onValueChange={handleSubscriptionChange}>
                  <SelectTrigger id="subscription">
                    <SelectValue placeholder="Selecciona el tipo de suscripción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quincenal">Quincenal</SelectItem>
                    <SelectItem value="mensual">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="expirado">Expirado</SelectItem>
                    <SelectItem value="suspendido">Suspendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {member.hasCheckins && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Nota</AlertTitle>
                  <AlertDescription>
                    Este miembro tiene historial de entradas y no puede ser eliminado del sistema.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/members")}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Cambios</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
