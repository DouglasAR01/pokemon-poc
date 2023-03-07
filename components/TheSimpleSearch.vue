<template>
  <div>
    <input type="text" class="form-control" v-model="content" @keyup="search" placeholder="Type the pokemon name...">
    <span v-if="suggest.length > 0">You may be looking for {{ suggest }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: any[],
  lookFor: string
}>()
const emit = defineEmits(["filtered"]);

const content = ref<string>("");
const suggest = ref<string>("");
const fixedArray: any[] = [];

onMounted(() => {
  props.items.forEach(item => {
    const fItem = { ...item };
    if (typeof fItem[props.lookFor] === "string" || fItem[props.lookFor] instanceof String) {
      fItem[props.lookFor] = fItem[props.lookFor].toLowerCase();
    }
    fixedArray.push(fItem);
  })
});

const search = () => {
  if (content.value == "" || content.value == null) {
    suggest.value = "";
    return emit("filtered", props.items);
  }
  const filtered: any[] = fixedArray.filter(element => element[props.lookFor].includes(content.value.toLowerCase()));
  if (filtered.length > 0) suggest.value = filtered[0][props.lookFor];
  return emit("filtered", filtered);
}
</script>