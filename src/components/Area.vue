<script setup lang="ts">
import { toRefs } from "vue";
import type { Area } from "../area";

const props = defineProps<{
  area: Area;
}>();
const { area } = toRefs(props);
</script>
<template>
  <div
    style="display: grid; position: relative"
    :style="`grid-template-columns:repeat(${area.width},1fr)`"
  >
    <div v-for="x in area.width">
      <div v-for="y in area.height" class="tile"></div>
    </div>
    <slot name="player"></slot>
    <slot name="dialog"></slot>
  </div>
</template>
<style scoped lang="scss">
@import "../style.scss";
.tile {
  width: $tileSize;
  height: $tileSize;
  background-color: #fff;
  border: 1px solid #aaa;
}
</style>
