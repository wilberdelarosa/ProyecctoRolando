"use client"

import { useState } from "react"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function EquiposPage() {
  const { toast } = useToast()
  const [equipment, setEquipment] = useState("")
  const [date, setDate] = useState("")
  const [shift, setShift] = useState("Mañana")
  const [jobSite, setJobSite] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    await db.equipmentPlans.add({
      equipment,
      date,
      shift,
      jobSite,
      createdAt: now,
      updatedAt: now,
    })
    toast({ title: "Planificación guardada" })
    setEquipment("")
    setDate("")
    setShift("Mañana")
    setJobSite("")
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Planificar Equipo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Equipo</label>
          <input
            className="rounded border px-3 py-2"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Fecha</label>
          <input
            type="date"
            className="rounded border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Turno</label>
          <select
            className="rounded border px-3 py-2"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Obra / Cliente</label>
          <input
            className="rounded border px-3 py-2"
            value={jobSite}
            onChange={(e) => setJobSite(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Guardar Planificación</Button>
      </form>
    </div>
  )
}
