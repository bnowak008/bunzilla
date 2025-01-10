/// <reference types="vite/client" />
/// <reference types="solid-js" />
/// <reference types="@solidjs/router" />

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
} 