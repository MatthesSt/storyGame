<script setup lang="ts">
import { Entity, InvetorySlot, ItemCategory } from "../types";
import { items } from "../items";
import { npcInventory } from "../npcs";
import {
  buyItem,
  closeNpc,
  player,
  sellItem,
  hasFreeInventorySpace,
  giveItemToEntity,
  takeItemFromEntity,
} from "../player";
import { ref } from "vue";

defineProps<{
  player: Entity;
}>();

const movingItem = ref<{
  item: InvetorySlot | null;
  from?: "inventory" | "equipment";
}>({ item: null });

function dragFromInventory(item: InvetorySlot) {
  movingItem.value = { item, from: "inventory" };
}
function dragFromEquipment(key: ItemCategory) {
  if (!player.value.equipment) return;
  movingItem.value = {
    item: { id: player.value.equipment[key]!.id, amount: 1 },
    from: "equipment",
  };
}
function dragOver(storage: "inventory" | "equipment", event: DragEvent) {
  if (!movingItem.value || storage == movingItem.value.from) {
    event.dataTransfer!.dropEffect = "none";
  } else event.dataTransfer!.dropEffect = "move";
}

function dropAtEquipment(key: ItemCategory) {
  if (!movingItem.value || !movingItem.value.item) return;
  if (items[movingItem.value.item.id].category != key) return;
  if (player.value.equipment?.[key]) return;
  player.value.equipment![key] = items[movingItem.value.item.id];

  takeItemFromEntity(player.value, movingItem.value.item.id);
}
function dropAtInventory(key: ItemCategory) {
  if (!movingItem.value || !movingItem.value.item) return;
  const playerItem = player.value.equipment![key];
  if (!player.value.equipment || !playerItem) return;
  if (!hasFreeInventorySpace(player.value, playerItem.id)) return;
  giveItemToEntity(player.value, playerItem.id);
  player.value.equipment![key] = null;
  movingItem.value.item = null;
}
</script>
<template>
  <section class="playerInventory" v-if="player.inventory.openend">
    <div class="tile" v-for="item in player.inventory.items">
      <template v-if="item.id != 0">
        <button
          @click.stop="sellItem(item.id, closeNpc)"
          class="selectableItem"
        >
          <img
            draggable
            @dragstart="dragFromInventory(item)"
            @drop="
              $event.preventDefault();
              dropAtInventory(items[item.id].category as ItemCategory);
            "
            v-if="items[item.id]?.image"
            :src="items[item.id]?.image"
          />
          <span v-else> {{ items[item.id]?.name }}</span>
        </button>
        <span class="amount">{{ item.amount }}</span>
      </template>
    </div>
    <div class="inventoryFooter">
      {{ player?.money }}
      <img src="item/coin.png" style="height: 100%; margin-left: 5px" />
    </div>
  </section>
  <section class="playerEquipment">
    <div
      class="equipment"
      v-for="[key, item] in Object.entries(player.equipment || {})"
    >
      <img
        :src="item?.image || `equipment_bg/${key}_bg.png`"
        style="height: 100%; width: 100%; object-fit: contain"
        @dragover="$event.dataTransfer!.dropEffect = 'move'"
        @drop="dropAtEquipment(key as ItemCategory)"
      />
    </div>
  </section>
  <section class="npcInventory" v-if="closeNpc?.inventory.openend">
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
  </section>
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
.playerEquipment {
  width: calc($tileSize * 4);
  height: calc($tileSize * 4);
  position: absolute;
  background-color: rgb(240, 184, 30);
  right: 0;
  bottom: 0;
  transform: translateX(100%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.equipment {
  width: calc($tileSize * 4 / 3);
  height: calc($tileSize * 4 / 3);
  border: 1px solid #855e16;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
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
  display: flex;
  align-items: center;
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
