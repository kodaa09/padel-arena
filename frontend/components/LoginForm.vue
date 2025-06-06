<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { loginSchema, type LoginSchema } from "~/schemas/auth.schema";
import { useAuthStore } from "~/store/auth";

const toast = useToast();
const authStore = useAuthStore();
const isOpen = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");
const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<LoginSchema>) {
  isLoading.value = true;

  try {
    await authStore.authenticate(event.data);
    toast.add({ title: "Connexion réussie" });
    navigateTo("/");
    isOpen.value = false;
  } catch (error) {
    console.log(error);
  }

  isLoading.value = false;
}
</script>

<template>
  <div>
    <UCard class="max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold mb-2">Connexion</h2>
        <p class="text-sm text-gray-500">
          Vous n'avez pas de compte ?
          <NuxtLink to="/signup" class="text-primary-500">
            Inscrivez-vous
          </NuxtLink>
        </p>
      </div>
      <UForm
        :schema="loginSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField class="w-full" label="Email" name="email" required>
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField
          class="w-full"
          label="Mot de passe"
          name="password"
          required
        >
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <UButton class="!mt-6" type="submit" :loading="isLoading" block>
          Se connecter
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
