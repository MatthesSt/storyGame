import { areas, currentArea } from "./area";
import { isPressed } from "./controls";
import { enemies } from "./enemy";
import { getDistance } from "./math";
import { gameTicks, player } from "./player";
import { Entity } from "./types";

export function entityAttack(entity: Entity){
if (entity.equipment?.weapon)

if (!isPressed("f") ||canNotAttack(entity)) return
let closeEnemies = enemies.value.filter((e)=> getDistance(player.value, e)< player.value.equipment?.weapon?.range  )
player.value.attacking =true
console.log("attack")

}

function canNotAttack(entity: Entity){
    if (!entity.equipment?.weapon?.useSpeed || !(gameTicks.value*24 % entity.equipment?.weapon?.useSpeed == 0) ||
    entity.attacking|| entity.blocking || !entity.equipment?.weapon?.range) return false   
}