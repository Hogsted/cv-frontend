<template>
  <div class="home">
    <section class="hero">
      <div class="hero-left">
        <h1>{{ profile.fullName }}</h1>
        <p class="title">{{ profile.title }}</p>
        <p class="bio">{{ profile.bio }}</p>

        <div class="links">
          <a v-if="profile.gitHubUrl" :href="profile.gitHubUrl" target="_blank" rel="noopener" class="link-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
            GitHub
          </a>
          <a v-if="profile.linkedInUrl" :href="profile.linkedInUrl" target="_blank" rel="noopener" class="link-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
          <a :href="`mailto:${profile.email}`" class="link-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {{ profile.email }}
          </a>
        </div>
      </div>

      <div class="hero-right">
        <div class="code-card">
          <div class="code-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <pre class="code-body"><span class="tok-kw">const</span> <span class="tok-var">developer</span> = {
  <span class="tok-key">name</span>: <span class="tok-str">"{{ profile.fullName }}"</span>,
  <span class="tok-key">focus</span>: [<span class="tok-str">"Kvalitet"</span>, <span class="tok-str">"Effektivitet"</span>, <span class="tok-str">"Samarbejde"</span>],
  <span class="tok-key">passion</span>: <span class="tok-str">"At skabe løsninger, der gør en forskel"</span>,
  <span class="tok-key">learning</span>: <span class="tok-bool">true</span>
};

<span class="tok-comment">// Altid nysgerrig. Altid i udvikling.</span></pre>
        </div>

        <h3 class="skills-label">Top kompetencer</h3>
        <div class="skill-pills">
          <span v-for="(s, i) in sortedSkills" :key="s.id" class="pill">
            <span class="pill-dot" :style="{ background: skillPalette[i % skillPalette.length] }"></span>
            {{ s.name }}
          </span>
        </div>
      </div>
    </section>

    <section class="highlights">
      <h2 class="highlights-title">Hvad jeg laver</h2>

      <div class="highlights-grid">
        <div class="highlight">
          <div class="highlight-icon icon-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16,18 22,12 16,6" />
              <polyline points="8,6 2,12 8,18" />
            </svg>
          </div>
          <h3>Udvikler</h3>
          <p>Jeg bygger webapplikationer og API'er med fokus på rene løsninger og god struktur.</p>
        </div>

        <div class="highlight">
          <div class="highlight-icon icon-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.7-4 3-9 3s-9-1.3-9-3" />
              <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
            </svg>
          </div>
          <h3>Løser problemer</h3>
          <p>Jeg analyserer udfordringer og finder effektive løsninger gennem logisk tænkning og fejlfinding.</p>
        </div>

        <div class="highlight">
          <div class="highlight-icon icon-amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3>Samarbejder</h3>
          <p>Jeg trives i teams, hvor vi deler viden og skaber bedre løsninger sammen.</p>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import profile from '../data/profile.js'
import skills from '../data/skills.js'

const levelOrder = { Ekspert: 0, Avanceret: 1, Øvet: 2, Begynder: 3 }
const skillPalette = ['#4fc3f7', '#42b883', '#f0db4f', '#a78bfa', '#ff8787']

const sortedSkills = computed(() =>
  skills
    .filter(s => s.isFeatured)
    .sort((a, b) => (levelOrder[a.level] ?? 4) - (levelOrder[b.level] ?? 4))
)
</script>

<style scoped>
.home {
  padding-top: 1.5rem;
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: start;
  padding-bottom: 3.5rem;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.title {
  font-size: 1.3rem;
  color: #4fc3f7;
  margin-bottom: 1.5rem;
}

.bio {
  line-height: 1.7;
  color: #aaa;
  margin-bottom: 2rem;
  max-width: 46ch;
}

.links {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  text-decoration: none;
  padding: 0.6rem 1.1rem;
  border: 1px solid #2a2a44;
  border-radius: 8px;
  background: #12121f;
  font-size: 0.9rem;
  transition: border-color 0.2s, color 0.2s;
}

.link-btn .icon {
  width: 16px;
  height: 16px;
}

.link-btn:hover {
  border-color: #4fc3f7;
  color: #4fc3f7;
}

/* Code card */
.code-card {
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.code-dots {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.dot-red    { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green  { background: #28c840; }

.code-body {
  font-family: 'Cascadia Code', 'Fira Code', Consolas, monospace;
  font-size: 0.85rem;
  line-height: 1.7;
  white-space: pre-wrap;
  color: #e0e0e0;
}

.tok-kw      { color: #c792ea; }
.tok-var     { color: #82aaff; }
.tok-key     { color: #e0e0e0; }
.tok-str     { color: #98c379; }
.tok-bool    { color: #f78c6c; }
.tok-comment { color: #676e95; font-style: italic; }

.skills-label {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.85rem;
}

.skill-pills {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #12121f;
  border: 1px solid #22223a;
  border-radius: 8px;
  padding: 0.55rem 0.95rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.pill-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Highlights */
.highlights {
  border-top: 1px solid #1c1c30;
  padding-top: 3rem;
  text-align: center;
}

.highlights-title {
  text-align: left;
  margin-bottom: 2rem;
}

.highlights-title::after {
  display: none;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: left;
}

.highlight {
  padding: 0 2rem;
  border-left: 1px solid #1c1c30;
}

.highlight:first-child {
  padding-left: 0;
  border-left: none;
}

.highlight h3 {
  font-size: 1.1rem;
  margin: 1rem 0 0.5rem;
}

.highlight p {
  color: #999;
  line-height: 1.6;
  font-size: 0.9rem;
}

.highlight-icon {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight-icon svg {
  width: 20px;
  height: 20px;
}

.icon-blue  { color: #4fc3f7; border-color: #234a63; background: rgba(79, 195, 247, 0.08); }
.icon-green { color: #69db7c; border-color: #234a34; background: rgba(105, 219, 124, 0.08); }
.icon-amber { color: #ffb454; border-color: #4a3a23; background: rgba(255, 180, 84, 0.08); }

.scroll-hint {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  color: #4fc3f7;
  animation: bounce 2s infinite;
}

.scroll-hint svg {
  width: 22px;
  height: 22px;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

@media (max-width: 800px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .highlight {
    padding: 0;
    border-left: none;
    border-top: 1px solid #1c1c30;
    padding-top: 1.5rem;
  }

  .highlight:first-child {
    border-top: none;
    padding-top: 0;
  }
}
</style>
