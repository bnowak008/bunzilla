<div align="center">

![Bunzilla Logo](https://raw.githubusercontent.com/bnowak008/bunzilla/refs/heads/main/assets/bunzilla_logo.jpg)

[![npm version](https://img.shields.io/npm/v/bunzilla.svg?style=for-the-badge&color=8C4660)](https://www.npmjs.com/package/bunzilla)
[![License: MIT](https://img.shields.io/badge/License-MIT-F2CA52.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-F27649.svg?style=for-the-badge)](http://makeapullrequest.com)

**The Ultimate Bun Project Generator**

</div>

## 🚀 Quick Start

```bash
# Option 1: Run directly with bunx
bunx bunzilla create my-awesome-app

# Option 2: Install globally
bun add -g bunzilla
bunzilla create my-awesome-app

# Navigate to your project
cd my-awesome-app

# Install dependencies
bun install

# Set up the database
bun run db:generate
bun run db:push

# Start development
bun run dev
```

## 📦 Available Commands

### Create Project
```bash
bunzilla create [name]

Arguments:
  name          Project name (will prompt if not provided)
```

Running `bunzilla create` will create a standardized monorepo with:
- React/Vite frontend
- ElysiaJS API
- SQLite database with Drizzle ORM

```bash
# Create a project
bunzilla create my-app

# Will create a monorepo with:
# 1. React/Vite frontend in apps/web
# 2. ElysiaJS API in apps/api with SQLite/Drizzle
# 3. Shared package in packages/shared
```

## 🛠 Tech Stack

### Frontend (apps/web)
- React with TypeScript
- Vite for fast development
- TailwindCSS for styling
- Type-safe API communication

### Backend (apps/api)
- ElysiaJS for API development
- SQLite database
- Drizzle ORM for type-safe database operations
- Swagger UI for API documentation

### Shared (packages/shared)
- Common types and utilities
- Shared between frontend and backend

## 🔧 Project Structure

```
├── apps/
│   ├── api/          # ElysiaJS API with SQLite/Drizzle
│   └── web/          # React/Vite frontend
├── packages/
│   └── shared/       # Shared utilities and types
└── package.json
```

## 🛠 Development Scripts

The monorepo includes these helpful scripts:

```bash
# Root level
bun run dev           # Start all development servers
bun run build         # Build all packages and applications
bun run db:generate   # Generate database schema
bun run db:push       # Push schema to database
bun run db:studio     # Open Drizzle Studio
bun run setup         # Install dependencies and set up database

# Frontend (in apps/web directory)
bun run --cwd apps/web dev       # Start frontend server

# Backend (in apps/api directory)
bun run --cwd apps/api dev       # Start API server
```

## 🔧 Configuration

Bunzilla uses a simplified approach with an opinionated project structure.

## 🤝 Contributing

We welcome contributions! Feel free to:
- Submit bug reports
- Propose new features
- Create pull requests
- Improve documentation

## 📝 License

MIT © Bunzilla

---

<div align="center">

Built with ❤️ by developers, for developers

[GitHub](https://github.com/bnowak008/bunzilla) • [Discord](https://discord.gg/bunzilla) • [Twitter](https://twitter.com/bunzilla)

</div>