<template>
  <header>
    <div class="header-inner">
      <RouterLink to="/" class="logo">GH</RouterLink>
      <nav>
        <RouterLink to="/">Hjem</RouterLink>
        <RouterLink to="/projects">Projekter</RouterLink>
        <RouterLink to="/skills">Kompetencer</RouterLink>
        <RouterLink to="/experience">Erfaring</RouterLink>
        <RouterLink to="/education">Uddannelse</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background: #0f0f1a;
  border-bottom: 1px solid #22223a;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;
}

.logo {
  color: #4fc3f7;
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 0.02em;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 0.25rem;
}

nav a {
  color: #ccc;
  text-decoration: none;
  padding: 1rem 0.75rem;
  display: block;
  font-size: 0.9rem;
  transition: color 0.2s;
}

nav a:hover,
nav a.router-link-exact-active {
  color: #fff;
}

nav a.router-link-exact-active {
  color: #4fc3f7;
  border-bottom: 2px solid #4fc3f7;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
