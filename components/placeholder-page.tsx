import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { FileCode } from "lucide-react"

interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileCode className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Página en Construcción</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">Esta sección estará disponible próximamente.</p>
        </div>
      </CardContent>
    </Card>
  )
}
