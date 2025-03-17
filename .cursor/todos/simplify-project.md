# Simplify CLI Project Creation Tool

## Goal
Streamline the CLI project creation tool to eliminate unnecessary options and focus exclusively on creating Bun-based monorepos with a predefined tech stack.

## Preferred Stack
- **Monorepo Structure**: Bun monorepo
- **Frontend**: React with Vite
- **Backend**: ElysiaJS API
- **Database**: SQLite with Drizzle ORM

## Implementation Tasks

### 1. Simplify Types
- [x] Update `ProjectType` to only support 'monorepo' or remove type selection entirely
- [x] Remove unused types like `WebAppFramework`, `ApiFramework`, and `MonorepoPackage`
- [x] Create a new simplified options interface for project creation

### 2. Update CLI Command
- [x] Modify the `create` command to only accept project name
- [x] Remove all other optional parameters (type, frontend, framework, packages)
- [x] Update command description to reflect the simplified functionality

### 3. Refactor Project Creation Logic
- [x] Update the `create` function in `src/commands/create/index.ts` to bypass option selection
- [x] Hardcode the project type as 'monorepo'
- [x] Hardcode the frontend as 'react'
- [x] Hardcode the backend as 'elysiajs' (add if not available)
- [x] Add SQLite with Drizzle setup to the backend template

### 4. Create or Update Templates
- [x] Ensure the monorepo template includes the proper structure
- [x] Update or create a React/Vite template for the frontend
- [x] Create an ElysiaJS template for the backend if not already available
- [x] Add Drizzle and SQLite integration to the backend template
- [x] Update shared package template to include common types and utilities

### 5. Update Documentation
- [x] Update README to reflect simplified usage
- [x] Update help text and CLI output messages
- [x] Add example commands and expected output

## Potential File Modifications
- `src/types.ts` - Simplify type definitions ✅
- `src/index.ts` - Update CLI command definition ✅
- `src/commands/create/index.ts` - Simplify project creation logic ✅
- Template files in `src/templates/` directory ✅

## Expected Usage After Changes
```bash
# Create a new project with the predefined stack
bunzilla create my-project

# Result: Bun monorepo with React/Vite frontend, ElysiaJS API backend with SQLite/Drizzle
```
