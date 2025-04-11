import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function RecentCheckinsTable() {
  const recentCheckins = [
    {
      id: 1,
      name: "Carlos Rodríguez",
      time: "10:15 AM",
      status: "Entrada",
      subscription: "Mensual",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CR",
    },
    {
      id: 2,
      name: "María González",
      time: "10:05 AM",
      status: "Salida",
      subscription: "Semanal",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MG",
    },
    {
      id: 3,
      name: "Juan Pérez",
      time: "9:45 AM",
      status: "Entrada",
      subscription: "Quincenal",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
    },
    {
      id: 4,
      name: "Ana Martínez",
      time: "9:30 AM",
      status: "Entrada",
      subscription: "Mensual",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AM",
    },
    {
      id: 5,
      name: "Luis Sánchez",
      time: "9:15 AM",
      status: "Salida",
      subscription: "Mensual",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LS",
    },
  ]

  return (
    <div className="space-y-4">
      {recentCheckins.map((checkin) => (
        <div key={checkin.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={checkin.avatar} alt={checkin.name} />
            <AvatarFallback>{checkin.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{checkin.name}</p>
            <p className="text-sm text-muted-foreground">{checkin.time}</p>
          </div>
          <Badge variant={checkin.status === "Entrada" ? "default" : "secondary"}>{checkin.status}</Badge>
        </div>
      ))}
    </div>
  )
}
