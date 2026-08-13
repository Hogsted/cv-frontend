// Liste over hvilke GitHub-repos der vises på projektsiden, i visningsrækkefølge.
// Beskrivelse, sprog-tags og live-link hentes automatisk fra GitHub af
// scripts/fetch-github-projects.js — descriptionFallback bruges kun hvis
// repo'et ikke har en beskrivelse sat på GitHub endnu.
export default [
  {
    repo: 'Hogsted/3-semester-oveeksamen-frontend',
    title: '3. semester øveeksamen — Frontend',
    descriptionFallback: 'Frontend til øveeksamensprojektet på 3. semester.'
  },
  {
    repo: 'Hogsted/3-semester--veeksamen',
    title: '3. semester øveeksamen — Backend',
    descriptionFallback: 'Backend (C#) til øveeksamensprojektet på 3. semester.'
  },
  {
    repo: 'Hogsted/Eksamens3semester-Frontend',
    title: 'Eksamensprojekt 3. semester — Frontend',
    descriptionFallback: 'Frontend til eksamensprojektet på 3. semester.'
  },
  {
    repo: 'Hogsted/Eksamens3semester-Backend',
    title: 'Eksamensprojekt 3. semester — Backend',
    descriptionFallback: 'Backend (ASP.NET Core) til eksamensprojektet på 3. semester.'
  },
  {
    repo: 'Hogsted/Danmarks-Radio-Frontend',
    title: 'Danmarks Radio — Frontend',
    descriptionFallback: 'Frontend-projekt med tema omkring Danmarks Radio.'
  },
  {
    repo: 'Hogsted/cv-frontend',
    title: 'Mit CV',
    descriptionFallback: 'Personligt CV-website bygget med Vue 3 og ASP.NET Core.',
    liveUrl: 'https://ghogsted.dk'
  },
  {
    repo: 'Hogsted/REPOGenerisk',
    title: 'REPOGenerisk',
    descriptionFallback: 'Generisk C#-repository brugt som skabelon/øvelsesprojekt.'
  },
  {
    repo: 'Hogsted/Slagteri2Semester',
    title: 'Slagteri 2. semester',
    descriptionFallback: 'Eksamensprojekt fra 2. semester med tema omkring en slagterivirksomhed.'
  }
]
