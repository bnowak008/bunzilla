# ${projectName}

A modern monorepo project created with Bunzilla.

## Project Structure

```
├── apps/
│   ├── api/          # Backend API
│   └── web/          # Frontend application
├── packages/
│   └── shared/       # Shared utilities and types
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
   bun run --cwd apps/api dev
   ```

## Development

- `bun run dev`: Start the frontend development server
- `bun run build`: Build all packages and applications
- `bun run test`: Run tests across all packages
- `bun run lint`: Run linter
- `bun run format`: Format code
- `bun run typecheck`: Type check all packages
