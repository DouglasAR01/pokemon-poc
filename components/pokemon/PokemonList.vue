<template>
  <ul class="list-group">
    <PokemonListItem :pokemon="pokemon" v-for="pokemon in pokemons" :key="pokemon.id" />
  </ul>
</template>

<script setup lang="ts">
import { IPokemonWithFav } from '~~/types';
defineProps<{
  pokemons: IPokemonWithFav[]
}>()
</script>