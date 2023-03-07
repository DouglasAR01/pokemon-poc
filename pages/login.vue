<template>
  <section class="container">
    <div class="row">
      <div class="offset-md-4 col-md-4">
        <div class="d-flex justify-content-center align-items-center min-vh-100">
          <form class="card" @submit.prevent="submit">
            <div class="card-body">
              <h5 class="card-title">Welcome to Pokemon POC</h5>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" :class="formClasses" id="email" required v-model="credentials.email">
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" :class="formClasses" id="password" required v-model="credentials.password">
              </div>
              <span class="text-danger" v-if="errors">Incorrect email or password.</span>
              <div class="d-grid gap-2">
                <input type="submit" :value="isLogIn ? 'Log in' : 'Sign up'" class="btn btn-primary btn-block mt-2">
              </div>
              <span class="text-success" v-if="registered">Please verify your email. Check your mailbox.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Database } from '~~/types/supabase';

interface IUserData {
  email: string,
  password: string
}
definePageMeta({
  middleware: ["guest"]
});

const client = useSupabaseAuthClient<Database>();
const errors = ref<boolean>(false);
const registered = ref<boolean>(false);

const credentials = ref<IUserData>({
  email: "",
  password: ""
});

const formClasses = computed(() => {
  return errors.value ? "form-control is-invalid" : "form-control";
})

const isLogIn = computed(() => {
  const route = useRoute();
  return !("signup" in route.query);
})

const submit = async () => {
  const { error } = isLogIn.value ?
    await client.auth.signInWithPassword(credentials.value) :
    await client.auth.signUp(credentials.value);
  if (error) {
    errors.value = true;
    return;
  }
  if (isLogIn.value) return navigateTo("/");
  registered.value = true;
}

</script>