"use client"

import { useEffect, useState } from "react"
import { db, seedDatabase } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const initialize = async () => {
      try {
        // open() is a required step for Dexie to initialize.
        await db.open()
        await seedDatabase()
        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize database:", error)
        toast({
          title: "Error de Base de Datos",
          description: "No se pudieron cargar los datos iniciales.",
          variant: "destructive",
        })
      }
    }
    initialize()
  }, [toast])

  return { db, isInitialized }
}
