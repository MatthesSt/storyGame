<script setup lang="ts">
import { toRefs } from "vue";
import { Entity } from "../ts/types";
const props = defineProps<{
    enemy: Entity;
}>();
const { enemy } = toRefs(props);
</script>
<template>
  <div
    class="enemy"
    :data-name="enemy.name"
    :style="`
    top:${enemy.y}px;
    left:${enemy.x}px;
    width:${enemy.width}px;
    height:${enemy.height}px;
    ${'background-image:url(' + enemy.image + ')'}`"
  ></div>
</template>
<style scoped lang="scss">
@import "../style.scss";
$ration: 0.8;
$size: calc(#{$tileSize} * #{$ration});
.enemy {
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  transform: translate(-50%, -50%);
  &::before {
    content: attr(data-name);
    font-size: 14px;
    font-weight: 600;
    position: absolute;
    transform: translateY(-100%) translateX(calc($size / 2)) translateX(-50%);
  }
}
</style>
