"use client"

import type React from "react"

import { useDatabase } from "@/lib/hooks/use-database"
import { Loader2 } from "lucide-react"

export function MainProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized } = useDatabase()

  if (!isInitialized) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-muted-foreground">Iniciando base de datos local...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
