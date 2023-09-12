<script setup lang="ts">
import { toRefs } from "vue";
import { Entity } from "../types";
const props = defineProps<{
  player: Entity;
}>();
const { player } = toRefs(props);
</script>
<template>
  <div
    class="player"
    :data-name="player.name"
    :style="`top:${player.y}px;left:${player.x}px`"
  ></div>
</template>
<style scoped lang="scss">
@import "../style.scss";
.player {
  $ration: 0.8;
  $size: calc(#{$tileSize} * #{$ration});
  width: $size;
  height: $size;
  background-color: #f00;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 40%;
  &::before {
    content: attr(data-name);
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    transform: translateY(-100%) translateX(calc($size / 2)) translateX(-50%);
  }
}
</style>
