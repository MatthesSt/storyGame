import { createInventoryWithItems, entityFactory } from "./utils";
import { Entity } from "./types";
import { ref } from "vue";

export const enemies: Record<Entity["id"], Entity> = {
  1: {
    name: "bat",
    id: 1,
    category: "weapon",
    description: "A stick",
    maxStack: 10,
    value: 1,
    damage: 1,
    image: "/item/wood_stick.png",
  },
};
