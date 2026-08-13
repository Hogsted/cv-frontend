import { createRouter, createWebHistory } from 'vue-router'
import HomeView       from '../views/HomeView.vue'
import ProjectsView   from '../views/ProjectsView.vue'
import SkillsView     from '../views/SkillsView.vue'
import ExperienceView from '../views/ExperienceView.vue'
import EducationView  from '../views/EducationView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',           component: HomeView },
    { path: '/projects',   component: ProjectsView },
    { path: '/skills',     component: SkillsView },
    { path: '/experience', component: ExperienceView },
    { path: '/education',  component: EducationView }
  ]
})

export default router
