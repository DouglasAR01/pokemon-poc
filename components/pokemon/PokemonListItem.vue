<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-md-3 d-flex justify-content-center">
        <img :src="pokemon.image" alt="Pokemon image" class="img-fluid pokemon-img">
      </div>
      <div class="col-md-9 p-3">
        <div class="row">
          <div class="col-10">
            <nuxt-link :to="'/pokemon/'+pokemon.id">
              <h5>#{{ pokemon.pokedex_id }} {{ pokemon.name }}</h5>
            </nuxt-link>            
          </div>
          <div class="col-2">
            <PokemonFavButton :pokemon-id="pokemon.id" :favorited="pokemon.favorite"/>
          </div>
        </div>
        <p>{{ pokemon.pokedex }}</p>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { IPokemonWithFav } from '~~/types';
defineProps<{
  pokemon: IPokemonWithFav
}>()
</script>
<style scoped>
.pokemon-img {
  width: 150px;
  height: 150px;
}
</style>