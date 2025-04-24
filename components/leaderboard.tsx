import type { Player } from "@/lib/types"
import { Trophy, Zap, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface LeaderboardProps {
  players: Player[]
}

export default function Leaderboard({ players }: LeaderboardProps) {
  if (players.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No players found in the leaderboard.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          <div className="grid grid-cols-12 text-sm font-medium text-slate-400 p-4 border-b border-slate-700">
            <div className="col-span-1">#</div>
            <div className="col-span-5 md:col-span-4">Player</div>
            <div className="col-span-2 text-center">Level</div>
            <div className="col-span-2 text-center">XP</div>
            <div className="col-span-2 md:col-span-3 text-center">Gold</div>
          </div>

          {players.map((player, index) => (
            <div
              key={player.username}
              className={`grid grid-cols-12 p-4 ${
                index !== players.length - 1 ? "border-b border-slate-700/50" : ""
              } hover:bg-slate-700/30 transition-colors`}
            >
              <div className="col-span-1 flex items-center">
                {player.rank <= 3 ? (
                  <Trophy
                    className={`h-5 w-5 ${
                      player.rank === 1 ? "text-amber-400" : player.rank === 2 ? "text-slate-300" : "text-amber-700"
                    }`}
                  />
                ) : (
                  <span className="text-slate-500">{player.rank}</span>
                )}
              </div>

              <div className="col-span-5 md:col-span-4 font-medium">{player.username}</div>

              <div className="col-span-2 flex justify-center items-center gap-1">
                <span className="bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded text-xs font-semibold">
                  {player.level}
                </span>
              </div>

              <div className="col-span-2 flex justify-center items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-blue-400" />
                <span>{player.xp}</span>
              </div>

              <div className="col-span-2 md:col-span-3 flex justify-center items-center gap-1">
                <Coins className="h-3.5 w-3.5 text-amber-400" />
                <span>{player.gold.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
