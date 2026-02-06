<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Layout/Navbar.vue'
import Footer from './components/Layout/Footer.vue'
import AIChatSidebar from './components/Chat/AIChatSidebar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-dark">
    <!-- Skip Link for accessibility -->
    <a
      href="#main-content"
      class="skip-link"
    >
      跳至主内容
    </a>

    <Navbar />
    <main id="main-content" class="flex-1" tabindex="-1">
      <RouterView />
    </main>
    <Footer />

    <!-- AI Chat Sidebar (collapsible right panel) -->
    <AIChatSidebar />
  </div>
</template>
