"use client"

import { useEffect } from "react"
import { seedDatabase } from "@/lib/db"
import { useToast } from "@/components/ui/use-toast"

export function DatabaseSeeder() {
  const { toast } = useToast()

  useEffect(() => {
    const doSeed = async () => {
      try {
        await seedDatabase()
      } catch (error) {
        console.error("Failed to seed database:", error)
        toast({
          title: "Error de Base de Datos",
          description: "No se pudieron cargar los datos iniciales.",
          variant: "destructive",
        })
      }
    }
    doSeed()
  }, [toast])

  return null // This component does not render anything
}
