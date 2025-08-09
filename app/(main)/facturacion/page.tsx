"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/db"
import type { Client } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function FacturacionPage() {
  const { toast } = useToast()
  const [clients, setClients] = useState<Client[]>([])
  const [ncf, setNcf] = useState("")
  const [clientId, setClientId] = useState<number | "">("")
  const [total, setTotal] = useState(0)

  useEffect(() => {
    db.clients.toArray().then(setClients)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientId) {
      toast({ title: "Selecciona un cliente", variant: "destructive" })
      return
    }
    const now = new Date()
    await db.invoices.add({
      ncf,
      clientId: Number(clientId),
      total,
      createdAt: now,
      updatedAt: now,
    })
    toast({ title: "Factura guardada" })
    setNcf("")
    setClientId("")
    setTotal(0)
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Nueva Factura</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">NCF</label>
          <input
            className="rounded border px-3 py-2"
            value={ncf}
            onChange={(e) => setNcf(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Cliente</label>
          <select
            className="rounded border px-3 py-2"
            value={clientId}
            onChange={(e) => setClientId(e.target.value ? Number(e.target.value) : "")}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Total RD$</label>
          <input
            type="number"
            className="rounded border px-3 py-2"
            value={total}
            onChange={(e) => setTotal(Number(e.target.value))}
            required
          />
        </div>
        <Button type="submit">Guardar Factura</Button>
      </form>
    </div>
  )
}
