import { areas, currentArea } from "./area";
import { isPressed } from "./controls";
import { enemies } from "./enemy";
import { getDistance } from "./math";
import { gameTicks, player } from "./player";
import { Entity } from "./types";

export function entityAttack(entity: Entity){
    if (entity.type =="player"&& !isPressed('f')) return
    attack(entity)
}

export function attack(entity: Entity){
    if (canNotAttack(entity)) return  
    if (!entity.equipment ) return
    if (!areas.value[currentArea.value].enemies) return
    let closeEnemies = enemies.value.filter((n, index)=> areas.value[currentArea.value].enemies[index] === n.id).filter((e)=> getDistance(entity, e)< entity.equipment?.weapon?.range!)
    if (entity.equipment.weapon?.type === 'melee') {
        meleeAtack(entity, closeEnemies)
    }
}
function canNotAttack(entity: Entity){
    if ( entity.attacking|| entity.blocking ) return true
    if (!entity.equipment || !entity.equipment.weapon ||!entity.equipment.weapon.useSpeed)return true
     if (!(gameTicks.value*24 % entity.equipment?.weapon?.useSpeed == 0))   return true
}

export function meleeAtack(entity: Entity, targets:Entity[]){
if (!entity.equipment?.weapon?.damage) return
for (let enemy in targets) {
    console.log("targets", targets)
    console.log("enemy", enemy)
    enemies.value.find((e)=> targets.find((n)=> n.id=== e.id))!.currentHealth -= entity.equipment?.weapon?.damage
    if ( enemies.value.find((e)=> targets.find((n)=> n.id=== e.id))!.currentHealth===0){
        areas.value[currentArea.value].enemies = areas.value[currentArea.value].enemies?.filter((e)=> e !== enemies.value.find((e)=> targets.find((n)=> n.id=== e.id))!.id)
        }       
    }
}
