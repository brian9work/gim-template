"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, LogOut, ArrowLeft } from "lucide-react"
import DashboardNav from "@/components/dashboard-nav"

export default function AddMemberPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subscription: "monthly",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubscriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subscription: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the member to the database
    console.log("Form submitted:", formData)
    router.push("/members")
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
          <h1 className="text-2xl font-semibold">Agregar Nuevo Miembro</h1>
        </div>
        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Información del Miembro</CardTitle>
              <CardDescription>Ingresa los detalles del nuevo miembro</CardDescription>
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
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="biweekly">Quincenal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.push("/members")}>
                Cancelar
              </Button>
              <Button type="submit">Guardar Miembro</Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
