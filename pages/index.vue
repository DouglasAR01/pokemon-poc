<template>
  <article class="container my-4">
    <PokemonView :all-pokemons="pokemons">
      <h1>Check out the Pokemons!</h1>
    </PokemonView>
  </article>
</template>
<script setup lang="ts">
import { Pokemon, IPokemonWithFav } from '~~/types';
import { Database } from '~~/types/supabase';
definePageMeta({
  middleware: ["auth"]
});

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

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
  if (!allPokemons.value) {
    return [];
  }
  return allPokemons.value.map(pokemon => {
    const isFav = userFavs.value ? userFavs.value.includes(pokemon.id) : false;
    const cPokemon: IPokemonWithFav = {
      ...pokemon,
      favorite: isFav
    };
    return cPokemon;
  });
})
</script>