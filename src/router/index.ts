import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.path.startsWith('/admin')) return undefined
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projets',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/projets/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
    },
    {
      path: '/a-propos',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/devis',
      name: 'quote',
      component: () => import('../views/QuoteView.vue'),
    },
    // Admin routes
    {
      path: '/admin',
      component: () => import('../admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../admin/views/DashboardView.vue'),
        },
        {
          path: 'projects',
          name: 'admin-projects',
          component: () => import('../admin/views/ProjectsListView.vue'),
        },
        {
          path: 'projects/:id',
          name: 'admin-project-edit',
          component: () => import('../admin/views/ProjectEditView.vue'),
        },
        {
          path: 'content',
          name: 'admin-content',
          component: () => import('../admin/views/ContentEditorView.vue'),
        },
        {
          path: 'partners',
          name: 'admin-partners',
          component: () => import('../admin/views/PartnersView.vue'),
        },
        {
          path: 'founders',
          name: 'admin-founders',
          component: () => import('../admin/views/FoundersView.vue'),
        },
        {
          path: 'testimonials',
          name: 'admin-testimonials',
          component: () => import('../admin/views/TestimonialsView.vue'),
        },
        {
          path: 'map',
          name: 'admin-map',
          component: () => import('../admin/views/MapEditorView.vue'),
        },
        {
          path: 'media',
          name: 'admin-media',
          component: () => import('../admin/views/MediaLibraryView.vue'),
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('../admin/views/SettingsView.vue'),
        },
      ],
    },
  ],
})

export default router
