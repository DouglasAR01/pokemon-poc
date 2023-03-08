<template>
  <article class="container py-4">
    <section v-if="thePokemon">
      <div class="card">
        <div class="row">
          <div class="col-md-6 text-center">
            <img :src="thePokemon.image" alt="Pokemon image" class="img-fluid">
          </div>
          <div class="col-md-6 p-3">
            <h1 class="card-title"><strong class="text-primary">Name: </strong>{{ thePokemon.name }}</h1>
            <h2 class="mb-4"><strong class="text-primary">Pokedex number:</strong> #{{ thePokemon.pokedex_id }}</h2>
            <hr class="border border-secondary w-50 text-center">
            <h2>Pokedex entry:</h2>
            <p class="lead">{{ thePokemon.pokedex }}</p>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { Pokemon } from '~~/types';
import { Database } from '~~/types/supabase';
definePageMeta({
  middleware: ["auth"]
});

const client = useSupabaseClient<Database>();
const route = useRoute();

const { data: pokemon } = await useAsyncData<Pokemon | null>('pokemon', async () => {
  const { data } = await client.from('pokemons').select()
    .eq("id", route.params.id).returns<Pokemon>().single();
  return data;
});
const thePokemon = ref<Pokemon | null>(pokemon.value);
</script>