import { createInventoryWithItems, entityFactory } from "./utils";
import {player} from "./player"
import { Entity } from "./types";
import { ref } from "vue";
import { areas, currentArea } from "./area";
import { getDistance, getVector } from "./math";

export const enemies= ref<Entity[]>([
   entityFactory({
    id: 1,
    name: "bat",
    type:"enemy",
    maxHealth:10,
    currentHealth: 10,
    x: 200,
    y: 200,
    height: 12,
    width: 28,
    movespeed: 4, 
    lookRadius:100,
    image: "enemy/bat.png",
  }),
  entityFactory({
    id: 2,
    name: "slime",
    type:"enemy",
    maxHealth:20,
    currentHealth: 20,
    x: 320,
    y: 220,
    height: 28,
    width: 26,
    movespeed: 2, 
    lookRadius:75,
    image: "enemy/slime.png",
  })
]);

const gameTicks = ref(0);
const ticksPerSecond = 24;

const enemyInterval = setInterval(() => {
    gameTicks.value++;
      if (gameTicks.value % 2 == 0) moveEnemy(); 
  }, 1000 / ticksPerSecond);

export function moveEnemy() {
  if (!areas.value[currentArea.value].enemies?.length) return
  let closeEnemies = enemies.value.filter((e)=> getDistance(player.value, e)< e.lookRadius  )
  if (closeEnemies.length) {
    for (let enemy of closeEnemies){
      enemy.x += getVector(enemy,player.value)[0] *enemy.movespeed 
      enemy.y += getVector(enemy,player.value)[1] *enemy.movespeed
    }
  } 
  //TODO: wenn spieler nicht in der nähe, entweder zum spawnpunkt zurück kehren oder sich hin und her bewegen.
}