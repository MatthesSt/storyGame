import { computed, ref } from "vue";
import { isPressed } from "./controls";
import { areas, currentArea } from "./area";
import { getDistance } from "./math";
import { Player } from "./types";

export const player = ref<Player>({
  name: "Player",
  x: 160,
  y: 160,
  direction: 0 as 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315,
  movespeed: 3,
});

export function movePlayer(dx: number, dy: number) {
  player.value.x += dx * player.value.movespeed;
  player.value.y += dy * player.value.movespeed;
  if (dx && dy) {
    player.value.direction = dx > 0 ? (dy > 0 ? 135 : 45) : dy > 0 ? 225 : 315;
  } else {
    player.value.direction = dx > 0 ? 90 : dx < 270 ? 0 : dy > 0 ? 180 : 0;
  }
}

const movementInterval = setInterval(() => {
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
}, 1000 / 24);

export const closeNpc = computed(() => {
  return areas[currentArea.value].npcs.find((npc) => {
    return getDistance(npc, player.value) < 40;
  });
});
