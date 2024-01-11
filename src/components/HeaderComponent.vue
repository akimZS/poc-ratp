<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    
    <nav>
      <RouterLink to="/"><img alt="logo" class="logo" src="@/assets/logo.png" width="32" height="32" /></RouterLink>
      <RouterLink to="/itinerary">Itinerary</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
  }

  nav {
    display: flex;
    align-items: center;
    > * {
      text-decoration: none;
    }
  }

  .logo {
    max-height: 48px;
    max-width: 48px;
  }

  a {
    padding: 0 10px;
  }
</style>
