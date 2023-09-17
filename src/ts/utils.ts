import { ref } from 'vue'
import { Tuple } from './typehelpers'
import { ABILITY_CATEGORIES, Entity, InvetorySlot } from './types'

const entityCounter = ref(1)

export function createInventoryWithItems(items?: InvetorySlot[]) {
  return Array(16)
    .fill({ amount: 0, id: 0 })
    .map((_, i) => items?.[i] || { amount: 0, id: 0 }) as Tuple<InvetorySlot, 16>
}

export function createEquipmentWithItems(items?: Partial<Entity['equipment']>) {
  return {
    head: items?.head || null,
    body: items?.body || null,
    legs: items?.legs || null,
    shield: items?.shield || null,
    arms: items?.arms || null,
    boots: items?.boots || null,
    weapon: items?.weapon || null,
    tool: items?.tool || null,
    accessory: items?.accessory || null,
  }
}

export function entityFactory(options: { type: Entity['type'] } & Partial<Entity>): Entity {
  return {
    id: entityCounter.value++,
    name: '',
    level: 1,
    lookRadius: 0,
    maxHealth: 0,
    currentHealth: 0,
    maxMana: 0,
    currentMana: 0,
    abilities: {
      melee: [ABILITY_CATEGORIES.attack.melee.bite, ABILITY_CATEGORIES.attack.melee.bodySlam],
      range: [ABILITY_CATEGORIES.attack.range.slimeSpit],
    },
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    image: '',
    direction: 0,
    movespeed: 0,
    money: 0,
    talking: false,
    inventory: {
      size: 16,
      items: createInventoryWithItems(),
    },
    equipment: createEquipmentWithItems(),
    ...options,
  }
}
