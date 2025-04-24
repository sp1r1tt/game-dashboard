"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Leaderboard from "@/components/leaderboard";
import Market from "@/components/market";
import { fetchLeaderboard, fetchMarket } from "@/lib/api";
import type { Player, MarketItem } from "@/lib/types";
import { Trophy, ShoppingBag, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [items, setItems] = useState<MarketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    // Set initial state
    setIsOffline(!navigator.onLine);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const loadData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }

      // Use Promise.allSettled to handle partial failures
      const [leaderboardResult, marketResult] = await Promise.allSettled([
        fetchLeaderboard(),
        fetchMarket(),
      ]);

      if (leaderboardResult.status === "fulfilled") {
        setPlayers(leaderboardResult.value.players);
      }

      if (marketResult.status === "fulfilled") {
        setItems(marketResult.value.items);
      }

      // Only show error if both failed
      if (
        leaderboardResult.status === "rejected" &&
        marketResult.status === "rejected"
      ) {
        setError("Failed to load data. Some content may be unavailable.");
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Failed to load data:", err);
      setError(
        "Failed to load data. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();

    // Refresh data when coming back online
    const handleOnline = () => loadData(false);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const handleRefresh = () => {
    loadData(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400">
            Game Dashboard
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>
        </div>

        {isOffline && (
          <div className="bg-amber-900/50 border border-amber-700 rounded-lg p-4 mb-6 flex items-center gap-2">
            <WifiOff className="h-5 w-5 text-amber-400" />
            <p>
              You're offline. Displaying cached data. Some content may be
              unavailable.
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6 text-center">
            {error}
          </div>
        )}

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>Market</span>
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-400"></div>
            </div>
          ) : (
            <>
              <TabsContent value="leaderboard">
                <Leaderboard players={players} />
              </TabsContent>
              <TabsContent value="market">
                <Market items={items} />
              </TabsContent>
            </>
          )}
        </Tabs>

        <div className="mt-8 text-center text-sm text-slate-400">
          <p>This app works offline! Data is cached for use without internet.</p>
        </div>
      </div>
    </main>
  );
}