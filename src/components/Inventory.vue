<script setup lang="ts">
import { Entity, InvetorySlot } from "../ts/types";
import { items } from "../ts/items";
import { npcInventory } from "../ts/npcs";
import { buyItem, closeNpc, sellItem } from "../ts/player";

defineProps<{
  player: Entity;
}>();

function sellToMerchant(item: InvetorySlot) {
  if (!closeNpc.value) return;
  sellItem(item.id, closeNpc.value.id);
}
</script>
<template>
  <div class="playerInventory" v-if="player.inventory.openend">
    <div class="tile" v-for="item in player.inventory.items">
      <template v-if="item.id != 0">
        <button @click.stop="sellToMerchant(item)" class="selectableItem">
          <img v-if="items[item.id]?.image" :src="items[item.id]?.image" />
          <span v-else> {{ items[item.id]?.name }}</span>
        </button>
        <span class="amount">{{ item.amount }}</span>
      </template>
    </div>
    <div class="inventoryFooter">Gold: {{ player?.money }}</div>
  </div>
  <div class="npcInventory" v-if="closeNpc?.inventory.openend">
    <div class="tile" v-for="item in npcInventory">
      <template v-if="item.id != 0">
        <button
          @click.stop="buyItem(item.id, closeNpc.id)"
          class="selectableItem"
        >
          <img v-if="items[item.id]?.image" :src="items[item.id]?.image" />
          <span v-else> {{ items[item.id]?.name }}</span>
        </button>
        <span class="amount">{{ item.amount }}</span>
      </template>
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
  padding: 0;
  margin: 0;
}
</style>
