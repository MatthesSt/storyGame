<script setup lang="ts">
import { ref } from "vue";
import { player } from "../ts/player";

</script>
<template>
    <div class="playerStats" >  
      <img class="emptyHealth" src="/player/playerEmptyHealth.png" style="height: 10px; top:20px;"  >
      <img class="fullHealth" src="/player/playerFullHealth.png" style="height: 8px;top: 21px;" :style="`
     width:${player.currentHealth/ player.maxHealth}%;    
      `">
  </div>
</template>
<style lang="scss" scoped>
@import "../style.scss";
.playerStats  img{
    position: absolute;
    
     right: 100px;
    //  transform:translateX(-50%);
   
}
</style>

