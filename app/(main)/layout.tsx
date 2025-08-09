import type React from "react"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { Header } from "@/components/header"
import { MainProvider } from "./main-provider"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AppSidebar />
      <div className="flex flex-1 flex-col sm:pl-14">
        <Header />
        <MainProvider>
          <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-4 md:gap-8">{children}</main>
        </MainProvider>
      </div>
    </div>
  )
}
