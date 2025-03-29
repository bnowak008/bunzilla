# ${projectName}

A modern monorepo project created with Bunzilla, using a fully integrated Bun stack.

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: ElysiaJS API
- **Database**: SQLite with Drizzle ORM
- **Package Manager**: Bun

## Project Structure

```
├── apps/
│   ├── client/          # React/Vite frontend
│   └── server/          # ElysiaJS API with SQLite/Drizzle
├── packages/
│   └── shared/       # Shared utilities and types
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   bun install
   ```

2. Set up the database:
   ```bash
   # Generate database schema
   bun run --cwd apps/server db:generate

   # Push schema to database
   bun run --cwd apps/server db:push
   ```

3. Start development servers:
   ```bash
   # Start frontend
   bun run --cwd apps/client dev

   # Start backend (in another terminal)
   bun run --cwd apps/server dev
   ```

## Features

- **Type-Safe Database**: Drizzle ORM for type-safe database operations
- **API Documentation**: Swagger UI for API documentation
- **Shared Types**: Common types shared between frontend and backend
- **Hot Module Reloading**: Fast development with HMR

## Development

- `bun run dev`: Start all development servers
- `bun run build`: Build all packages and applications
- `bun run --cwd apps/server db:studio`: Open Drizzle Studio to manage your database
- `bun run typecheck`: Type check all packages