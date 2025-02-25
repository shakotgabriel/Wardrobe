<template>
  <v-container fluid class="fill-height bg-white">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="8" rounded="lg" class="pa-4 ">
          <v-card-title class="text-center text-h4 font-weight-black p-4 mb-4">
            Login
          </v-card-title>
          <v-form class="" @submit.prevent="login" v-model="isFormValid">
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
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              :disabled="!isFormValid"
              class="mt-4 p-4"
            >
              Login
            </v-btn>
          </v-form>
          <v-card-text class="text-center mt-4">
            <a href="#" class="">Forgot Password?</a>
          </v-card-text>
          <v-card-text class="text-center mt-4">
            <a href="/Signup" class="">Sign up</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isFormValid = ref(false);
const router = useRouter();

const rules = {
  required: value => !!value || 'Field is required',
  email: value => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Invalid email format';
  },
  minLength: value => value.length >= 8 || 'Password must be at least 8 characters',
};

const login = async () => {
  // Implement login logic here, e.g., call an API to authenticate.
  console.log('Login attempted with:', { email: email.value, password: password.value });
  router.push('/');
};
</script>

