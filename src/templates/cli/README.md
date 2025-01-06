# ${projectName}

A modern command-line tool created with Bunzilla.

## Features

- Interactive command-line interface
- Configuration management
- Update notifications
- Progress spinners
- Colorful output
- TypeScript support
- Testing with Vitest
- Biome for linting and formatting

## Installation

```bash
bun add -g ${projectName}
```

## Usage

Initialize a new project:
```bash
${projectName} init
```

Manage configuration:
```bash
# View all config
${projectName} config --list

# Set config value
${projectName} config --set key value

# Get config value
${projectName} config --get key

# Delete config value
${projectName} config --delete key
```

## Development

1. Install dependencies:
   ```bash
   bun install
   ```

2. Start development:
   ```bash
   bun run dev
   ```

3. Build for production:
   ```bash
   bun run build
   ```

## Available Scripts

- `bun run dev`: Start development
- `bun run build`: Build for production
- `bun run start`: Start production build
- `bun run test`: Run tests
- `bun run lint`: Run linter
- `bun run format`: Format code
- `bun run typecheck`: Type check
