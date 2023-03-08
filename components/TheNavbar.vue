<template>
  <NavbarBase class="sticky-top">
    <template #insideCollapse>
      <NavbarItem>
        <nuxt-link to="/" class="nav-link">Home</nuxt-link>
      </NavbarItem>
      <NavbarItem>
        <nuxt-link to="/favorites" class="nav-link">Favorites</nuxt-link>
      </NavbarItem>
      <NavbarItem class="ms-0 ms-md-auto">
        <button class="btn btn-secondary" @click="signOut">Sign out</button>
      </NavbarItem>
    </template>
  </NavbarBase>
</template>

<script setup lang="ts">
const client = useSupabaseAuthClient();
const signOut = async () => {
  await client.auth.signOut();
  navigateTo("/login");
}
</script>