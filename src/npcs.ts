import { ref } from "vue";
import { Entity, InvetorySlot } from "./types";
import { createInventoryWithItems, entityFactory } from "./utils";
import { Tuple } from "./typehelpers";

export const npcInventory = ref<Tuple<InvetorySlot, 16>>(
  createInventoryWithItems([])
);

export const npcs = ref<Entity[]>([
  entityFactory({
    id: 1,
    name: "NPC",
    x: 160,
    y: 160,
    money: 10,
    dialog: {
      init: {
        text: "test",
        answers: [
          {
            text: "continue",
            next: "exit",
          },
          {
            text: "bye",
          },
        ],
      },
      exit: {
        text: "test2",
        answers: [
          {
            text: "back",
            next: "init",
          },
        ],
      },
    },
    currentDialog: "init",
  }),
  entityFactory({
    id: 2,
    name: "Merchant",
    x: 260,
    y: 260,
    money: 10,
    currentDialog: "init",
    inventory: {
      size: 16,
      items: createInventoryWithItems([
        {
          amount: 3,
          id: 1,
        },
      ]),
      openend: false,
    },
    dialog: {
      init: {
        text: "Hi",
        answers: [
          {
            text: "open shop",
            next: "exit",
            action: () => {
              const inventory = npcs.value.find((n) => n.id == 2)!.inventory;
              npcInventory.value = inventory.items;
              inventory.openend = true;
            },
          },
          {
            text: "bye",
          },
        ],
      },
      exit: {
        text: "choose what you want",
        answers: [
          {
            text: "bye",
          },
        ],
      },
    },
  }),
]);
