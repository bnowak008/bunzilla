import './styles/global.css';

function init() {
  const app = document.querySelector<HTMLDivElement>('#app')!;
  
  app.innerHTML = `
    <div class="min-h-screen bg-gray-50">
      <main class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-4">Welcome to ${projectName}</h1>
        <p class="text-lg text-gray-600">
          This is a modern web application built with TypeScript and TailwindCSS.
        </p>
      </main>
    </div>
  `;
}

init(); 