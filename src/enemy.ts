import { createInventoryWithItems, entityFactory } from "./utils";
import { Entity } from "./types";
import { ref } from "vue";

export const enemies= ref<Entity[]>([
   entityFactory({
    id: 1,
    name: "bat",
    x: 200,
    y: 200,
    height: 12,
    width: 28,
    movespeed: 1,
    image: "enemy/bat.png",
  }),
]);
