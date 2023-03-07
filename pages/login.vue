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
                <input type="submit" value="Submit" class="btn btn-primary btn-block mt-2">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">

interface userData {
  email: string,
  password: string
}

const client = useSupabaseAuthClient();
const errors = ref<boolean>(false);

const credentials = ref<userData>({
  email: "",
  password: ""
});

const formClasses = computed(() => {
  return errors.value? "form-control is-invalid" : "form-control";
})

const submit = async () => {
  const { data, error } = await client.auth.signInWithPassword(credentials.value);
  if (error) {
    errors.value = true;
    return;
  }
}

</script>