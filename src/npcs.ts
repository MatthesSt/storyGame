import { ref } from "vue";
import { Entity } from "./types";

export const npcInventory = ref<Entity["inventory"]["items"]>([]);

export const npcs = ref<Entity[]>([
  {
    id: 1,
    name: "NPC",
    x: 160,
    money: 0,
    inventory: {
      size: 16,
      items: [],
    },
    y: 160,
    dialog: {
      1: {
        text: "test",
        answers: [
          {
            text: "next Text",
            next: 2,
            action: () => console.log("clicked answer1"),
          },
          {
            text: "bye",
          },
        ],
      },
      2: {
        text: "test2",
        answers: [
          {
            text: "back",
            next: 1,
          },
        ],
      },
    },
    currentDialog: 0,
    talking: false,
  },
  {
    id: 2,
    name: "Merchant",
    x: 260,
    y: 260,
    money: 0,
    talking: false,
    inventory: {
      size: 16,
      items: [
        {
          amount: 3,
          id: 1,
          inventorySlotIndex: 0,
        },
      ],
      openend: false,
    },
    dialog: {
      1: {
        text: "Hi",
        answers: [
          {
            text: "open shop",
            next: 2,
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
      2: {
        text: "choose what you want",
        answers: [
          {
            text: "bye",
          },
        ],
      },
    },
  },
]);
