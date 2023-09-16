import { ref } from "vue";
import { Tuple } from "./typehelpers";
import { Entity, InvetorySlot } from "./types";

const entityCounter = ref(1);

export function createInventoryWithItems(items?: InvetorySlot[]) {
  return Array(16)
    .fill({ amount: 0, id: 0 })
    .map((_, i) => items?.[i] || { amount: 0, id: 0 }) as Tuple<
    InvetorySlot,
    16
  >;
}

export function createEquipmentWithItems(items?: Partial<Entity["equipment"]>) {
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
  };
}

export function entityFactory(options: Partial<Entity> = {}): Entity {
  return {
    id: entityCounter.value++,
    name: "",
    type: "baseEntity",
    lookRadius:0,
    health: 100,
    x: 0,
    y: 0,
    width:40,
    height:40,
    image: "",
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
  };
}
