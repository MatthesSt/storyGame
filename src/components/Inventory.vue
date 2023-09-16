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
  itemId: number | null;
  from?: "inventory" | "equipment";
}>({ itemId: null });

function dragFromInventory(itemId: number) {
  if (itemId == 0) return;
  movingItem.value = { itemId, from: "inventory" };
}

function dragFromEquipment(key: ItemCategory) {
  if (!player.value.equipment) return;
  movingItem.value = {
    itemId: player.value.equipment[key]!.id,
    from: "equipment",
  };
}
function markAsDropzone(event: DragEvent, storage: "inventory" | "equipment") {
  //no item to move
  if (!movingItem.value || !movingItem.value.itemId) {
    return (event.dataTransfer!.dropEffect = "none");
  }
  //no space in inventory/equipment
  if (
    (storage == "inventory" &&
      !hasFreeInventorySpace(player.value, movingItem.value.itemId)) ||
    (storage == "equipment" &&
      player.value.equipment?.[items[movingItem.value.itemId].category])
  ) {
    return (event.dataTransfer!.dropEffect = "none");
  }
  //moveable
  event.dataTransfer!.dropEffect = "move";
  event.preventDefault();
}

function dropAtEquipment() {
  if (!movingItem.value || !movingItem.value.itemId) return;
  if (player.value.equipment?.[items[movingItem.value.itemId].category]) return;
  player.value.equipment![items[movingItem.value.itemId].category] =
    items[movingItem.value.itemId];

  takeItemFromEntity(player.value, movingItem.value.itemId);
  movingItem.value = { itemId: null };
}
function dropAtInventory() {
  giveItemToEntity(player.value, movingItem.value.itemId!);
  player.value.equipment![items[movingItem.value.itemId!].category] = null;
  movingItem.value = { itemId: null };
}
</script>
<template>
  <section class="playerInventory" v-if="player.inventory.openend">
    <div class="tile" v-for="(item, index) in player.inventory.items">
      <img
        :draggable="!!item.id"
        style="height: 100%; width: 100%; object-fit: contain"
        :style="`cursor: ${item.id ? 'grab' : 'default'}`"
        @dragstart="dragFromInventory(item.id)"
        @dragover="markAsDropzone($event, 'inventory')"
        @drop="dropAtInventory()"
        :src="items[item.id]?.image || 'empty_bg.png'"
        @click.stop="sellItem(item.id, closeNpc)"
        class="selectableItem"
      />
      <span class="amount">{{ item.amount }}</span>
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
        @dragover="markAsDropzone($event, 'equipment')"
        @drop="dropAtEquipment()"
        @dragstart="dragFromEquipment(key as ItemCategory)"
        :draggable="!!item"
      />
    </div>
  </section>
  <section class="npcInventory" v-if="closeNpc?.inventory.openend">
    <div class="tile" v-for="item in npcInventory">
      <img
        style="height: 100%; width: 100%; object-fit: contain"
        :style="`cursor: ${item.id ? 'pointer' : 'default'}`"
        :src="items[item.id]?.image || 'empty_bg.png'"
        @click.stop="buyItem(item.id, closeNpc.id)"
      />
      <span class="amount">{{ item.amount }}</span>
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
  pointer-events: none;
}
</style>
