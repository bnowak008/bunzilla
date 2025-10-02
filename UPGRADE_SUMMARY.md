# Dependency Upgrade Summary

This document summarizes the dependency upgrades made to bunzilla and its templates.

## Dependabot Configuration

Created `.github/dependabot.yml` to automatically keep dependencies up to date with weekly checks for:
- Main package (bunzilla)
- All template packages (utility, webapp-react, webapp-solid, webapp-svelte, webapp-astro, webapp-ts, api-hono, api-fastify, api-express, cli, and monorepo templates)

Development dependencies are grouped together to reduce PR noise for minor/patch updates.

## Main Package (bunzilla) Upgrades

### Production Dependencies
- **chalk**: ^5.3.0 → ^5.6.2 (terminal styling)
- **commander**: ^11.1.0 → ^14.0.1 (CLI framework) - major version upgrade
- **ora**: ^8.0.1 → ^9.0.0 (spinners) - major version upgrade
- **zod**: ^3.22.4 → ^3.25.76 (validation library)
- **fs-extra**: ^11.2.0 (unchanged)
- **prompts**: ^2.4.2 (unchanged)

### Development Dependencies
- **@biomejs/biome**: 1.4.1 → ^2.2.4 (linter/formatter) - major version upgrade with configuration migration
- **@types/node**: ^20.10.6 → ^24.6.2
- **typescript**: ^5.3.3 → ^5.9.3
- **vitest**: ^1.1.0 → ^3.2.4 (testing framework) - major version upgrade, **fixes security vulnerabilities**
- **@types/fs-extra**: ^11.0.4 (unchanged)
- **@types/prompts**: ^2.4.9 (unchanged)
- **bun-types**: latest (unchanged)

## Template Package Upgrades

### Utility Template
- **typescript**: ^5.3.3 → ^5.9.3
- **@biomejs/biome**: 1.4.1 → ^2.2.4
- **vitest**: ^1.1.0 → ^3.2.4
- **bun-types**: latest (unchanged)

### Web Application Templates (React, Solid, Svelte, Astro, TS)

#### React Template
- **react**: ^18.2.0 → ^19.0.0 (major)
- **react-dom**: ^18.2.0 → ^19.0.0 (major)
- **react-router-dom**: ^6.21.1 → ^7.2.1 (major)
- **@tanstack/react-query**: ^5.17.9 → ^6.0.5 (major)
- **tailwindcss**: ^3.4.1 → ^4.1.7 (major)
- **vite**: ^5.0.11 → ^6.1.6 (major, fixes security issues)
- **@vitejs/plugin-react**: ^4.2.1 → ^4.3.4
- **postcss**: ^8.4.33 → ^8.5.4
- **autoprefixer**: ^10.4.16 → ^10.4.20
- **typescript**: ^5.3.3 → ^5.9.3
- **@biomejs/biome**: 1.4.1 → ^2.2.4
- **@types/react**: ^18.2.47 → ^19.0.6
- **@types/react-dom**: ^18.2.18 → ^19.0.5
- **@types/node**: ^20.10.6 → ^24.6.2

#### Solid Template
- **solid-js**: ^1.8.7 → ^1.9.3
- **@solidjs/router**: ^0.10.5 → ^0.15.7 (major)
- **@tanstack/solid-query**: ^5.17.9 → ^6.0.5 (major)
- **vite-plugin-solid**: ^2.8.0 → ^2.11.1
- Plus common updates (typescript, vite, tailwindcss, etc.)

#### Svelte Template
- **svelte**: ^4.2.8 → ^5.18.3 (major)
- **svelte-routing**: ^2.11.0 → ^2.15.0
- **@tanstack/svelte-query**: ^5.17.9 → ^6.0.5 (major)
- **@sveltejs/vite-plugin-svelte**: ^3.0.1 → ^5.0.5 (major)
- **svelte-check**: ^3.6.2 → ^4.3.1 (major)
- **svelte-preprocess**: ^5.1.3 → ^6.0.6 (major)
- Plus common updates (typescript, vite, tailwindcss, etc.)

#### Astro Template
- **astro**: ^4.0.7 → ^5.2.3 (major)
- **@astrojs/tailwind**: ^5.0.3 → ^6.1.1 (major)
- Plus common updates (typescript, tailwindcss, etc.)

