import { areas, currentArea } from './area'
import { isPressed } from './controls'
import { enemies } from './enemy'
import { getDistance } from './math'
import { gameTicks, player } from './player'
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
  if (getDistance(entitiy, player.value) <= entitiy.lookRadius / 2) console.log('melee', entitiy)
}
export function enemyRangeAttack(entitiy: Entity) {
  if (getDistance(entitiy, player.value) <= entitiy.lookRadius) return
  if (getDistance(entitiy, player.value) <= entitiy.lookRadius * 2) console.log('range', entitiy)
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
  if (CheckForEnemiesInArea()) attackEntity(player.value)
  player.value.attacking = false
}
export function CheckForEnemiesInArea() {
  if (areas.value[currentArea.value].enemies.length) return true
  else return false
}

export function attackEntity(entity: Entity) {
  if (entity.type === 'player' && entity.equipment.weapon?.range && entity.equipment.weapon?.damage)
    dealDamage(player.value, getEnemiesInRange(entity))
}

export function dealDamage(dealer: Entity, targets: Entity[]) {
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
