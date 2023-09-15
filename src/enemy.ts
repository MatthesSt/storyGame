import { createInventoryWithItems, entityFactory } from "./utils";
import {player} from "./player"
import { Entity } from "./types";
import { ref } from "vue";
import { areas, currentArea } from "./area";

export const enemies= ref<Entity[]>([
   entityFactory({
    id: 0,
    name: "bat",
    x: 200,
    y: 200,
    height: 12,
    width: 28,
    movespeed: 0.1, //schnell genug zum sehen aber langsam genug zum weglaufen können
    lookRadius:100,
    image: "enemy/bat.png",
  }),
  entityFactory({
    id: 1,
    name: "slime",
    x: 220,
    y: 220,
    height: 28,
    width: 26,
    movespeed: 0.1, //schnell genug zum sehen aber langsam genug zum weglaufen können
    lookRadius:100,
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
let closeEnemies = enemies.value.filter((e)=> distanceCalculator(player.value.x, player.value.y, e.x, e.y)< e.lookRadius  )
if (!closeEnemies.length) return
for (let enemy of closeEnemies){
    console.log("enemy moved")
    enemy.x += (player.value.x - enemy.x) *enemy.movespeed 
    enemy.y += (player.value.y - enemy.y) *enemy.movespeed

}
}

function distanceCalculator(enemyTargetX:number, enemyTargetY:number, enemyX:number, enemyY:number ) {
    const entfernung = Math.sqrt((enemyTargetY -enemyY) **2 + (enemyTargetX -enemyX) **2 );
    return entfernung;
  }
  
  





