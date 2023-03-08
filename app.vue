<template>
  <div>
    <TheNavbar v-if="isLoggedIn"/>
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const isLoggedIn = computed(() => {
  return user.value? true : false;
})
</script>
