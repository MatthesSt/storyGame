<script setup lang="ts">
import { Entity } from "../types";
import { items } from "../items";
import { npcInventory } from "../npcs";
import { buyItem, closeNpc, sellItem } from "../player";
import { toRefs } from "vue";

const props = defineProps<{
  player: Entity;
}>();
const { player } = toRefs(props);

function sellToMerchant(n: number) {
  if (!closeNpc.value) return;
  sellItem(player.value.inventory.items[n - 1]?.id, closeNpc.value.id);
}
</script>
<template>
  <div class="playerInventory" v-if="player.inventory.openend">
    <div class="tile" v-for="n in player.inventory.size">
      <button @click.stop="sellToMerchant(n)" class="selectableItem">
        {{ items[player.inventory.items[n - 1]?.id]?.name }}
      </button>
      <span class="amount">{{ player.inventory.items[n - 1]?.amount }}</span>
    </div>
    <div class="inventoryFooter">Gold: {{ player?.money }}</div>
  </div>
  <div class="npcInventory" v-if="closeNpc?.inventory.openend">
    <div class="tile" v-for="n in 16">
      <button
        @click.stop="buyItem(npcInventory[n - 1].id, closeNpc.id)"
        class="selectableItem"
      >
        {{ items[npcInventory[n - 1]?.id]?.name }}
      </button>
      <span class="amount">{{ npcInventory[n - 1]?.amount }}</span>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../style.scss";
.playerInventory {
  width: calc($tileSize * 4);
  height: calc($tileSize * 4);
  position: absolute;
  background-color: rgb(240, 184, 30);
  right: 0;
  top: 0;
  transform: translateX(100%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.tile {
  width: $tileSize;
  height: $tileSize;
  border: 1px solid #855e16;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.inventoryFooter {
  width: 100%;
  height: 20px;
  background-color: rgb(240, 184, 30);
  position: absolute;
  bottom: 0%;
  transform: translateY(100%);
  padding: 2px;
}
.npcInventory {
  width: calc($tileSize * 4);
  height: calc($tileSize * 4);
  position: absolute;
  background-color: rgb(240, 184, 30);
  left: 0;
  top: 0;
  transform: translateX(-100%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.amount {
  bottom: 0;
  right: 0;
  position: absolute;
  font-size: 0.65rem;
  font-weight: 500;
  z-index: 1;
}
.selectableItem {
  border: none;
  width: min-content;
  height: min-content;
  background-color: transparent;
  cursor: pointer;
}
</style>
