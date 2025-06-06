<script setup lang="ts">
import { useAuthStore } from "~/store/auth.js";

const authStore = useAuthStore();
</script>

<template>
  <header class="mb-24">
    <div class="flex justify-between items-center container mx-auto py-8">
      <div>
        <NuxtLink to="/">
          <h1>Padel Horizon tournois</h1>
        </NuxtLink>
      </div>
      <nav>
        <ul class="flex items-center gap-4">
          <li>
            <NuxtLink to="/licence">Prendre ma licence</NuxtLink>
          </li>
          <li v-if="authStore.user">
            <NuxtLink to="/me">Mon compte</NuxtLink>
          </li>
          <li v-if="!authStore.user">
            <UButton to="/login" color="neutral" variant="outline"
              >Connexion</UButton
            >
          </li>
          <li v-if="!authStore.user">
            <UButton to="/signup" color="neutral">Inscription</UButton>
          </li>
          <li v-if="authStore.user">
            <UButton @click="authStore.logout">Déconnexion</UButton>
          </li>
        </ul>
      </nav>
    </div>
    <USeparator />
  </header>
</template>

<style scoped></style>
