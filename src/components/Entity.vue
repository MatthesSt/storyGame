<script setup lang="ts">
import { toRefs } from "vue";
import { Entity } from "../ts/types";
const props = defineProps<{
  entity: Entity;
  canTalk?: boolean;
}>();
const { entity } = toRefs(props);
</script>
<template>
  <div
    class="entity"
    :class="canTalk && entity.dialog ? 'canTalk' : ''"
    :data-name="entity.name"
    :style="`
    top:${entity.y}px;
    left:${entity.x}px;
    ${
      entity.image
        ? 'background-image:url(' + entity.image + ')'
        : 'background-color:' + (entity.talking ? 'red' : 'black')
    }`"
  >
  <template v-if="entity.type =='enemy'">  
      <img class="emptyHealth" src="/emptyHealth.png" style="position: absolute; top:-10px;left:60%;transform:translateX(-50%)">
      <img class="fullHealth" src="/fullHealth.png" style="position: absolute;top:-10px;left:60%;transform:translateX(-50%)" :style="`
      width:${entity.currentHealth*150/ entity.maxHealth}%;
      height: 5px;      
      `">
  </template>
  </div>
</template>
<style scoped lang="scss">
@import "../style.scss";
$ration: 0.8;
$size: calc(#{$tileSize} * #{$ration});
.entity {
  width: $size;
  height: $size;
  position: absolute;
  background-size: cover;
  background-repeat: no-repeat;
  transform: translate(-50%, -50%);
  // border-radius: 30%;
  &::before {
    content: attr(data-name);
    top: -10px;
    font-size: 14px;
    font-weight: 700;
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
