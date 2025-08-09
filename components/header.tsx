"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Home, PanelLeft, Settings, Truck, Users, FileText, BarChart2, Ticket } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { useSidebar } from "./sidebar/sidebar-provider"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/clientes", icon: Users, label: "Clientes" },
  { href: "/cotizaciones", icon: FileText, label: "Cotizaciones" },
  { href: "/reportes", icon: BarChart2, label: "Reportes" },
  { href: "/facturacion", icon: FileText, label: "Facturación" },
  { href: "/equipos", icon: Truck, label: "Equipos" },
  { href: "/tickets", icon: Ticket, label: "Tickets" },
  { href: "/configuracion", icon: Settings, label: "Configuración" },
]

export function Header() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden bg-transparent">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-brand text-lg font-semibold text-white md:text-base"
            >
              <Truck className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">ALITO GROUP</span>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">{/* Could be a global search */}</div>
      <ModeToggle />
    </header>
  )
}
