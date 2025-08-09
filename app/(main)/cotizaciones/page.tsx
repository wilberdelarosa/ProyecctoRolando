"use client"

import { useEffect, useState } from "react"
import { db } from "@/lib/db"
import type { Client, QuoteItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CotizacionesPage() {
  const { toast } = useToast()
  const [clients, setClients] = useState<Client[]>([])
  const [folio, setFolio] = useState("")
  const [clientId, setClientId] = useState<number | "">("")
  const [jobLocation, setJobLocation] = useState("")
  const [validity, setValidity] = useState("")
  const [items, setItems] = useState<QuoteItem[]>([
    {
      description: "",
      quantity: 1,
      unit: "UND",
      price: 0,
      isTaxed: true,
      quoteId: 0,
    },
  ])

  useEffect(() => {
    db.clients.toArray().then(setClients)
  }, [])

  const addItem = () => {
    setItems([
      ...items,
      { description: "", quantity: 1, unit: "UND", price: 0, isTaxed: true, quoteId: 0 },
    ])
  }

  const updateItem = (index: number, key: keyof QuoteItem, value: any) => {
    const newItems = [...items]
    // @ts-ignore
    newItems[index][key] = value
    setItems(newItems)
  }

  const totals = items.reduce(
    (acc, item) => {
      const lineTotal = item.quantity * item.price
      if (item.isTaxed) acc.taxed += lineTotal
      else acc.exempt += lineTotal
      return acc
    },
    { taxed: 0, exempt: 0 }
  )
  const itbis = totals.taxed * 0.18
  const total = totals.taxed + totals.exempt + itbis

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientId) {
      toast({ title: "Selecciona un cliente", variant: "destructive" })
      return
    }
    const now = new Date()
    const quoteId = await db.quotes.add({
      folio,
      clientId: Number(clientId),
      jobLocation,
      validity,
      status: "borrador",
      totalExempt: totals.exempt,
      totalTaxed: totals.taxed,
      itbis,
      total,
      createdAt: now,
      updatedAt: now,
    })
    await Promise.all(
      items.map((it) =>
        db.quoteItems.add({
          quoteId,
          description: it.description,
          quantity: it.quantity,
          unit: it.unit,
          price: it.price,
          isTaxed: it.isTaxed,
        })
      )
    )
    toast({ title: "Cotización guardada" })
    setFolio("")
    setClientId("")
    setJobLocation("")
    setValidity("")
    setItems([
      { description: "", quantity: 1, unit: "UND", price: 0, isTaxed: true, quoteId: 0 },
    ])
  }

  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-2xl font-bold">Nueva Cotización</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Folio</label>
            <input
              className="rounded border px-3 py-2"
              value={folio}
              onChange={(e) => setFolio(e.target.value)}
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
            <label className="text-sm font-medium">Obra / Lugar</label>
            <input
              className="rounded border px-3 py-2"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Vigencia</label>
            <input
              className="rounded border px-3 py-2"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Renglones</h2>
          {items.map((item, idx) => (
            <div key={idx} className="grid gap-2 sm:grid-cols-6">
              <input
                className="rounded border px-3 py-2 sm:col-span-2"
                placeholder="Descripción"
                value={item.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
                required
              />
              <input
                type="number"
                className="rounded border px-3 py-2"
                placeholder="Cant"
                value={item.quantity}
                onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                required
              />
              <select
                className="rounded border px-3 py-2"
                value={item.unit}
                onChange={(e) => updateItem(idx, "unit", e.target.value)}
              >
                <option value="VJ">VJ</option>
                <option value="M³">M³</option>
                <option value="HRS">HRS</option>
                <option value="UND">UND</option>
              </select>
              <input
                type="number"
                className="rounded border px-3 py-2"
                placeholder="Precio"
                value={item.price}
                onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isTaxed}
                  onChange={(e) => updateItem(idx, "isTaxed", e.target.checked)}
                />
                <span className="text-sm">Gravado</span>
              </div>
            </div>
          ))}
          <Button type="button" variant="secondary" onClick={addItem}>
            Añadir Renglón
          </Button>
        </div>

        <div className="space-y-1 text-right">
          <p>Total Gravado: RD${totals.taxed.toFixed(2)}</p>
          <p>Total Exento: RD${totals.exempt.toFixed(2)}</p>
          <p>ITBIS (18%): RD${itbis.toFixed(2)}</p>
          <p className="font-semibold">Total RD$: {total.toFixed(2)}</p>
        </div>

        <Button type="submit">Guardar Cotización</Button>
      </form>
    </div>
  )
}
