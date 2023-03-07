<template>
  <div class="row">
    <div class="col-sm-4 text-end">
      <button class="btn btn-primary" :disabled="currentPage - 1 < 1"
        @click="() => updatePage(currentPage - 1)">←</button>
    </div>
    <div class="col-sm-4 text-center">
      <button class="btn btn-primary me-1" v-for="i in nPages" :key="'bp' + i" :disabled="i == currentPage"
        @click="() => updatePage(i)">
        {{ i }}
      </button>
    </div>
    <div class="col-sm-4 text-start">
      <button class="btn btn-primary" :disabled="currentPage + 1 > nPages"
        @click="() => updatePage(currentPage + 1)">→</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["pageUpdate"]);

const props = defineProps<{
  currentPage: number,
  pageLimit: number,
  arrayLen: number
}>();

const nPages = computed<number>(() => {
  let currentLimit = Math.floor(props.arrayLen / props.pageLimit);
  return props.arrayLen % props.pageLimit != 0 ? currentLimit + 1 : currentLimit;
});

const updatePage = (newPage: number) => {
  if (newPage < 1 || newPage > nPages.value) return;
  return emit("pageUpdate", newPage);
}

</script>