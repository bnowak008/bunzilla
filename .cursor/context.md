# Project Context

## Overview
Bunzilla is a sophisticated project generator for Bun applications, offering multiple template types and evolution paths. It focuses on modern development practices and provides a flexible, extensible architecture.

## Key Components

### Template Manager
- Handles template processing and project creation
- Supports variable substitution in templates
- Manages file copying and directory structure
- Located in `src/utils/template-manager.ts`

### CLI Interface
- Interactive command-line interface
- Supports multiple commands: create, evolve, publish
- Handles user input and validation
- Progressive disclosure of options based on project type

### Project Types
1. Utility Package: Basic TypeScript library setup
2. Web Application: Modern frontend with multiple framework options
3. API Service: Backend service with various framework choices
4. CLI Tool: Command-line application template
5. Monorepo: Multi-package project structure

### Evolution System
- Allows projects to evolve between types
- Supports adding features to existing projects
- Handles dependency management during evolution
- Preserves existing code and configuration

## Technical Stack

### Core Technologies
- Bun for runtime and package management
- TypeScript for type safety
- Biome for formatting and linting
- Vitest for testing

### Template Technologies
- React/Solid/Svelte for web applications
- Hono/Fastify/Express for APIs
- TailwindCSS for styling
- Various utility libraries per template

## Development Workflow
1. Template Creation
   - Define template structure
   - Add configuration files
   - Include documentation
   - Set up build process

2. Command Implementation
   - Define command structure
   - Add validation
   - Implement business logic
   - Add error handling

3. Testing
   - Unit tests for utilities
   - Integration tests for commands
   - Template validation
   - Error case coverage

## Current Focus
- Improving template processing
- Enhancing evolution paths
- Adding new framework support
- Improving documentation
- CLI interface improvements

## Future Considerations
- Additional template types
- More framework options
- Enhanced monorepo support
- Improved testing utilities
- Better error handling
- Plugin system
