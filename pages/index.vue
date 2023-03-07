<template>
  <section class="container my-4">
    <h1>Check out the Pokemons!</h1>
    <TheSimpleSearch :items="pokemons" look-for="name" @filtered="updateList" class="mb-2"/>
    <PokemonList :pokemons="filteredPokemons" class="pokemon-list"></PokemonList>
    <ThePaginator :current-page="page" :page-limit="PAGE_LIMIT" :array-len="2" class="mt-2" @page-update="(newPage) => page = newPage"/>
  </section>
</template>
<script setup lang="ts">
import { Pokemon, IPokemonWithFav } from '~~/types';
definePageMeta({
  middleware: ["auth"]
});

const client = useSupabaseClient();
const user = useSupabaseUser();
const page = ref<number>(1);
const PAGE_LIMIT = ref<number>(20);

const { data: allPokemons } = await useAsyncData<Pokemon[] | null>('pokemons', async () => {
  const { data } = await client.from('pokemons').select().returns<Pokemon[]>();
  return data;
});

const { data: userFavs } = await useAsyncData<number[] | null>('userFavs', async () => {
  let favArray: number[] = [];
  const { data } = await
    client.from('user_favorites').select('pokemon_id').eq('user_id', user.value?.id);
  data?.forEach(res => {
    favArray.push(res.pokemon_id);
  });
  return favArray;
});

const pokemons = computed(() => {
  if (!allPokemons.value){
    return [];
  }
  return allPokemons.value.map(pokemon => {
    const isFav = userFavs.value? userFavs.value.includes(pokemon.id) : false;
    const cPokemon: IPokemonWithFav = {
      ...pokemon,
      favorite: isFav
    };
    return cPokemon;
  }).slice((page.value - 1) * PAGE_LIMIT.value, page.value * PAGE_LIMIT.value);
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