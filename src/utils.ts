import { ref } from "vue";
import { Tuple } from "./typehelpers";
import { Entity, InvetorySlot } from "./types";

const entityCounter = ref(1);

export function createInventoryWithItems(items: InvetorySlot[]) {
  return Array(16)
    .fill({ amount: 0, id: 0 })
    .map((_, i) => items[i] || { amount: 0, id: 0 }) as Tuple<InvetorySlot, 16>;
}

export function entityFactory(options: Partial<Entity> = {}): Entity {
  return {
    id: entityCounter.value++,
    name: "",
    x: 0,
    y: 0,
    direction: 0,
    movespeed: 0,
    money: 0,
    talking: false,
    inventory: {
      size: 16,
      items: createInventoryWithItems([]),
    },
    ...options,
  };
}
