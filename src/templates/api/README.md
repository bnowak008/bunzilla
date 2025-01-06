# ${projectName}

A modern API created with Bunzilla.

## Features

- Hono for fast API development
- OpenAPI documentation with Swagger UI
- Database integration with Drizzle ORM
- JWT authentication
- Request validation with Zod
- Testing with Vitest and Supertest
- Biome for linting and formatting

## Getting Started

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Update environment variables in `.env`

3. Install dependencies:
   ```bash
   bun install
   ```

4. Generate database schema:
   ```bash
   bun run db:generate
   ```

5. Push schema to database:
   ```bash
   bun run db:push
   ```

6. Start development server:
   ```bash
   bun run dev
   ```

7. View API documentation at `http://localhost:3000/docs`

## Development

- `bun run dev`: Start development server
- `bun run build`: Build for production
- `bun run start`: Start production server
- `bun run test`: Run tests
- `bun run lint`: Run linter
- `bun run format`: Format code
- `bun run typecheck`: Type check
- `bun run db:generate`: Generate database schema
- `bun run db:push`: Push schema to database
- `bun run db:studio`: Open Drizzle Studio
