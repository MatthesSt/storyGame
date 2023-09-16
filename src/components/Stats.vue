<script setup lang="ts">
import { ref } from "vue";
import { player } from "../ts/player";

</script>
<template>
    <div class="playerStats" >  
      <img class="emptyHealth" src="/player/playerEmptyHealth.png" style="height: 10px; top:20px;" :style="`
     width:${player.maxHealth/2}%;    
      `" >
      <img class="fullHealth" src="/player/playerFullHealth.png" style="height: 8px;top: 21px;" :style="`
     width:${(player.maxHealth- (player.maxHealth- player.currentHealth))/2}%;    
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

