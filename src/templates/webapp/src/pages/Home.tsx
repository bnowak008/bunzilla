import { useState } from 'react';

export function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to ${projectName}</h1>
      <p className="mb-4">
        This is a modern web application built with React, React Router, React Query,
        and TailwindCSS.
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Count is {count}
      </button>
    </div>
  );
}