import { Router } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';
import { render } from 'solid-js/web';
import { App } from './App';
import './index.css';

const queryClient = new QueryClient();

render(
  () => (
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  ),
  document.getElementById('root')!
);
