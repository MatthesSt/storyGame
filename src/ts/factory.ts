import ENEMIES from '../data/enemies.json'
import type { Entity, InvetorySlot, Tuple } from './types'

export function createEnemy(
  name: keyof typeof ENEMIES,
  level: number,
  x: number,
  y: number,
  dialog?: Entity['dialog']
): Entity {
  return {
    x,
    y,
    level,
    type: 'enemy',
    direction: 0,
    money: 0,
    talking: false,
    currentDialog: dialog ? 'initial' : undefined,
    dialog: dialog ? dialog : {},
    inventory: createInventoryWithItems(),
    equipment: createEquipmentWithItems(),
    ...ENEMIES[name],
  } as Entity
}

export function entityFactory(options: { type: Entity['type'] } & Partial<Entity>): Entity {
  return {
    name: '',
    level: 1,
    lookRadius: 0,
    maxHealth: 0,
    currentHealth: 0,
    maxMana: 0,
    currentMana: 0,
    abilities: [],
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    image: '',
    direction: 0,
    movespeed: 0,
    money: 0,
    talking: false,
    inventory: createInventoryWithItems(),

    equipment: createEquipmentWithItems(),
    ...options,
  }
}

export function createInventoryWithItems(items?: InvetorySlot[]) {
  return {
    size: 16,
    items: Array(16)
      .fill({ amount: 0, id: 0 })
      .map((_, i) => items?.[i] || { amount: 0, id: 0 }) as Tuple<InvetorySlot, 16>,
    openend: false,
    blockOpen: false,
  }
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
