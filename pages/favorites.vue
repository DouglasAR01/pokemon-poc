<template>
  <article class="container my-4">
    <PokemonView :all-pokemons="favPokemons">
      <h1>This are your favorites!</h1>
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

let { data: allPokemons } = await useAsyncData<IPokemonWithFav[]>("pokemons", async () => {
  const { data } = await client.from("user_favorites")
    .select("pokemons(*)").eq("user_id", user.value?.id).returns<{
      pokemons: Pokemon
    }[]>();
  if (!data) return [];
  let favs: IPokemonWithFav[] = [];
  data.forEach(res => {
    const pokemon: IPokemonWithFav = {
      ...res.pokemons,
      favorite: true
    };
    favs.push(pokemon);
  });
  return favs;
});

const favPokemons: IPokemonWithFav[] = allPokemons.value? allPokemons.value : [];
</script>