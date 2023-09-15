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
    movespeed: 1,
    lookRadius:100,
    image: "enemy/bat.png",
  }),
]);


const gameTicks = ref(0);
const ticksPerSecond = 24;

const playerInputInterval = setInterval(() => {
    gameTicks.value++;
      if (gameTicks.value % 12 == 0) moveEnemy();
  }, 1000 / ticksPerSecond);
  


export function moveEnemy() {
let closeEnemies = enemies.value.filter((e)=> distanceCalculator(player.value.x, player.value.y, e.x, e.y)< e.lookRadius  )
 console.log("close enemies:",closeEnemies)
 
}

function distanceCalculator(enemyTargetX:number, enemyTargetY:number, enemyX:number, enemyY:number ) {
    const entfernung = Math.sqrt((enemyTargetY -enemyY) **2 + (enemyTargetX -enemyX) **2 );
    return entfernung;
  }
  
  
distanceCalculator(10, 10, 10, 10);
  





