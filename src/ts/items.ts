import type { Item } from "./types.ts";

export const items: Record<Item["id"], Item> = {
  1: {
    name: "Stick",
    id: 1,
    category: "weapon",
    description: "A stick",
    maxStack: 10,
    value: 1,
    damage: 1,
    image: "/item/wood_stick.png",
  },
};
