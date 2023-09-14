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
    <div
      v-for="portal in area.portals"
      class="portal"
      :style="{
        backgroundColor: portal.blocked ? 'grey' : 'yellow',
        top: (portal.position[1] - 1) * 40 + 'px',
        left: (portal.position[0] - 1) * 40 + 'px',
      }"
    ></div>
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
  background-color: white;
}
.portal {
  width: $tileSize;
  height: $tileSize;
  border: 1px solid #aaa;
  position: absolute;
}
</style>
