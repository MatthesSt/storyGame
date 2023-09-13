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
      <div
        v-for="y in area.height"
        class="tile"
        :style="`background-color: ${
          area.portals.find(
            (portal) => portal.position[0] === x && portal.position[1] === y
          )
            ? 'yellow'
            : 'white'
        }`"
      ></div>
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
  border: 1px solid #aaa;
}
</style>
