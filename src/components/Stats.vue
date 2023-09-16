<script setup lang="ts">
import { ref } from "vue";
import { player } from "../ts/player";

</script>
<template>
    <div class="playerStats" >  
        <div class="health"  >
            <img class="emptyHealth" src="/player/playerEmptyBar.png" style="right: 100px; top: 20px; position: absolute;" :style="`width:${player.maxHealth}px;`" >
            <img class="fullHealth" src="/player/playerFullHealth.png" style="right: 100px; top: 20px; position: absolute; z-index: 1;" :style="`
            width:${(player.maxHealth- (player.maxHealth- player.currentHealth))}px;`">
             <div  style="top: 17px; position: absolute; color: white; z-index: 1;" :style="
             `right:${35}px`">{{ player.currentHealth }}/{{ player.maxHealth }}</div>
     </div>
     <div class="mana" >
        <img class="emptyMana" src="/player/playerEmptyBar.png" style="right: 100px; top: 40px; position: absolute;" :style="`width:${player.maxMana}px;`" >
            <img class="fullMana" src="/player/playerFullMana.png" style="right: 100px; top: 40px; position: absolute; z-index: 1;" :style="`
            width:${(player.maxMana- (player.maxMana- player.currentMana))}px;`">
             <div  style="top: 37px; position: absolute; color: white; z-index: 1;" :style="
             `right:${35}px`">{{ player.currentMana }}/{{ player.maxMana }}</div>
     </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../style.scss";

.playerStats  img{
    height: 12px;
}
</style>

