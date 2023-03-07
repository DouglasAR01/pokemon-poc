<template>
  <Icon name="bi:heart-fill" size="1.2em" :class="buttonClasses" @click="submit" :disabled="submitting" />
  <!-- <i :class="buttonClasses" @click="submit" :disabled="submitting"></i> -->
</template>

<script setup lang="ts">
import { Database } from "~~/types/supabase";
interface INewPokemonFav {
  user_id: string,
  pokemon_id: number
}
const props = defineProps<{
  pokemonId: number,
  favorited: boolean
}>();

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const submitting = ref<boolean>(false);
const isFav = ref<boolean>(props.favorited);

const buttonClasses = computed(() => {
  let base = "fav-btn ";
  return isFav.value ? base + "text-danger" : base;
})

const favorite = async () => {
  if (!user.value) return;
  const newFav: INewPokemonFav = {
    user_id: user.value.id,
    pokemon_id: props.pokemonId
  };
  const { error } = await client.from("user_favorites").insert<INewPokemonFav>(newFav);
  if (!error) isFav.value = true;
}

const unFavorite = async () => {
  if (!user.value) return;
  const { error } = await client.from("user_favorites").delete()
    .eq("user_id", user.value.id)
    .eq("pokemon_id", props.pokemonId);
  if (!error) isFav.value = false;
}

const submit = async () => {
  submitting.value = true;
  if (isFav.value) {
    await unFavorite();
  } else {
    await favorite();
  }
  submitting.value = false;
}
</script>
<style scoped>
.fav-btn {
  cursor: pointer;
}
</style>