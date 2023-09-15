<script setup lang="ts">
import { toRefs } from "vue";
import { Entity } from "../types";
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
  ></div>
</template>
<style scoped lang="scss">
@import "../style.scss";
$ration: 0.8;
$size: calc(#{$tileSize} * #{$ration});
.entity {
  width: $size;
  height: $size;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 30%;
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
