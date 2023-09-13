import { ref } from "vue";
import { Entity } from "./types";

export const npcs = ref<Entity[]>([
  {
    id: 1,
    name: "NPC",
    x: 160,
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
    name: "NPC2",
    x: 260,
    y: 260,
    talking: false,
  },
]);
