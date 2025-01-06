<style>
:root {
  --primary: #8C4660;
  --secondary: #F2CA52;
  --accent-1: #F29849;
  --accent-2: #F27649;
  --accent-3: #F25D50;
  --text: #2D3748;
  --text-light: #4A5472;
  --bg: #ffffff;
  --bg-alt: #F8F9FC;
  --border: #E6E8F0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary: #8C4660;
    --secondary: #F2CA52;
    --accent-1: #F29849;
    --accent-2: #F27649;
    --accent-3: #F25D50;
    --text: #F8F9FC;
    --text-light: #A0A8C3;
    --bg: #1A1E2E;
    --bg-alt: #252B3D;
    --border: #2F3850;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: var(--text);
  background: var(--bg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.splash {
  position: relative;
  padding: 6rem 2rem;
  margin: -2rem -2rem 4rem;
  background: linear-gradient(180deg, 
    #232b44 0%,
    #8C4660 25%,
    #F25D50 40%,
    #F2CA52 47%,
    #F25D50 54%,
    #8C4660 75%,
    #232b44 100%
  );
  text-align: center;
  overflow: hidden;
  color: white;
}

.splash::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg,
    rgba(242, 152, 73, 0.03) 0%,
    rgba(242, 202, 82, 0.05) 50%,
    rgba(242, 152, 73, 0.03) 100%
  );
  mix-blend-mode: soft-light;
}

.logo {
  position: relative;
  z-index: 1;
  width: 500px;
  max-width: 90%;
  margin: 0 auto 4rem;
}

.logo img {
  width: 100%;
  height: auto;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15));
}

.title {
  position: relative;
  z-index: 1;
  font-size: 4rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  position: relative;
  z-index: 1;
  font-size: 1.5rem;
  margin: 1rem 0 3rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 400;
}

