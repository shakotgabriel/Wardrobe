<template>
  <v-container fluid class="fill-height bg-grey-lighten-3">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="8" rounded="lg" class="pa-4">
          <v-card-title class="text-center text-h4 font-weight-bold mb-4">
            Sign Up
          </v-card-title>
          <v-form @submit.prevent="signUp" v-model="isFormValid">
            <v-text-field
              v-model="name"
              label="Full Name"
              prepend-inner-icon="mdi-account"
              :rules="[rules.required]"
              variant="outlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              prepend-inner-icon="mdi-email"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.minLength]"
              variant="outlined"
              @click:append-inner="showPassword = !showPassword"
              required
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              prepend-inner-icon="mdi-lock-check"
              :type="showPassword ? 'text' : 'password'"
              :rules="[rules.required, rules.passwordMatch]"
              variant="outlined"
              required
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :disabled="!isFormValid"
              :loading="isLoading"
              class="mt-4"
            >
              Sign Up
            </v-btn>
          </v-form>

          <v-alert
            v-if="errorMessage"
            type="error"
            class="mt-4"
            closable
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-card-text class="text-center mt-4">
            Already have an account?
            <router-link to="/login" class="text-decoration-none">Log In</router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const isFormValid = ref(false);
const isLoading = ref(false);
const errorMessage = ref('');

const rules = {
  required: value => !!value || 'Field is required',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Invalid email format';
  },
  minLength: value => value.length >= 8 || 'Password must be at least 8 characters',
  passwordMatch: value => value === password.value || 'Passwords do not match'
};

const signUp = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    // Here you would typically make an API call to register the user
    console.log('Signing up with:', { name: name.value, email: email.value, password: password.value });
    
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // On successful registration, you might want to:
    // 1. Store the user token in localStorage
    // 2. Update your global auth state
    // 3. Redirect to the dashboard or a welcome page

    router.push('/dashboard');
  } catch (error) {
    console.error('Error during sign up:', error);
    errorMessage.value = 'An error occurred during sign up. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

