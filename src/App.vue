<template>
  <header>
    <nav>
      <RouterLink to="/">Hjem</RouterLink>
      <RouterLink to="/projects">Projekter</RouterLink>
      <RouterLink to="/skills">Kompetencer</RouterLink>
      <RouterLink to="/experience">Erfaring</RouterLink>
      <RouterLink to="/education">Uddannelse</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  background: #1a1a2e;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

nav {
  display: flex;
  gap: 0.25rem;
  max-width: 900px;
  margin: 0 auto;
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
nav a.router-link-active {
  color: #fff;
}

nav a.router-link-active {
  border-bottom: 2px solid #4fc3f7;
}

nav a.admin-link {
  margin-left: auto;
  color: #666;
  font-size: 0.8rem;
}

nav a.admin-link:hover {
  color: #aaa;
}

main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>
