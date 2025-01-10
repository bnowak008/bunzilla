export function About() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>
        This is a modern web application created with Bunzilla. It includes:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>React with TypeScript</li>
        <li>React Router for navigation</li>
        <li>React Query for data fetching</li>
        <li>TailwindCSS for styling</li>
        <li>Vite for fast development</li>
      </ul>
    </div>
  );
} 