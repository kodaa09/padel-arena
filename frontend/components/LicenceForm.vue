<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import {
  createLicenceSchema,
  type CreateLicenceSchema,
} from "~/schemas/licence.schema";

const endpoint = useRuntimeConfig().public.apiBase;

const initialState: {
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  address: string;
  zipcode: string;
  phone: string;
} = {
  firstname: "",
  lastname: "",
  email: "",
  birthdate: "",
  address: "",
  zipcode: "",
  phone: "",
};

const toast = useToast();
const state = reactive(initialState);
const errorMessage = ref("");
const isLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<CreateLicenceSchema>) {
  isLoading.value = true;

  try {
    console.log(event.data);
    const response = await $fetch(`${endpoint}/licences/payment`, {
      method: "POST",
      body: {
        amount: 100,
        playerName: `${event.data.firstname} ${event.data.lastname}`,
        email: event.data.email,
      },
    });
    console.log(response, "response");
    // resetForm();
    toast.add({ title: "Demande de licence envoyée" });
  } catch (error) {
    toast.add({
      title: "Erreur lors de l'envoi de la demande de licence",
      description: "Veuillez réessayer plus tard",
      color: "error",
    });
  }

  isLoading.value = false;
}

const resetForm = () => {
  state.lastname = "";
  state.firstname = "";
  state.email = "";
  state.birthdate = "";
  state.address = "";
  state.zipcode = "";
  state.phone = "";
};
</script>

<template>
  <div>
    <UCard class="max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold mb-2">Demande de licence PH</h2>
        <p class="text-sm text-gray-500">
          Vous avez déjà une licence ?
          <NuxtLink to="/me" class="text-primary-500">
            Renseigner ma licence
          </NuxtLink>
        </p>
      </div>
      <UForm
        :schema="createLicenceSchema"
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

        <UFormField
          class="w-full"
          label="Date de naissance"
          name="birthdate"
          required
        >
          <UInput
            v-model="state.birthdate"
            class="w-full"
            type="date"
            :min="new Date(1900, 0, 1).toISOString().split('T')[0]"
          />
          <!-- <UPopover class="w-full">
            <UButton
              color="neutral"
              variant="subtle"
              icon="i-lucide-calendar"
              class="w-full"
            >
              {{
                modelValue
                  ? df.format(modelValue.toDate(getLocalTimeZone()))
                  : "Select a date"
              }}
            </UButton>

            <template #content>
              <UCalendar v-model="modelValue" class="p-2" />
            </template>
          </UPopover> -->
        </UFormField>

        <div class="flex gap-4">
          <UFormField
            class="w-full"
            label="Adresse postale"
            name="address"
            required
          >
            <UInput v-model="state.address" class="w-full" />
          </UFormField>

          <UFormField
            class="w-full"
            label="Code postal"
            name="zipcode"
            required
          >
            <UInput v-model="state.zipcode" class="w-full" />
          </UFormField>
        </div>

        <UFormField class="w-full" label="Email" name="email" required>
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField
          class="w-full"
          label="Numéro de téléphone"
          name="phone"
          required
        >
          <UInput v-model="state.phone" class="w-full" />
        </UFormField>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <UButton class="!mt-4" type="submit" :loading="isLoading" block>
          Demande de licence Padel Horizon
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
