# Luxora Market 🛍️✨

Luxora Market is a premium, high-performance e-commerce web application built with modern React. It focuses on delivering a visually stunning, deeply interactive, and buttery-smooth user experience across all devices.

## 🚀 Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS (with custom utility extensions)
- **Animations:** Framer Motion (for fluid micro-interactions and ambient backgrounds)
- **State Management:** React Context API (Modular contexts for Cart, Wishlist, Theme, and User state)
- **Icons:** React Icons (Feather Icons)

## ✨ Core Features & Workflow

### 1. Ambient & Responsive UI
- **Global Animated Background:** A custom-built, fixed 3D animated background powered by Framer Motion. It features floating geometric shapes, glowing orbs, and a subtle watermark that dynamically adjusts its opacity and blend modes based on whether the user is in Light or Dark mode.
- **Glassmorphism & Layout Hardening:** Extensive use of glassy, blurred elements for navigation and cards. The layout is strictly controlled to eliminate unwanted scrollbars and overflow, ensuring the application feels like a native app.
- **Dark/Light Mode:** Seamless, real-time toggling between themes with carefully curated color palettes.

### 2. Intelligent Navigation & Search
- **Responsive Navbar:** Features a glassy floating pill design on desktop that transitions dynamically on scroll, and a sleek slide-out drawer for mobile devices.
- **Live Search Filtering:** Real-time product search functionality integrated directly into both the desktop dropdown and mobile drawer. It instantly matches user queries against product names, brands, and categories without requiring a page reload.

### 3. Shopping Workflow (Cart & Wishlist)
- **Fluid Interactions:** Items can be seamlessly added to the Wishlist or Shopping Cart. 
- **Smart State Management:** Moving an item from the Wishlist to the Cart automatically removes it from the Wishlist to prevent duplication, accompanied by a visual state change.
- **Mobile-Optimized UX:** Essential interactions like "Liking" an item are optimized for touch devices, bypassing hover-only states to provide immediate visual feedback.

### 4. Dynamic Routing
- Supports standard e-commerce routing including a dynamic Product Details page (`/products/:slug`), specialized dashboard tabs, and seamless anchor scrolling.

## 📦 Project Structure

```text
src/
├── components/
│   ├── home/       # Landing page components (Hero, ProductCard, etc.)
│   ├── layout/     # Structural components (Navbar, Footer, etc.)
│   └── ui/         # Reusable UI elements (GlobalBackground, Container, etc.)
├── context/        # React Context providers (Cart, Wishlist, Theme, User)
├── data/           # Mock data and local storage templates
├── pages/          # Route-level components (Home, Product, Dashboard, etc.)
├── App.jsx         # Main application router and wrapper
└── index.css       # Global styles and Tailwind directives
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

*Note: The project is configured with a custom base path (`/LuxoraGift-ReactApp/`) in `vite.config.js` for deployment purposes. All static assets in the `public` folder correctly utilize Vite's `BASE_URL` to ensure they resolve across environments.*
