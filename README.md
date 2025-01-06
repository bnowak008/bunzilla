# 🦖 Bunzilla

<div align="center">

![Bunzilla Logo](https://raw.githubusercontent.com/bnowak008/bunzilla/refs/heads/main/assets/bunzilla_logo.jpg)

[![npm version](https://img.shields.io/npm/v/bunzilla.svg?style=for-the-badge&color=8C4660)](https://www.npmjs.com/package/bunzilla)
[![License: MIT](https://img.shields.io/badge/License-MIT-F2CA52.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-F27649.svg?style=for-the-badge)](http://makeapullrequest.com)

**The Ultimate Bun Project Generator**

</div>

## 🚀 Quick Start

```bash
# Create a new project
bunx bunzilla create my-awesome-app

# Navigate to your project
cd my-awesome-app

# Start development
bun dev
```

## ✨ Features

### 🎨 Web Apps
- React, Solid, or Svelte
- TailwindCSS & Shadcn
- TypeScript by Default
- Hot Module Replacement
- SEO Optimized

### 🚀 API Projects
- Hono, Fastify, or Express
- Drizzle ORM Integration
- JWT Authentication
- OpenAPI Documentation
- End-to-End Type Safety

### 📦 Utility Packages
- NPM Package Ready
- esbuild Pipeline
- Vitest Setup
- Automated Publishing
- TypeScript Config

### 🏢 Monorepos
- Workspace Management
- Shared Configurations
- Version Control
- CI/CD Integration
- Cross-Package Testing

## 🛠 Commands

### Create New Project
```bash
bunzilla create [type] --name my-app [options]
```

**Options:**
- `--type`: webapp | api | utility | monorepo | cli
- `--frontend`: react | solid | svelte
- `--framework`: hono | fastify | express
- `--defaults`: Skip prompts with default values

### Project Evolution
```bash
# Add CLI capabilities
bunzilla evolve --add cli

# Convert to monorepo
bunzilla evolve --convert monorepo
```

## 🔄 Evolution Paths

### Utility → CLI → Monorepo
Start with a simple utility package and evolve it into a CLI tool, then scale to a monorepo as needed.

### API → Full Stack → Monorepo
Begin with a backend API and gradually add frontend components, eventually splitting into a monorepo structure.

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