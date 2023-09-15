import { createInventoryWithItems, entityFactory } from "./utils";
import { Entity } from "./types";
import { ref } from "vue";

export const enemies: Record<Entity["id"], Entity> = {
  1: entityFactory({
    id: 1,
    name: "bat",
    x: 200,
    y: 200,
    movespeed: 1,
    image: "enemy/bat.png",
  }),
};
