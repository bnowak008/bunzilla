import { Elysia } from 'elysia';

export const logger = () => {
  return new Elysia()
    .onRequest(({ request }) => {
      const start = performance.now();
      const { method, url } = request;
      
      console.log(`[${new Date().toISOString()}] ${method} ${url}`);
      
      // Store the start time for later use
      return { start };
    })
    .onResponse(({ request, response, store }) => {
      const end = performance.now();
      const duration = end - (store.start as number);
      const { method, url } = request;
      
      console.log(
        `[${new Date().toISOString()}] ${method} ${url} ${response.status} - ${duration.toFixed(2)}ms`
      );
    });
}; 