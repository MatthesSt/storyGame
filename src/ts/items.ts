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
    image: "/item/weapon/wood_stick.png",
  },
  2: {
    name: "Wood Sword",
    id: 2,
    category: "weapon",
    description: "A sword that was probaply used for training",
    maxStack: 1,
    value: 5,
    damage: 5,
    image: "/item/weapon/wood_sword.png",
  },
  3: {
    name: "Wood Dagger",
    id: 3,
    category: "weapon",
    description: "Looks like a Dagger made out of Wood",
    maxStack: 5,
    value: 5,
    damage: 6,
    image: "/item/weapon/wood_dagger.png",
  },
  4: {
    name: "Leather Pants",
    id: 4,
    category: "legs",
    description: "Clean pants made out of leather",
    maxStack: 1,
    value: 7,
    defence: 2,
    image: "/item/armor/leather_pants.png",
  },
};
