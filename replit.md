# replit.md

## Overview

This is a restaurant/fast-food website with an online booking system. It's a full-stack TypeScript application with a React frontend and Express backend. The main feature is a booking form that saves reservations to a PostgreSQL database and sends the booking details via WhatsApp. The site includes sections for About, Menu (with image gallery/lightbox), Gallery, and Contact.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, built with Vite
- **Routing**: Wouter (lightweight client-side router) — single-page app with Home and 404 pages
- **Styling**: Tailwind CSS with CSS variables for theming. Uses a "Premium Fast Food" color palette with amber (#FFC107) as the primary color and dark (#1A1A1A) as the secondary
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives — comprehensive component library already installed in `client/src/components/ui/`
- **Forms**: react-hook-form with Zod validation via @hookform/resolvers
- **Animations**: Framer Motion for page transitions, scroll animations, and lightbox
- **Data Fetching**: TanStack React Query for server state management
- **Fonts**: Oswald (display/headings) and DM Sans (body text), configured via CSS variables `--font-display` and `--font-body`
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend
- **Framework**: Express 5 on Node.js with TypeScript (run via tsx)
- **API Design**: Type-safe API contracts defined in `shared/routes.ts` using Zod schemas — both client and server import the same route definitions
- **Server entry**: `server/index.ts` creates an HTTP server, registers routes, and serves static files in production or uses Vite dev server middleware in development
- **Build**: Custom build script (`script/build.ts`) using esbuild for server bundling and Vite for client bundling. Output goes to `dist/`

### Database
- **Database**: PostgreSQL (required — `DATABASE_URL` environment variable must be set)
- **ORM**: Drizzle ORM with `drizzle-zod` for automatic Zod schema generation from database tables
- **Schema**: Defined in `shared/schema.ts` — currently has a `bookings` table with fields: id, name, email, phone, date, time, guests, message, createdAt
- **Migrations**: Use `npm run db:push` (drizzle-kit push) to sync schema to database
- **Connection**: Uses `pg` Pool via `server/db.ts`

### Storage Pattern
- `server/storage.ts` defines an `IStorage` interface and `DatabaseStorage` implementation — this abstraction layer sits between routes and the database

### Shared Code
- `shared/schema.ts`: Database schema definitions and Zod validation schemas
- `shared/routes.ts`: API route contracts (paths, methods, input/output schemas) shared between client and server

## External Dependencies

- **PostgreSQL**: Required database, connected via `DATABASE_URL` environment variable
- **WhatsApp Integration**: On successful booking, the client opens WhatsApp Web (`wa.me/8552997625`) with a pre-formatted booking message — no API key needed, uses direct URL
- **Google Fonts**: Oswald and DM Sans fonts loaded from Google Fonts CDN
- **Replit Plugins**: Vite plugins for runtime error overlay, cartographer, and dev banner (development only, when running on Replit)
- **No authentication**: The app currently has no auth system — bookings are created without user accounts