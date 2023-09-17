import { areas, currentArea } from './area'
import { isPressed } from './controls'
import { enemies } from './enemy'
import { getDistance } from './math'
import { gameTicks, player, ticksPerSecond } from './player'
import { Entity } from './types'

export function enemyAttack() {
  for (let enemy of enemies.value) {
    if (getEnemiesInArea().find((e) => e.id === enemy.id)) {
      if (enemy.abilities?.range?.length) enemyRangeAttack(enemy)
      if (enemy.abilities?.melee?.length) enemyMeleeAttack(enemy)
    }
  }
}

export function enemyMeleeAttack(entitiy: Entity) {
  if (
    entitiy.abilities?.melee![0].attackSpeed &&
    (gameTicks.value % entitiy.abilities?.melee![0].attackSpeed) * ticksPerSecond === 0
  ) {
    if (getDistance(entitiy, player.value) <= entitiy.lookRadius) dealDamageToPlayer(entitiy)
  }
}

export function enemyRangeAttack(entitiy: Entity) {
  if (
    entitiy.abilities?.range![0].attackSpeed &&
    (gameTicks.value % entitiy.abilities?.range![0].attackSpeed) * ticksPerSecond === 0
  ) {
    if (getDistance(entitiy, player.value) <= entitiy.lookRadius) return
    if (getDistance(entitiy, player.value) <= entitiy.lookRadius * 2) dealDamageToPlayer(entitiy) // [] weil es könten un zukunft mehr
  }
}

export function dealDamageToPlayer(enemy: Entity) {
  // TODO: nicht .find fürs erste sonden zufällig oder mit algo einen der melee atacken auswählen
  if (enemy.abilities?.melee) enemy.abilities.melee.find((e) => (player.value.currentHealth -= e.damage))
}

export function playerAttack() {
  if (!isPressed('f')) return
  if (
    !player.value.equipment ||
    !player.value.equipment.weapon ||
    !player.value.equipment.weapon.damage ||
    !player.value.equipment.weapon.useSpeed ||
    !player.value.equipment.weapon.range
  )
    return
  if (gameTicks.value % player.value.equipment.weapon.useSpeed !== 0) return
  if (player.value.attacking) return
  player.value.attacking = true
  if (CheckForEnemiesInArea()) attackEnemy()
  player.value.attacking = false
}
export function CheckForEnemiesInArea() {
  if (areas.value[currentArea.value].enemies.length) return true
  else return false
}

export function attackEnemy() {
  if (player.value.equipment.weapon?.range && player.value.equipment.weapon?.damage)
    dealDamageToEnemy(player.value, getEnemiesInRange(player.value))
}

export function dealDamageToEnemy(dealer: Entity, targets: Entity[]) {
  for (let target of targets) {
    target.currentHealth -= dealer.equipment.weapon?.damage! //zuvor bereits gecheckt
    if (target.currentHealth === 0) killEnemy(target)
  }
}

export function killEnemy(enemy: Entity) {
  enemies.value = enemies.value.filter((e) => e.id !== enemy.id)
}

export function getEnemiesInRange(entity: Entity) {
  return getEnemiesInArea().filter((e) => getDistance(e, entity) < entity.equipment.weapon?.range!) //zuvor bereits gecheckt
}

export function getEnemiesInArea() {
  return enemies.value.filter((enemy) => areas.value[currentArea.value].enemies.find((n) => n === enemy.id))
}
