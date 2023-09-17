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
  <!-- <template v-if="entity.type =='player'" >  
    <div class="showWeapon"> 

    </div>
    <div class="attackAnimation" style="position: absolute; top:15px;left:100%">


    </div> -->
  <!-- </template> -->
  </div>
</template>
<style scoped lang="scss">
@import "../style.scss";
$ration: 0.8;
$size: calc(#{$tileSize} * #{$ration});

.attackAnimation {
  width: 20px;
  height: 8px; /* as the half of the width */
  border-top-left-radius: 10px;  /* 100px of height + 10px of border */
  border-top-right-radius: 10px; /* 100px of height + 10px of border */
  border: 2px solid gray;
  border-bottom: 0;
  transform: rotate(90deg);
}



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
