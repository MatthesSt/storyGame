import { computed, ref } from "vue";
import { isPressed } from "./controls";
import { getDistance, getTileIndices, getTilePosition } from "./math";
import { Entity, Player } from "./types";
import { npcs } from "./npcs";
import { currentArea, areas } from "./area";
import { items } from "./items";
import {
  createInventoryWithItems,
  entityFactory,
  createEquipmentWithItems,
} from "./utils";

export const player = ref<Player>(
  entityFactory({
    id: 0,
    name: "Player",
    x: 160,
    y: 160,
    money: 100,
    movespeed: 3,
    image: "player/player_default_front.png",
    inventory: {
      size: 16,
      items: createInventoryWithItems([{ amount: 1, id: 1 }]),
    },
    equipment: createEquipmentWithItems(),
  })
);

const gameTicks = ref(0);
const ticksPerSecond = 24;

const playerInputInterval = setInterval(() => {
  gameTicks.value++;
  if (!player.value.talking) {
    playerMovement();
    if (gameTicks.value % 12 == 0) checkPortals();
  }
  playerCommunication();
  togglePlayerInventory();
}, 1000 / ticksPerSecond);

function playerCommunication() {
  if (!player.value.talking && !isPressed("e")) return;
  const talkingNpc = areas.value[currentArea.value].npcs
    .map((e) => npcs.value.find((n) => n.id == e))
    .find((npc) => npc?.id == closeNpc.value?.id);
  if (!talkingNpc || !talkingNpc.dialog) return;
  player.value.talking = true;
  talkingNpc.talking = true;
  talkingNpc.currentDialog = talkingNpc.currentDialog || "";
}

function playerMovement() {
  if (isPressed("ArrowUp")) {
    movePlayer(0, -1);
    player.value.image = "player/player_default_back.png";
  }
  if (isPressed("ArrowDown")) {
    movePlayer(0, 1);
    player.value.image = "player/player_default_front.png";
  }
  if (isPressed("ArrowLeft")) {
    movePlayer(-1, 0);
    player.value.image = "player/player_default_left.png";
  }
  if (isPressed("ArrowRight")) {
    movePlayer(1, 0);
    player.value.image = "player/player_default_right.png";
  }
}
function togglePlayerInventory() {
  if (isPressed("i") && !player.value.inventory.blockOpen) {
    player.value.inventory.blockOpen = true;
    setTimeout(() => {
      player.value.inventory.blockOpen = false;
    }, 100);
    player.value.inventory.openend = !player.value.inventory.openend;
  }
}
function checkPortals() {
  const playerTileIndices = getTileIndices([player.value.x, player.value.y]);
  const usedPortal = areas.value[currentArea.value].portals.find(
    (p) =>
      p.position[0] == playerTileIndices[0] &&
      p.position[1] == playerTileIndices[1]
  );
  if (usedPortal && !usedPortal.blocked) {
    currentArea.value = usedPortal.targetArea;
    const nextPortal = areas.value[currentArea.value].portals.find(
      (p) => p.id == usedPortal.targetPortalId
    );
    if (!nextPortal) return;
    nextPortal.blocked = true;
    setTimeout(() => {
      nextPortal.blocked = false;
    }, 2000);
    player.value.x = getTilePosition(nextPortal.position)[0];
    player.value.y = getTilePosition(nextPortal.position)[1];
  }
}

export function movePlayer(dx: number, dy: number) {
  player.value.x += dx * player.value.movespeed;
  player.value.y += dy * player.value.movespeed;
  if (dx && dy) {
    player.value.direction = dx > 0 ? (dy > 0 ? 135 : 45) : dy > 0 ? 225 : 315;
  } else {
    player.value.direction = dx > 0 ? 90 : dx < 270 ? 0 : dy > 0 ? 180 : 0;
  }
}
export const closeNpc = computed(() => {
  return npcs.value
    .filter((n) => areas.value[currentArea.value].npcs.find((e) => e == n.id))
    .find((npc) => getDistance(npc, player.value) < 65);
});

export function buyItem(itemId: number, merchantId: number) {
  if (!hasMoney(player.value, items[itemId].value)) return;
  if (!hasFreeInventorySpace(player.value, itemId)) return;
  if (!hasItem(npcs.value.find((n) => n.id == merchantId)!, itemId)) return;

  const merchant = npcs.value.find((n) => n.id == merchantId)!;
  if (!hasItem(merchant, itemId)) return;

  giveItemToEntity(player.value, itemId);
  updateMoneyFromEntity(player.value, -items[itemId].value);
  takeItemFromEntity(merchant, itemId);
}

export function sellItem(itemId: number, merchant: Entity | undefined) {
  if (!merchant || !merchant.talking || !merchant.inventory.openend) return;
  if (!hasItem(player.value, itemId)) return;

  if (!hasMoney(merchant, items[itemId].value)) return;
  if (!hasFreeInventorySpace(merchant, itemId)) return;

  takeItemFromEntity(player.value, itemId);
  updateMoneyFromEntity(player.value, items[itemId].value);
  giveItemToEntity(merchant, itemId);
}

function updateMoneyFromEntity(entity: Entity, amount: number) {
  entity.money += amount;
}
function hasMoney(entity: Entity, amount: number) {
  return entity.money >= amount;
}

function hasItem(entity: Entity, itemId: number) {
  return entity.inventory.items.find((i) => i.id == itemId);
}

export function takeItemFromEntity(entity: Entity, itemId: number) {
  const item = entity.inventory.items.find((i) => i.id == itemId)!;
  item.amount--;
  if (item.amount <= 0) {
    item.id = 0;
  }
}

export function giveItemToEntity(entity: Entity, itemId: number) {
  let item = entity.inventory.items.find((i) => i.id == itemId);
  if (!item || item.amount >= items[itemId].maxStack!) {
    const freeSlotIndex = entity.inventory.items.findIndex((i) => i.id == 0);
    entity.inventory.items[freeSlotIndex] = {
      amount: 1,
      id: itemId,
    };
  } else if (item.amount < items[itemId].maxStack!) {
    item.amount++;
  }
}

export function hasFreeInventorySpace(entitiy: Entity, itemId: number) {
  return (
    entitiy.inventory.items.find((i) => i.id == 0) ||
    entitiy.inventory.items.find((i) => i.id == itemId)?.amount! <
      items[itemId].maxStack!
  );
}
