<p align="center">
  <img src="public/bunzilla_logo.jpg" alt="Bunzilla Logo" width="400"/>
</p>

> A CLI tool for bootstrapping Bun projects with modern development practices and an awesome developer experience.

[![npm version](https://img.shields.io/npm/v/bunzilla.svg)](https://www.npmjs.com/package/bunzilla)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

## 🚀 Features

- 🎯 **Interactive CLI** - Guided project creation with smart defaults
- 📦 **Modern Templates** - Pre-configured templates for various project types
- 🛠️ **Best Practices** - TypeScript, testing, linting, and formatting out of the box
- 🔄 **Project Evolution** - Incrementally enhance your projects as they grow
- 🤖 **AI-Enhanced** - Smart scaffolding based on your project needs
- 📊 **Dependency Insights** - Make informed decisions about dependencies

## 🏃 Quick Start

```bash
# Install globally
npm install -g bunzilla

# Create a new project
bunzilla create my-awesome-project

# Or use with npx
npx bunzilla create my-awesome-project
```

## 📚 Available Templates

- 📦 **Utility Package** - Create reusable libraries and tools
- 🏢 **Monorepo** - Multi-package workspace setup
- 🌐 **Web App** - Modern web application with your choice of framework
- 🚀 **API** - Production-ready backend service
- ⚡ **CLI Tool** - Command-line interface applications

## 🛠️ Commands

### Create a New Project

```bash
bunzilla create [type] [options]

Options:
  --name        Project name
  --defaults    Skip prompts with default values
  --framework   Specify framework for APIs (hono/fastify/express)
  --frontend    Specify frontend stack (react/solid/svelte)
  --template    Use a custom template
```

### List Available Templates

```bash
bunzilla list
```

### Evolve Existing Project

```bash
bunzilla evolve [options]

Options:
  --add         Add specific features
  --convert     Convert project to a different type
```

### Manage Configuration

```bash
bunzilla config [options]

Options:
  --get         Get config value
  --set         Set config value
  --value       New value to set
  --list        List all config values
```

### Publish Project

```bash
bunzilla publish [options]

Options:
  --dry-run     Test the publishing process without actually publishing
```

## 🎨 Template Features

### Utility Package
- TypeScript configuration
- Testing with Vitest
- Linting with Biome
- Build configuration

### Monorepo
- Workspace configuration
- Shared configurations
- Independent versioning
- Build pipeline

### Web App
- Choice of React/Solid/Svelte
- TailwindCSS for styling
- File-based routing
- API integration

### API
- Choice of Hono/Fastify/Express
- OpenAPI documentation
- Authentication setup
- Database integration

### CLI Tool
- Command structure
- Interactive prompts
- Colorful output
- Error handling

## 🤝 Contributing

We love your input! Check out our [Contributing Guide](CONTRIBUTING.md) for ways to get started.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📝 License

MIT © [Your Name]

---

<p align="center">Made with 🍞 by the Bunzilla team</p>
