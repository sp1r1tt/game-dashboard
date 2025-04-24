import type { MarketItem } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coins } from "lucide-react"

interface MarketProps {
  items: MarketItem[]
}

export default function Market({ items }: MarketProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No items found in the market.</p>
      </div>
    )
  }

  // Map item types to colors and icons
  const getItemTypeStyles = (type: string) => {
    switch (type) {
      case "fishing_rod":
        return { bgColor: "bg-blue-900/20", borderColor: "border-blue-700", textColor: "text-blue-400" }
      case "poison_leveling":
        return { bgColor: "bg-purple-900/20", borderColor: "border-purple-700", textColor: "text-purple-400" }
      case "poison_delay":
        return { bgColor: "bg-red-900/20", borderColor: "border-red-700", textColor: "text-red-400" }
      case "poison_recovery":
        return { bgColor: "bg-green-900/20", borderColor: "border-green-700", textColor: "text-green-400" }
      default:
        return { bgColor: "bg-slate-900/20", borderColor: "border-slate-700", textColor: "text-slate-400" }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => {
        const { bgColor, borderColor, textColor } = getItemTypeStyles(item.type)

        return (
          <Card key={item.id} className={`${bgColor} border ${borderColor} hover:bg-opacity-30 transition-all`}>
            <CardHeader className="pb-2">
              <CardTitle className={textColor}>{item.name}</CardTitle>
              <CardDescription className="text-xs uppercase tracking-wide">
                {item.type.replace("_", " ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-300">{item.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-amber-400" />
                <span className="font-bold">{item.cost.toLocaleString()}</span>
              </div>
              <Button variant="secondary" size="sm">
                Buy
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
