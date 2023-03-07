<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-md-3 d-flex justify-content-center">
        <img :src="pokemon.image" alt="Pokemon image" class="img-fluid pokemon-img">
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-10">
            <h5>#{{ pokemon.pokedex_id }} {{ pokemon.name }}</h5>
          </div>
          <div class="col-2">
            <button class="btn btn-primary">Fav</button>
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