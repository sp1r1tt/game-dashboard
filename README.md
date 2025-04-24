# Game Dashboard

Game Dashboard is a Progressive Web App (PWA) built with Next.js and Tailwind CSS, designed to display a game leaderboard and market items. The application supports offline functionality, caching data for seamless use without an internet connection. It provides a responsive, dark-themed user interface with tabs for navigating between the leaderboard and market sections.

## Features

- **Leaderboard**: Displays player rankings with details like username, level, XP, and gold. Top players (ranks 1-3) are highlighted with trophy icons.
- **Market**: Showcases available in-game items with details such as name, type, description, and cost. Items are visually distinguished by type with color-coded styling.
- **Offline Support**: Utilizes service workers and caching to display cached data when offline, with a notification for offline status.
- **Data Refresh**: Includes a refresh button to fetch the latest data, with a loading spinner for user feedback.
- **Responsive Design**: Optimized for both mobile and desktop devices using Tailwind CSS.
- **Dark Theme**: Implements a dark theme by default using the `next-themes` library for a sleek, modern look.
- **Error Handling**: Gracefully handles API failures and network issues, displaying appropriate error messages.
- **PWA Features**: Installable on devices with a manifest file and service worker for offline capabilities.

## Technologies Used

The project leverages modern web development technologies to ensure performance, scalability, and maintainability:

- **Next.js (v15.2.4)**:
  - A React framework for server-side rendering (SSR), static site generation (SSG), and client-side rendering.
  - Used for structuring the app, handling routing, and optimizing performance with features like API routes and image optimization.
  - The `app` directory is used for the App Router, enabling modern Next.js features like React Server Components.

- **React (v19)**:
  - The core library for building the user interface with reusable components.
  - Hooks like `useState` and `useEffect` manage state and side effects, such as fetching data and handling online/offline status.

- **TypeScript**:
  - Adds static typing to JavaScript, improving code reliability and developer experience.
  - Used for defining interfaces (`Player`, `MarketItem`) and ensuring type safety across the application.

- **Tailwind CSS (v3.4.17)**:
  - A utility-first CSS framework for rapid UI development.
  - Customizes the app's dark theme with CSS variables defined in `globals.css`.
  - Extended with plugins like `tailwindcss-animate` for animations (e.g., accordion effects).

- **Shadcn/ui**:
  - A collection of reusable, customizable UI components built with Radix UI and Tailwind CSS.
  - Components like `Tabs`, `Button`, and `Card` are used for the leaderboard and market UI.
  - Configured via `components.json` to integrate seamlessly with the project.

- **Lucide React**:
  - Provides a set of customizable icons (e.g., `Trophy`, `ShoppingBag`, `WifiOff`) used throughout the UI for visual enhancement.

- **Next PWA (v5.6.0)**:
  - Integrates Progressive Web App features using the `next-pwa` plugin.
  - Configures service workers and caching strategies (`NetworkFirst` for API calls, `StaleWhileRevalidate` for the homepage) in `next.config.js`.
  - Includes a `manifest.json` file for app installation and metadata.

- **Next Themes (v0.4.4)**:
  - Manages the dark theme with the `ThemeProvider` component, enforcing a dark mode by default (`enableSystem={false}`).

- **Class Variance Authority (CVA)** and `tailwind-merge`**:
  - `CVA` enables variant-based styling for components, ensuring consistent design patterns.
  - `tailwind-merge` merges Tailwind classes safely, used in the `cn` utility function for dynamic class composition.

- **Other Dependencies**:
  - `clsx`: Simplifies conditional class name concatenation.
  - `react-hook-form`: Included for potential form handling (not used in the current codebase but available for future features).
  - `autoprefixer` and `postcss`: Enhance CSS compatibility and processing.


## Installation and Setup

To run the project locally, follow these steps:

### Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Included with Node.js, or use `pnpm`/`yarn` if preferred.
- A modern web browser (Chrome, Firefox, Edge, etc.) for PWA testing.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sp1r1tt/game-dashboard.git
   cd game-dashboard
   Install Dependencies:
   npm install
   un the Development Server:
   npm run dev
   The app will be available at http://localhost:3000.
   Build for Production:
   npm run build
   npm run start
   
## Usage

To interact with the Game Dashboard, follow these steps:

- **Access the App**: Open the app in a browser at `http://localhost:3000` during development.
- **Navigate Tabs**: Use the "Leaderboard" and "Market" tabs to switch between views displaying player rankings and market items.
- **Refresh Data**: Click the "Refresh" button to fetch the latest data from the API. A loading spinner indicates the refresh is in progress.
- **Offline Mode**: Disconnect from the internet to test offline functionality. Cached data will be displayed, and an offline warning will appear in the UI.
- **Install as PWA**: On supported browsers, look for the "Install" prompt or add the app to your home screen (on mobile devices) to use it as a standalone application.

## API Integration

The Game Dashboard fetches data from the following API endpoints:

- **Leaderboard**: `https://api-game.bloque.app/game/leaderboard`
  - **Response**: Returns a `LeaderboardResponse` containing an array of `Player` objects with details like rank, username, level, XP, and gold.
- **Market**: `https://api-game.bloque.app/game/market`
  - **Response**: Returns a `MarketResponse` containing an array of `MarketItem` objects with details like id, name, type, description, and cost.

The `fetchLeaderboard` and `fetchMarket` functions in `lib/api.ts` manage data retrieval with the following features:

- **API Requests with Retry Logic**: Automatically retries failed API requests up to 2 times to handle transient network issues.
- **Caching**: Uses the Cache API to store responses, enabling offline access to previously fetched data.
- **Error Handling**: Falls back to empty data (`{ players: [] }` or `{ items: [] }`) when offline and no cached data is available, with user-friendly error messages displayed in the UI.
