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

# Start development
bun dev
```

## 📦 Available Commands

### Create Project
```bash
bunzilla create [options]

Options:
  --name <name>     Project name
  --type <type>     Project type (utility|webapp|api|monorepo|cli)
  --frontend <fw>   Frontend framework for webapp (react|solid|svelte)
  --framework <fw>  API framework (hono|fastify|express)
  --defaults        Skip prompts and use defaults
```

### Evolve Project
```bash
bunzilla evolve [options]

Options:
  --add <feature>    Add features (cli|frontend|api)
  --convert <type>   Convert to different project type
  --project-dir <dir> Target project directory
```

### Manage Configuration
```bash
bunzilla config [options]

Options:
  --get <key>       Get config value
  --set <key> <value> Set config value
  --list            List all config values
  --delete <key>    Delete config value
```

## 🎨 Project Types

### Utility Package
- TypeScript configuration
- Testing with Vitest
- Linting with Biome
- Build configuration
- NPM publishing setup

### Web Application
- React, Solid, or Svelte
- TailwindCSS for styling
- React Router for navigation
- React Query for data fetching
- Vite for fast development

### API Service
- Hono, Fastify, or Express
- OpenAPI documentation
- JWT authentication
- Database integration with Drizzle
- End-to-end type safety

### CLI Tool
- Interactive command-line interface
- Configuration management
- Update notifications
- Progress spinners
- Colorful output

### Monorepo
- Workspace management
- Shared configurations
- Independent versioning
- Build pipeline
- Cross-package testing

## 🛠 Development Scripts

All projects include these common scripts:

```bash
bun run dev        # Start development
bun run build      # Build for production
bun run test       # Run tests
bun run lint       # Run linter
bun run format     # Format code
bun run typecheck  # Type check
```

## 🔧 Configuration

Bunzilla stores global configuration in `~/.bunzilla/config.json`. Default values:

```json
{
  "defaultTemplate": "utility",
  "defaultFramework": "hono",
  "defaultFrontend": "react"
}
```

## 🔄 Evolution Paths

### Utility → CLI
Start with a simple utility package and evolve it into a CLI tool:
```bash
# Create a utility package
bunzilla create my-package --type utility

# Later, add CLI capabilities
bunzilla evolve --add cli --project-dir my-package
```

### API → Full Stack
Begin with a backend API and gradually add frontend components:
```bash
# Create an API service
bunzilla create my-api --type api --framework hono

# Later, add frontend
bunzilla evolve --add frontend --project-dir my-api
```

### Single Package → Monorepo
Scale any project to a monorepo structure when needed:
```bash
# Convert existing project to monorepo
bunzilla evolve --convert monorepo --project-dir my-project
```

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