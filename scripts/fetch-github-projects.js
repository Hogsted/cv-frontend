// Genererer src/data/projects.js fra GitHub API ved build/dev-start.
// Kør ikke denne fil-output manuelt i hånden — se src/data/projects.config.js
// for at tilføje/fjerne projekter, eller sætte en fallback-beskrivelse/live-url.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.join(__dirname, '../src/data/projects.config.js')
const outputPath = path.join(__dirname, '../src/data/projects.js')

const FRONTEND_LANGS = new Set(['Vue', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SCSS'])
const BACKEND_LANGS = new Set(['C#'])

const headers = { Accept: 'application/vnd.github+json' }
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
}

async function fetchJson(url) {
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

function deriveCategories(topLanguage, repoName, description) {
  const categories = new Set()
  if (topLanguage === 'C#') categories.add('C#/.NET')
  if (BACKEND_LANGS.has(topLanguage)) categories.add('Backend')
  if (FRONTEND_LANGS.has(topLanguage)) categories.add('Frontend')

  const haystack = `${repoName} ${description || ''}`.toLowerCase()
  if (haystack.includes('api') || haystack.includes('backend')) categories.add('API')

  return [...categories]
}

async function fetchProject(entry) {
  const [repoInfo, languages] = await Promise.all([
    fetchJson(`https://api.github.com/repos/${entry.repo}`),
    fetchJson(`https://api.github.com/repos/${entry.repo}/languages`)
  ])

  const tags = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([lang]) => lang)

  return {
    title: entry.title,
    description: repoInfo.description || entry.descriptionFallback || '',
    gitHubUrl: repoInfo.html_url,
    liveUrl: entry.liveUrl || repoInfo.homepage || '',
    tags,
    categories: deriveCategories(tags[0], repoInfo.name, repoInfo.description)
  }
}

async function loadFallbackByUrl() {
  try {
    const mod = await import(`${pathToFileUrl(outputPath)}?t=${Date.now()}`)
    const map = new Map()
    for (const p of mod.default) map.set(p.gitHubUrl, p)
    return map
  } catch {
    return new Map()
  }
}

function pathToFileUrl(p) {
  return `file:///${p.replace(/\\/g, '/')}`
}

async function main() {
  const { default: config } = await import(pathToFileUrl(configPath))
  const fallbackByUrl = await loadFallbackByUrl()

  const results = await Promise.allSettled(config.map(fetchProject))

  const projects = results.map((result, i) => {
    const entry = config[i]
    if (result.status === 'fulfilled') {
      return { id: i + 1, ...result.value }
    }

    console.warn(`[fetch-github-projects] Kunne ikke hente ${entry.repo}: ${result.reason.message}`)
    const expectedUrl = `https://github.com/${entry.repo}`
    const cached = fallbackByUrl.get(expectedUrl)
    if (cached) {
      console.warn(`[fetch-github-projects] Genbruger cachet data for ${entry.repo}`)
      return { id: i + 1, ...cached }
    }

    console.warn(`[fetch-github-projects] Ingen cache for ${entry.repo}, bruger kun lokal fallback`)
    return {
      id: i + 1,
      title: entry.title,
      description: entry.descriptionFallback || '',
      gitHubUrl: expectedUrl,
      liveUrl: entry.liveUrl || '',
      tags: [],
      categories: []
    }
  })

  const banner = '// Denne fil er auto-genereret af scripts/fetch-github-projects.js — redigér ikke i hånden.\n' +
    '// Tilføj/fjern projekter i src/data/projects.config.js.\n'
  writeFileSync(outputPath, `${banner}export default ${JSON.stringify(projects, null, 2)}\n`)

  console.log(`[fetch-github-projects] Skrev ${projects.length} projekter til src/data/projects.js`)
}

main().catch(err => {
  console.error('[fetch-github-projects] Build-scriptet fejlede:', err)
  process.exit(1)
})
