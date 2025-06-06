<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { signupSchema, type SignupSchema } from "~/schemas/auth.schema";

const endpoint = useRuntimeConfig().public.apiBase;

const initialState: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  licenseNumber: string | null;
} = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  licenseNumber: null,
};

const toast = useToast();
const isOpen = ref(false);
const state = reactive(initialState);
const errorMessage = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const isLicense = ref(false);

async function onSubmit(event: FormSubmitEvent<SignupSchema>) {
  isLoading.value = true;

  const { status, error } = await useFetch(`${endpoint}/auth/signup`, {
    method: "POST",
    body: {
      ...event.data,
    },
    credentials: "include",
  });

  isLoading.value = false;

  if (status.value === "success") {
    resetForm();
    toast.add({ title: "Inscription réussie" });
  } else {
    errorMessage.value = error.value?.data.message;
  }
}

const resetForm = () => {
  isOpen.value = false;
  state.lastname = "";
  state.firstname = "";
  state.email = "";
  state.password = "";
  state.licenseNumber = null;
};
</script>

<template>
  <div>
    <UCard class="max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold mb-2">Inscription</h2>
        <p class="text-sm text-gray-500">
          Vous avez déjà un compte ?
          <NuxtLink to="/login" class="text-primary-500">
            Connectez-vous
          </NuxtLink>
        </p>
      </div>
      <UForm
        :schema="signupSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex gap-4">
          <UFormField class="w-full" label="Prénom" name="firstname" required>
            <UInput v-model="state.firstname" class="w-full" />
          </UFormField>

          <UFormField class="w-full" label="Nom" name="lastname" required>
            <UInput v-model="state.lastname" class="w-full" />
          </UFormField>
        </div>

        <UFormField class="w-full" label="Email" name="email" required>
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField
          class="w-full"
          label="Mot de passe"
          name="password"
          required
        >
          <UInput
            v-model="state.password"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <UCheckbox
          v-model="isLicense"
          label="J'ai ma licence de Padel 2025"
          class="mb-4"
        />

        <UFormField
          class="w-full"
          label="Numéro de licence"
          name="licenseNumber"
          v-if="isLicense"
        >
          <UInput v-model="state.licenseNumber" class="w-full" />
        </UFormField>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <UButton class="!mt-4" type="submit" :loading="isLoading" block>
          S'inscrire
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
