import { player } from './player'
import { Entity } from './types'
import { ref } from 'vue'
import { getDistance, getVector } from './math'
import { performEnemyAttack, getEnemiesInArea } from './combat'
import { createEnemy } from './factory'

const gameTicks = ref(0)
const ticksPerSecond = 24

const enemyInterval = setInterval(() => {
  gameTicks.value++
  performEnemyAttack()
  if (gameTicks.value % 2 == 0) moveEnemy()
}, 1000 / ticksPerSecond)

export function moveEnemy() {
  if (player.value.currentHealth <= 0) return
  for (let enemy of enemies.value) {
    if (!getEnemiesInArea().find((e) => e.id === enemy.id)) continue
    let closeEnemies = getEnemiesInArea().filter((e) => getDistance(player.value, e) < e.lookRadius)
    if (closeEnemies.length) {
      for (let enemy of closeEnemies) {
        enemy.x += getVector(enemy, player.value)[0] * enemy.movespeed
        enemy.y += getVector(enemy, player.value)[1] * enemy.movespeed
      }
    }
    //TODO: wenn spieler nicht in der nähe, entweder zum spawnpunkt zurück kehren oder sich hin und her bewegen.
  }
}
