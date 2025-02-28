# ${projectName}

A modern monorepo project created with Bunzilla.

## Project Structure

```
├── apps/
│   ├── api/          # Backend API (Hono)
│   ├── api-elysia/   # Backend API (Elysia)
│   └── web/          # Frontend application
├── packages/
│   └── shared/       # Shared utilities, types, and API client
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start development servers:
   ```bash
   # Start frontend
   bun run dev

   # Start backend (in another terminal)
   # Using Hono
   bun run dev:api
   
   # OR using Elysia
   bun run dev:api:elysia
   ```

3. Generate type-safe API client (when using Elysia):
   ```bash
   bun run generate:types
   ```

## Type-Safe API Integration

This monorepo includes a type-safe API integration using Elysia.js and Eden:

- **Elysia.js**: Fast, type-safe web framework for the backend
- **Eden**: Type-safe API client generation
- **Treaty**: Shared type definitions between frontend and backend

The frontend can make type-safe API calls with full autocompletion:

```typescript
import { api } from './api/client';

// Type-safe API calls with autocompletion
const { data: users } = await api.api.users.get();
const { data: user } = await api.api.users['123'].get();
```

## Development

- `bun run dev`: Start the frontend development server
- `bun run dev:api`: Start the Hono API development server
- `bun run dev:api:elysia`: Start the Elysia API development server
- `bun run build`: Build all packages and applications
- `bun run build:apps:elysia`: Build frontend and Elysia API
- `bun run generate:types`: Generate type-safe API client
- `bun run test`: Run tests across all packages
- `bun run lint`: Run linter
- `bun run format`: Format code
- `bun run typecheck`: Type check all packages
