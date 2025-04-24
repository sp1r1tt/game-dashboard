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

## Project Structure

The project follows a standard Next.js structure with additional organization for components, utilities, and configuration:
