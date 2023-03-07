<template>
  <section>
    <slot></slot>
    <TheSimpleSearch :items="pokemons" look-for="name" @filtered="updateList" class="mb-2" />
    <PokemonList :pokemons="filteredPokemons" class="pokemon-list"></PokemonList>
    <ThePaginator :current-page="page" :page-limit="PAGE_LIMIT" :array-len="allPokemons.length" class="mt-2"
      @page-update="(newPage) => page = newPage" />
  </section>
</template>
<script setup lang="ts">
import { IPokemonWithFav } from '~~/types';
const props = defineProps<{
  allPokemons: IPokemonWithFav[]
}>()

const page = ref<number>(1);
const PAGE_LIMIT = ref<number>(20);

const pokemons = computed(() => {
  if (!props.allPokemons) {
    return [];
  }
  return props.allPokemons.slice(
    (page.value - 1) * PAGE_LIMIT.value, page.value * PAGE_LIMIT.value
  );
})

const filteredPokemons = ref<IPokemonWithFav[]>(pokemons.value);

const updateList = (newValues: IPokemonWithFav[]) => {
  filteredPokemons.value = newValues;
}

watch(pokemons, () => {
  filteredPokemons.value = pokemons.value;
})
</script>
<style scoped>
.pokemon-list {
  max-height: 80vh;
  overflow-y: scroll;
}
</style>