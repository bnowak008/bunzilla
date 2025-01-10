<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
</script>

<Router>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <Link to="/" class="flex items-center">
          <span class="text-xl font-bold">My App</span>
        </Link>
        <div class="flex items-center space-x-4">
          <Link to="/" class="text-gray-700 hover:text-gray-900">Home</Link>
          <Link to="/about" class="text-gray-700 hover:text-gray-900">About</Link>
        </div>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto py-6 px-4">
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </main>
</Router> 