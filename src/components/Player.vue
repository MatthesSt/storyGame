<script setup lang="ts">
import { toRefs } from "vue";
import { Entity } from "../types";
const props = defineProps<{
  player: Entity;
  canTalk?: boolean;
}>();
const { player } = toRefs(props);
</script>
<template>
  <div
    class="player"
    :class="canTalk && player.dialog ? 'canTalk' : ''"
    :data-name="player.name"
    :style="`top:${player.y}px;left:${player.x}px;background-color:${
      player.talking ? 'red' : 'black'
    }`"
  ></div>
</template>
<style scoped lang="scss">
@import "../style.scss";
$ration: 0.8;
$size: calc(#{$tileSize} * #{$ration});
.player {
  width: $size;
  height: $size;
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
.canTalk::after {
  content: "talk (e)";
  width: max-content;
  bottom: 0;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  transform: translateY(100%) translateX(calc($size / 2)) translateX(-50%);
}
</style>
