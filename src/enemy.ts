import { createInventoryWithItems, entityFactory } from "./utils";
import {player} from "./player"
import { Entity } from "./types";
import { ref } from "vue";

export const enemies= ref<Entity[]>([
   entityFactory({
    id: 1,
    name: "bat",
    x: 200,
    y: 200,
    height: 12,
    width: 28,
    movespeed: 0.1,
    lookRadius:50,
    image: "enemy/bat.png",
  }),
]);

const gameTicks = ref(0);
const ticksPerSecond = 24;

const playerInputInterval = setInterval(() => {
    gameTicks.value++;
      if (gameTicks.value % 2 == 0) moveEnemy();
  }, 1000 / ticksPerSecond);

export function moveEnemy() {
if (!enemies) return
let closeEnemies = enemies.value.filter((e)=> distanceCalculator(player.value.x, player.value.y, e.x, e.y)< e.lookRadius  )
if (!closeEnemies.length) return
console.log("close enemies:",closeEnemies)
for (let e= 0;e<closeEnemies.length; e++ ){
    closeEnemies[e].x += (player.value.x - closeEnemies[e].x) *closeEnemies[e].movespeed 
    closeEnemies[e].y += (player.value.y - closeEnemies[e].y) *closeEnemies[e].movespeed

}
}

function distanceCalculator(enemyTargetX:number, enemyTargetY:number, enemyX:number, enemyY:number ) {
    const entfernung = Math.sqrt((enemyTargetY -enemyY) **2 + (enemyTargetX -enemyX) **2 );
    return entfernung;
  }
  
  
distanceCalculator(10, 10, 10, 10);
  





