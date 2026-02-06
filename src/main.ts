import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import { getExternalRedirect } from './data/externalRoutes'

// Check for external redirects before Vue app loads
const path = window.location.pathname
const redirectUrl = getExternalRedirect(path)

if (redirectUrl) {
  window.location.href = redirectUrl
} else {
  // Mount Vue app for internal routes
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}
