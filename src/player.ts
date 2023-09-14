import { computed, ref } from "vue";
import { isPressed } from "./controls";
import { getDistance, getTileIndices, getTilePosition } from "./math";
import { Player } from "./types";
import { npcs } from "./npcs";
import { currentArea, areas } from "./area";

export const player = ref<Player>({
  id: 0,
  name: "Player",
  x: 160,
  y: 160,
  direction: 0 as 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315,
  movespeed: 3,
  talking: false,
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
}, 1000 / ticksPerSecond);
function playerCommunication() {
  if (!player.value.talking && !isPressed("e")) return;
  const talkingNpc = npcs.value.find((npc) => npc.id == closeNpc.value?.id);
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
