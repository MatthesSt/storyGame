import { computed, ref, watch } from "vue";
import { isPressed } from "./controls";
import { getDistance, getTileIndices, getTilePosition } from "./math";
import { Entity, Item, ItemSlot, Player } from "./types";
import { npcs } from "./npcs";
import { currentArea, areas } from "./area";
import { items } from "./items";

export const player = ref<Player>({
  id: 0,
  name: "Player",
  x: 160,
  y: 160,
  money: 100,
  direction: 0 as 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315,
  movespeed: 3,
  talking: false,
  inventory: {
    size: 16,
    items: [{ amount: 1, id: 1, inventorySlotIndex: 0 }],
  },
});

const gameTicks = ref(0);
const ticksPerSecond = 24;

const playerInputInterval = setInterval(() => {
  gameTicks.value++;
  if (!player.value.talking) {
    playerMovement();
    if (gameTicks.value % 12 == 0) checkPortals();
  }
  playerCommunication();
  playerInventory();
}, 1000 / ticksPerSecond);

function playerCommunication() {
  if (!player.value.talking && !isPressed("e")) return;
  const talkingNpc = areas.value[currentArea.value].npcs
    .map((e) => npcs.value.find((n) => n.id == e))
    .find((npc) => npc?.id == closeNpc.value?.id);
  if (!talkingNpc || !talkingNpc.dialog) return;
  player.value.talking = true;
  talkingNpc.talking = true;
  talkingNpc.currentDialog = talkingNpc.currentDialog || 1;
}

function playerMovement() {
  if (isPressed("ArrowUp")) {
    movePlayer(0, -1);
  }
  if (isPressed("ArrowDown")) {
    movePlayer(0, 1);
  }
  if (isPressed("ArrowLeft")) {
    movePlayer(-1, 0);
  }
  if (isPressed("ArrowRight")) {
    movePlayer(1, 0);
  }
}
function playerInventory() {
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
export const closeNpc = computed(() =>
  npcs.value.find((npc) => getDistance(npc, player.value) < 65)
);

export function buyItem(itemId: number, merchantId: number) {
  if (player.value.money < items[itemId].value) return;

  let playerItem = player.value.inventory.items.find((i) => i.id == itemId);

  if (!hasFreeInventorySpace(player.value.inventory, itemId)) return;
  console.log("has free inventory space");
  giveItemToEntity(player.value, playerItem, itemId);
  player.value.money -= items[itemId].value;

  const item = npcs.value
    .find((n) => n.id == merchantId)
    ?.inventory.items.find((i) => i.id == itemId);
  if (!item) return;
  const merchant = npcs.value.find((n) => n.id == merchantId)!;
  takeItemFromEntity(merchant, item);
}

export function sellItem(itemId: number, merchantId: number) {
  let playerItem = player.value.inventory.items.find((i) => i.id == itemId);
  if (!playerItem) return;

  const merchant = npcs.value.find((n) => n.id == merchantId)!;
  const item = merchant?.inventory.items.find((i) => i.id == itemId);

  if (!hasFreeInventorySpace(merchant.inventory, itemId)) return;
  console.log("has free inventory space");

  takeItemFromEntity(player.value, playerItem);
  player.value.money += items[itemId].value;

  giveItemToEntity(merchant, item, itemId);
}

function takeItemFromEntity(entity: Player | Entity, item: ItemSlot) {
  item.amount--;
  if (item.amount <= 0) {
    entity.inventory.items.splice(entity.inventory.items.indexOf(item), 1);
  }
}

function giveItemToEntity(
  entity: Player | Entity,
  playerItem: ItemSlot | undefined,
  itemId: number
) {
  if (!playerItem) {
    playerItem = {
      amount: 1,
      id: itemId,
      inventorySlotIndex: entity.inventory.items.length,
    };
    entity.inventory.items.push(playerItem);
  } else {
    if (playerItem.amount >= items[itemId].maxStack!) {
      entity.inventory.items.push({ ...playerItem, amount: 1 });
    } else {
      playerItem.amount++;
    }
  }
}

function hasFreeInventorySpace(inventory: Entity["inventory"], itemId: number) {
  return (
    inventory.items.length < inventory.size ||
    inventory.items.find((i) => i.id == itemId)?.amount! <
      items[itemId].maxStack!
  );
}
