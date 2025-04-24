import type { LeaderboardResponse, MarketResponse } from "./types"

const API_BASE_URL = "https://api-game.bloque.app/game"

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json() as Promise<T>
}

// Fetch leaderboard data with retry mechanism
export async function fetchLeaderboard(retries = 2): Promise<LeaderboardResponse> {
  try {
    // Try to get from cache first if offline
    if (!navigator.onLine && "caches" in window) {
      try {
        const cache = await caches.open("game-data")
        const cachedResponse = await cache.match(`${API_BASE_URL}/leaderboard`)
        if (cachedResponse) {
          return handleResponse<LeaderboardResponse>(cachedResponse)
        }
      } catch (cacheError) {
        console.warn("Cache error:", cacheError)
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/leaderboard`, {
        // Add cache control headers
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      // Clone the response before consuming it
      if ("caches" in window) {
        try {
          const cache = await caches.open("game-data")
          const responseToCache = response.clone()
          await cache.put(`${API_BASE_URL}/leaderboard`, responseToCache)
        } catch (cacheError) {
          console.warn("Failed to cache response:", cacheError)
        }
      }

      // Now consume the original response
      return handleResponse<LeaderboardResponse>(response)
    } catch (fetchError) {
      // Retry logic
      if (retries > 0) {
        console.log(`Retrying leaderboard fetch, ${retries} attempts left`)
        return fetchLeaderboard(retries - 1)
      }
      throw fetchError
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error)

    // If offline and no cached data, return empty data
    if (!navigator.onLine) {
      return { players: [] }
    }

    throw error
  }
}

// Fetch market data with retry mechanism
export async function fetchMarket(retries = 2): Promise<MarketResponse> {
  try {
    // Try to get from cache first if offline
    if (!navigator.onLine && "caches" in window) {
      try {
        const cache = await caches.open("game-data")
        const cachedResponse = await cache.match(`${API_BASE_URL}/market`)
        if (cachedResponse) {
          return handleResponse<MarketResponse>(cachedResponse)
        }
      } catch (cacheError) {
        console.warn("Cache error:", cacheError)
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/market`, {
        // Add cache control headers
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      })

      // Clone the response before consuming it
      if ("caches" in window) {
        try {
          const cache = await caches.open("game-data")
          const responseToCache = response.clone()
          await cache.put(`${API_BASE_URL}/market`, responseToCache)
        } catch (cacheError) {
          console.warn("Failed to cache response:", cacheError)
        }
      }

      // Now consume the original response
      return handleResponse<MarketResponse>(response)
    } catch (fetchError) {
      // Retry logic
      if (retries > 0) {
        console.log(`Retrying market fetch, ${retries} attempts left`)
        return fetchMarket(retries - 1)
      }
      throw fetchError
    }
  } catch (error) {
    console.error("Error fetching market:", error)

    // If offline and no cached data, return empty data
    if (!navigator.onLine) {
      return { items: [] }
    }

    throw error
  }
}
