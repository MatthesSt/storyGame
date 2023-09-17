import { areas, currentArea } from "./area";
import { isPressed } from "./controls";
import { enemies } from "./enemy";
import { getDistance } from "./math";
import { gameTicks, player } from "./player";
import { Entity } from "./types";

export function entityAttack(entity: Entity){
    if (entity.type =="player"&& isPressed('f'))   playerAttack(entity)
    
}

export function playerAttack(entity: Entity){
    if (canNotAttack(entity)) return  
    if (!entity.equipment?.weapon ) return
    if (entity.equipment.weapon?.type === 'melee') {
        meleeAtack(entity)
    }
}
function canNotAttack(entity: Entity){
    if (entity.attacking|| entity.blocking )return true
    if (!entity.equipment)return true
    return false
}

export function meleeAtack(entity: Entity){
    if (!(gameTicks.value*24 % entity.equipment?.weapon?.useSpeed! === 0))return true //every weapon has an useSpeed so shut up
    let closeEnemies = getEnemiesInRange(entity)
    if (!entity.equipment?.weapon?.damage ||!closeEnemies||!returnNumberOfEnemyInCurrentArea()) return
for (let enemy of enemies.value) {
    if (!closeEnemies) return
    console.log(closeEnemies)
    if (!closeEnemies.find((e)=>e.id)) return
    console.log("test", closeEnemies.find((e)=>e.id === enemy.id))
    closeEnemies.find((e)=>e.id === enemy.id)!.currentHealth -= entity.equipment?.weapon?.damage
    if ( enemies.value.find((e)=> closeEnemies.find((n)=> n.id=== e.id))!.currentHealth===0){
        areas.value[currentArea.value].enemies = areas.value[currentArea.value].enemies?.filter((e)=> e !== enemies.value.find((e)=> closeEnemies.find((n)=> n.id=== e.id))!.id)
        }       
    }
}

export function getEnemiesInRange(entity: Entity){
    return enemies.value.filter(
        (n, index)=> areas.value[currentArea.value].enemies[index] === n.id).filter(
            (t)=> getDistance(entity, t)< entity.equipment?.weapon?.range!)
}

export function returnLivingEnemyInCurrentArea(){
    return enemies.value.filter((e)=>areas.value[currentArea.value].enemies.find((n)=> n ===e.id))
}
export function returnNumberOfEnemyInCurrentArea(){
    return enemies.value.filter((e)=>areas.value[currentArea.value].enemies.find((n)=> n ===e.id)).length
}
