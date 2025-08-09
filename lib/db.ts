"use client"

import Dexie, { type Table } from "dexie"
import type { Client, Quote, QuoteItem } from "./types"

const sampleClients: Omit<Client, "id">[] = [
  {
    name: "Constructora XYZ",
    rnc: "101000001",
    email: "compras@constructoraxyz.com",
    phone: "809-555-1234",
    address: "Av. Principal 123, Santo Domingo",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Ingenieros & Asociados",
    rnc: "101000002",
    email: "info@ingenieros.com.do",
    phone: "809-555-5678",
    address: "Calle Secundaria 45, Santiago",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Desarrollos Urbanos SRL",
    rnc: "101000003",
    email: "proyectos@desarrollos.do",
    phone: "809-222-1111",
    address: "Plaza Central, Suite 201, Punta Cana",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export class AlitoDexie extends Dexie {
  clients!: Table<Client, number>
  quotes!: Table<Quote, number>
  quoteItems!: Table<QuoteItem, number>

  constructor() {
    super("AlitoGroupSGI_DB_v2")
    this.version(1).stores({
      clients: "++id, name, rnc",
      quotes: "++id, folio, clientId, status",
      quoteItems: "++id, quoteId",
    })
  }
}

const db = new AlitoDexie()

export async function seedDatabase() {
  const clientCount = await db.clients.count()
  if (clientCount === 0) {
    console.log("Seeding database with initial data...")
    await db.clients.bulkAdd(sampleClients)
    console.log("Database seeded successfully.")
  }
}

export { db }
