"use client"

import { useState } from "react"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function TicketsPage() {
  const { toast } = useToast()
  const [subject, setSubject] = useState("")
  const [channel, setChannel] = useState("Web")
  const [priority, setPriority] = useState("Media")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    await db.tickets.add({
      subject,
      channel,
      priority,
      status: "abierto",
      description,
      createdAt: now,
      updatedAt: now,
    })
    toast({ title: "Ticket creado" })
    setSubject("")
    setChannel("Web")
    setPriority("Media")
    setDescription("")
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Nuevo Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Asunto</label>
          <input
            className="rounded border px-3 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Canal</label>
          <select
            className="rounded border px-3 py-2"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option value="Web">Web</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Correo">Correo</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Prioridad</label>
          <select
            className="rounded border px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            className="rounded border px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Guardar Ticket</Button>
      </form>
    </div>
  )
}
