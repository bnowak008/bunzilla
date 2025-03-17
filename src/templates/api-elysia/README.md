# ${projectName} API

A modern API backend created with ElysiaJS, SQLite, and Drizzle ORM.

## Features

- **ElysiaJS** - Fast, lightweight TypeScript framework for Bun
- **SQLite** - Embedded database for quick setup and development
- **Drizzle ORM** - Type-safe database operations
- **Swagger UI** - API documentation

## Getting Started

```bash
# Install dependencies
bun install

# Generate database schema
bun run db:generate

# Push schema to database
bun run db:push

# Start development server
bun run dev
```

## Database Management

This project uses SQLite with Drizzle ORM for database operations:

- `bun run db:generate` - Generate migration files
- `bun run db:push` - Apply schema changes to the database
- `bun run db:studio` - Open Drizzle Studio to manage your database

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /api/todos` - List all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo

## Available Scripts

- `bun run dev` - Start development server with hot reloading
- `bun run start` - Start production server
- `bun run build` - Build for production 