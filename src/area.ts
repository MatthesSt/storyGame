import { ref } from "vue";

export const currentArea = ref<keyof typeof areas>("startArea");

export type Area = (typeof areas)[keyof typeof areas];

export const areas = {
  startArea: {
    width: 15,
    height: 10,
    npcs: [
      {
        name: "NPC",
        x: 160,
        y: 160,
        dialog: "test",
      },
      {
        name: "NPC2",
        x: 260,
        y: 260,
        dialog: "test2",
      },
    ],
  },
} as const;
