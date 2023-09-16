import { areas, currentArea } from "./area";
import { isPressed } from "./controls";
import { enemies } from "./enemy";
import { getDistance } from "./math";
import { gameTicks, player } from "./player";
import { Entity } from "./types";

export function entityAttack(entity: Entity){
    if (entity.type =="player") playerAttack()
}

function canNotAttack(entity: Entity){
     return (!entity.equipment?.weapon?.useSpeed||!(gameTicks.value*24 % entity.equipment?.weapon?.useSpeed == 0) ||
    entity.attacking|| entity.blocking )  
}

export function playerAttack(){
    if (!isPressed('f'))return
    if (canNotAttack(player.value)) return
    let closeEnemies = enemies.value.filter((e)=> getDistance(player.value, e)< player.value.equipment?.weapon?.range!)
    if (player.value.equipment?.weapon?.type === 'melee') {meleeAtack(player.value, closeEnemies)
    }
}

export function meleeAtack(atacker: Entity, targets:Entity[]){
for (let enemy in targets) {
    console.log(enemies.value[enemy])
}
}

    // player.value.attacking =true
    // console.log("attack")