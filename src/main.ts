import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'

// Handle external redirects before Vue app loads
const externalRedirects: Record<string, string> = {
  '/login': 'https://api.lurus.cn/login',
  '/register': 'https://api.lurus.cn/register',
  '/docs': 'https://docs.lurus.cn'
}

// Check for external redirects
const path = window.location.pathname
if (path in externalRedirects) {
  window.location.href = externalRedirects[path]
} else if (path.startsWith('/console')) {
  window.location.href = `https://api.lurus.cn${path}`
} else {
  // Mount Vue app for internal routes
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
}