.badges {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-start {
  position: relative;
  margin-top: -3rem;
  background: var(--bg);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  z-index: 2;
}

.terminal {
  background: #282c34;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #21252b;
  border-bottom: 1px solid #181a1f;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.terminal-dot:nth-child(1) { background: #ff5f56; }
.terminal-dot:nth-child(2) { background: #ffbd2e; }
.terminal-dot:nth-child(3) { background: #27c93f; }

.terminal-content {
  padding: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #abb2bf;
}

.command {
  display: flex;
  margin: 0.75rem 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  align-items: center;
}

.prompt {
  color: #F2CA52;
  margin-right: 1rem;
  font-weight: bold;
  user-select: none;
}

.command-text {
  color: #e6e6e6;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.feature-card {
  position: relative;
  padding: 2rem;
  background: var(--bg);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 32px rgba(140, 70, 96, 0.15);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(to right,
    rgba(242, 118, 73, 0.7) 0%,
    rgba(242, 202, 82, 0.7) 100%
  );
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-title {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.feature-item::before {
  content: '→';
  color: var(--accent-1);
}

.commands {
  margin: 4rem 0;
}

.command-group {
  background: var(--bg);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.command-group:hover {
  box-shadow: 0 8px 32px rgba(140, 70, 96, 0.15);
}

.command-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border);
}

.command-title {
  color: var(--primary);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.command-body {
  padding: 1.5rem;
}

.command-example {
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-size: 0.95rem;
  padding: 1rem;
  background: #282c34;
  color: #abb2bf;
  border-radius: 8px;
  margin: 1rem 0;
}

.command-example .command {
  margin: 0.5rem 0;
}

.evolution {
  margin: 4rem 0;
}

.evolution-card {
  background: var(--bg);
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  transition: all 0.3s ease;
}

.evolution-card:hover {
  box-shadow: 0 8px 32px rgba(140, 70, 96, 0.15);
}

.evolution-title {
  background: linear-gradient(to right, var(--primary), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.evolution-steps {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  padding-bottom: 1rem;
}

.evolution-step {
  flex: 1;
  text-align: center;
  padding: 1rem;
  background: linear-gradient(135deg,
    rgba(140, 70, 96, 0.03) 0%,
    rgba(242, 152, 73, 0.03) 100%
  );
  border: 1px solid rgba(140, 70, 96, 0.1);
  border-radius: 8px;
  position: relative;
}

.evolution-step:not(:last-child)::after {
  content: '→';
  position: absolute;
  right: -1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-1);
  font-size: 1.2rem;
}

.footer {
  margin-top: 6rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.footer-link {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--accent-2);
}

code {
  background: #282c34;
  color: #e6e6e6;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}
</style>

<div class="container">
  <div class="splash">
    <div class="logo">
      <img src="public/bunzilla_logo.jpg" alt="Bunzilla" />
    </div>
    <p class="subtitle">The Ultimate Bun Project Generator</p>
    <div class="badges">
      <a href="https://www.npmjs.com/package/bunzilla">
        <img src="https://img.shields.io/npm/v/bunzilla.svg?style=for-the-badge&color=8C4660" alt="npm version" />
      </a>
      <a href="https://opensource.org/licenses/MIT">
        <img src="https://img.shields.io/badge/License-MIT-F2CA52.svg?style=for-the-badge" alt="License: MIT" />
      </a>
      <a href="http://makeapullrequest.com">
        <img src="https://img.shields.io/badge/PRs-welcome-F27649.svg?style=for-the-badge" alt="PRs Welcome" />
      </a>
    </div>
  </div>

  <div class="quick-start">
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
      </div>
      <div class="terminal-content">
        <div class="command">
          <span class="prompt">$</span>
          <span class="command-text">bunx bunzilla create my-awesome-app</span>
        </div>
        <div class="command">
          <span class="prompt">$</span>
          <span class="command-text">cd my-awesome-app</span>
        </div>
        <div class="command">
          <span class="prompt">$</span>
          <span class="command-text">bun dev</span>
        </div>
      </div>
    </div>
  </div>

  <div class="features">
    <div class="feature-card">
      <div class="feature-icon">🎨</div>
      <h3 class="feature-title">Web Apps</h3>
      <ul class="feature-list">
        <li class="feature-item">React, Solid, or Svelte</li>
        <li class="feature-item">TailwindCSS & Shadcn</li>
        <li class="feature-item">TypeScript by Default</li>
        <li class="feature-item">Hot Module Replacement</li>
        <li class="feature-item">SEO Optimized</li>
      </ul>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🚀</div>
      <h3 class="feature-title">API Projects</h3>
      <ul class="feature-list">
        <li class="feature-item">Hono, Fastify, or Express</li>
        <li class="feature-item">Drizzle ORM Integration</li>
        <li class="feature-item">JWT Authentication</li>
        <li class="feature-item">OpenAPI Documentation</li>
        <li class="feature-item">End-to-End Type Safety</li>
      </ul>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📦</div>
      <h3 class="feature-title">Utility Packages</h3>
      <ul class="feature-list">
        <li class="feature-item">NPM Package Ready</li>
        <li class="feature-item">esbuild Pipeline</li>
        <li class="feature-item">Vitest Setup</li>
        <li class="feature-item">Automated Publishing</li>
        <li class="feature-item">TypeScript Config</li>
      </ul>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🏢</div>
      <h3 class="feature-title">Monorepos</h3>
      <ul class="feature-list">
        <li class="feature-item">Workspace Management</li>
        <li class="feature-item">Shared Configurations</li>
        <li class="feature-item">Version Control</li>
        <li class="feature-item">CI/CD Integration</li>
        <li class="feature-item">Cross-Package Testing</li>
      </ul>
    </div>
  </div>

  <div class="commands">
    <div class="command-group">
      <div class="command-header">
        <h3 class="command-title">Create New Project</h3>
      </div>
      <div class="command-body">
        <div class="command-example">
          <div class="command">
            <span class="prompt">$</span>
            <span class="command-text">bunzilla create [type] --name my-app [options]</span>
          </div>
        </div>
        <p>Available options:</p>
        <ul>
          <li><code>--type</code>: webapp | api | utility | monorepo | cli</li>
          <li><code>--frontend</code>: react | solid | svelte</li>
          <li><code>--framework</code>: hono | fastify | express</li>
          <li><code>--defaults</code>: Skip prompts with default values</li>
        </ul>
      </div>
    </div>
    <div class="command-group">
      <div class="command-header">
        <h3 class="command-title">Project Evolution</h3>
      </div>
      <div class="command-body">
        <div class="command-example">
          <div class="command">
            <span class="prompt">$</span>
            <span class="command-text">bunzilla evolve --add cli</span>
          </div>
          <div class="command">
            <span class="prompt">$</span>
            <span class="command-text">bunzilla evolve --convert monorepo</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="evolution">
    <div class="evolution-card">
      <h3 class="evolution-title">Evolution Paths</h3>
      <div class="evolution-steps">
        <div class="evolution-step">Utility Package</div>
        <div class="evolution-step">CLI Tool</div>
        <div class="evolution-step">Monorepo</div>
      </div>
      <div class="evolution-steps">
        <div class="evolution-step">API</div>
        <div class="evolution-step">Full Stack</div>
        <div class="evolution-step">Monorepo</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <h3>Join the Bunzilla Community</h3>
    <p>Built with ❤️ by developers, for developers</p>
    <div class="footer-links">
      <a href="https://github.com/yourusername/bunzilla" class="footer-link">GitHub</a>
      <a href="https://discord.gg/bunzilla" class="footer-link">Discord</a>
      <a href="https://twitter.com/bunzilla" class="footer-link">Twitter</a>
    </div>
  </div>
</div>
