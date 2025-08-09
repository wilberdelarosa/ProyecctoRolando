export interface Client {
  id?: number
  name: string
  rnc: string
  email: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface Quote {
  id?: number
  folio: string
  clientId: number
  jobLocation: string
  validity: string
  status: "borrador" | "emitida" | "aprobada" | "vencida" | "cancelada"
  totalExempt: number
  totalTaxed: number
  itbis: number
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface QuoteItem {
  id?: number
  quoteId: number
  description: string
  quantity: number
  unit: "VJ" | "M³" | "HRS" | "UND"
  price: number
  isTaxed: boolean
}