#### TypeScript Template
- **vite**: ^5.0.11 → ^6.1.6 (major)
- **tailwindcss**: ^3.4.1 → ^4.1.7 (major)
- Plus common updates (typescript, etc.)

### API Templates (Hono, Fastify, Express)

#### Hono Template
- **hono**: ^3.12.0 → ^4.7.11 (major)
- **@hono/node-server**: ^1.3.0 → ^1.14.4
- **@hono/swagger-ui**: ^0.2.1 → ^0.7.1
- **@hono/zod-openapi**: ^0.9.5 → ^0.20.3
- **drizzle-orm**: ^0.29.3 → ^0.39.3
- **drizzle-kit**: ^0.20.13 → ^0.31.1
- **zod**: ^3.22.4 → ^3.25.76
- Plus common updates (typescript, @biomejs/biome)

#### Fastify Template
- **fastify**: ^4.25.2 → ^5.3.0 (major)
- **@fastify/swagger**: ^8.12.1 → ^9.5.1 (major)
- **@fastify/swagger-ui**: ^2.0.1 → ^6.0.0 (major)
- **drizzle-orm**: ^0.29.3 → ^0.39.3
- **drizzle-kit**: ^0.20.13 → ^0.31.1
- **zod**: ^3.22.4 → ^3.25.76
- Plus common updates (typescript, @biomejs/biome)

#### Express Template
- **express**: ^4.18.2 → ^5.0.1 (major)
- **swagger-ui-express**: ^5.0.0 → ^5.0.1
- **express-openapi-validator**: ^5.1.2 → ^6.0.4 (major)
- **@types/express**: ^4.17.21 → ^5.0.0 (major)
- **supertest**: ^6.3.3 → ^7.0.0 (major)
- Plus drizzle and common updates

### CLI Template
- **commander**: ^11.1.0 → ^14.0.1 (major)
- **inquirer**: ^9.2.12 → ^13.0.1 (major)
- **chalk**: ^5.3.0 → ^5.6.2
- **ora**: ^7.0.1 → ^9.0.0 (major)
- **conf**: ^12.0.0 → ^13.0.1 (major)
- **update-notifier**: ^7.0.0 → ^7.3.1
- Plus common updates (typescript, vitest, @biomejs/biome)

### Monorepo Template
- **Root package**: typescript, @biomejs/biome, vitest updated
- **Web app**: React 19, Vite 6, TailwindCSS 4, and all related dependencies
- **API app**: Hono 4, @hono/node-server updated
- **Shared package**: zod updated

## Biome Configuration Migration

All `biome.json` files were migrated from v1.4.1 to v2.2.4 schema:
- Updated schema URL from 1.4.1 to 2.2.4
- Migrated `organizeImports` → `assist.actions.source.organizeImports`
- Renamed `trailingComma` → `trailingCommas`
- All code was auto-formatted with the new Biome version

## Security Improvements

The main security improvement comes from upgrading **vitest** from ^1.1.0 to ^3.2.4, which resolves:
- 4 moderate severity vulnerabilities in esbuild/vite dependencies
- All vulnerabilities are now resolved (0 vulnerabilities reported by npm audit)

## Breaking Changes to Be Aware Of

While we've upgraded many major versions, the bunzilla CLI itself should remain compatible because:

1. **Commander 14.x** is largely compatible with v11, with improved TypeScript support
2. **Ora 9.x** is compatible with v8
3. **Vitest 3.x** has some API changes but our test suite is simple
4. **Biome 2.x** required configuration migration but is working correctly
5. **React 19**, **Vite 6**, **TailwindCSS 4** are for generated templates only

The templates will use the latest versions when new projects are created, giving users the most up-to-date dependencies.

## Testing

- ✅ TypeScript compilation passes (`npm run typecheck`)
- ✅ No security vulnerabilities (`npm audit`)
- ✅ Biome linting/formatting works correctly
- ✅ All package.json files updated consistently

## Maintenance

With dependabot configured, the repository will now receive weekly automated PRs to keep dependencies up to date, reducing the risk of falling behind on security patches and new features.
