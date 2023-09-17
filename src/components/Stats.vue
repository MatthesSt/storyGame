<script setup lang="ts">
import { player } from '../ts/player'
</script>
<template>
  <div class="playerStats">
    <div class="health">
      <img class="emptyHealth" src="/player/playerEmptyBar.png" :style="`width:${player.maxHealth}px;`" />
      <img
        class="fullHealth"
        src="/player/playerFullHealth.png"
        :style="`width:${player.maxHealth - (player.maxHealth - player.currentHealth)}px;; z-index: 1`"
      />
      <div style="top: 17px; position: absolute; color: white; z-index: 1" :style="`right:${35}px`">
        {{ player.currentHealth }}/{{ player.maxHealth }}
      </div>
    </div>
    <div class="mana" style="top: 20px">
      <img class="emptyMana" src="/player/playerEmptyBar.png" style="top: 37px" :style="`width:${player.maxMana}px;`" />
      <img
        class="fullMana"
        src="/player/playerFullMana.png"
        style="top: 37px"
        :style="`z-index: 1;width:${player.maxMana - (player.maxMana - player.currentMana)}px;`"
      />
      <div style="top: 37px; position: absolute; color: white; z-index: 1" :style="`right:${35}px`">
        {{ player.currentMana }}/{{ player.maxMana }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../style.scss';

.playerStats img {
  right: 100px;
  top: 20px;
  position: absolute;
  height: 12px;
}
</style>
