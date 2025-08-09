import Dexie, { type Table } from "dexie"
import type { Client, Quote, QuoteItem } from "./types"

// Dummy data for seeding
const sampleClients: Client[] = [
  {
    name: "Constructora XYZ",
    rnc: "101000001",
    email: "compras@constructoraxyz.com",
    phone: "809-555-1234",
    address: "Av. Principal 123, Santo Domingo",
  },
  {
    name: "Ingenieros & Asociados",
    rnc: "101000002",
    email: "info@ingenieros.com.do",
    phone: "809-555-5678",
    address: "Calle Secundaria 45, Santiago",
  },
  {
    name: "Desarrollos Urbanos SRL",
    rnc: "101000003",
    email: "proyectos@desarrollos.do",
    phone: "809-222-1111",
    address: "Plaza Central, Suite 201, Punta Cana",
  },
]

export class AlitoDexie extends Dexie {
  clients!: Table<Client, number>
  quotes!: Table<Quote, number>
  quoteItems!: Table<QuoteItem, number>
  // ... other tables will be defined here

  constructor() {
    super("AlitoGroupSGI_DB")
    this.version(1).stores({
      clients: "++id, name, rnc",
      quotes: "++id, folio, clientId, status",
      quoteItems: "++id, quoteId",
      // reports: '++id, numero, clientId',
      // invoices: '++id, ncf, clientId',
      // equipment: '++id, code, name',
      // plans: '++id, equipmentId, date',
      // tickets: '++id, status, priority',
      // settings: 'id',
    })
  }
}

export const db = new AlitoDexie()

export async function seedDatabase() {
  const clientCount = await db.clients.count()
  if (clientCount === 0) {
    console.log("Seeding database with initial data...")
    await db.clients.bulkAdd(sampleClients.map((c) => ({ ...c, createdAt: new Date(), updatedAt: new Date() })))
    console.log("Database seeded successfully.")
  } else {
    console.log("Database already contains data, skipping seed.")
  }
}

// We can call this from a client component, e.g., in the main layout's useEffect
