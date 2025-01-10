import type { Component } from 'solid-js';

export const Home: Component = () => {
  return (
    <div class="bg-white shadow rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to ${projectName}</h1>
      <p class="mb-4">
        This is a modern web application built with Solid.js, Solid Router,
        Solid Query, and TailwindCSS.
      </p>
    </div>
  );
}; 