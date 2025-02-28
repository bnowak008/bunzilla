# ${projectName} API

A modern API built with [Elysia.js](https://elysiajs.com/) and [Bun](https://bun.sh/).

## Features

- 🦊 **Elysia.js** - Fast, type-safe web framework
- 📚 **Swagger/OpenAPI** - API documentation
- 🔄 **Eden** - Type-safe API client generation
- 🛡️ **TypeScript** - Type safety throughout the codebase
- 🧪 **Testing** - Built-in testing setup

## Getting Started

### Development

```bash
# Start development server with hot reload
bun run dev
```

The server will be running at http://localhost:3000.

### API Documentation

Swagger documentation is available at http://localhost:3000/swagger.

### Type Generation

Generate Eden client types:

```bash
# From the root of the monorepo
bun run generate:types
```

This will:
1. Generate types for the API
2. Generate types for the shared package
3. Enable type-safe API calls from the frontend

### Building for Production

```bash
# Build the project
bun run build

# Start the production server
bun run start
```

## Project Structure

```
src/
├── index.ts           # Main application entry point
├── middleware/        # Middleware functions
├── routes/            # API routes
├── scripts/           # Utility scripts
└── types/             # TypeScript type definitions
``` 