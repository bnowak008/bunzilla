import type { Component } from 'solid-js';
import { Routes, Route } from '@solidjs/router';
import { Home } from './pages/Home';
import { About } from './pages/About';

export const App: Component = () => {
  return (
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex justify-between h-16">
            <a href="/" class="flex items-center">
              <span class="text-xl font-bold">My App</span>
            </a>
            <div class="flex items-center space-x-4">
              <a href="/" class="text-gray-700 hover:text-gray-900">Home</a>
              <a href="/about" class="text-gray-700 hover:text-gray-900">About</a>
            </div>
          </div>
        </div>
      </nav>
      <main class="max-w-7xl mx-auto py-6 px-4">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </Routes>
      </main>
    </div>
  );
}; 