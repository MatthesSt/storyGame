import { ref } from "vue";

export const currentArea = ref<AreaNames>("spawn");
export type Area = (typeof areas.value)[keyof typeof areas.value];

type AreaNames = "spawn" | "market";

export const areas = ref<
  Record<
    AreaNames,
    {
      width: number;
      height: number;
      npcs: number[];
      portals: {
        id: number;
        position: [number, number];
        targetArea: AreaNames;
        targetPortalId: number;
      }[];
    }
  >
>({
  spawn: {
    width: 15,
    height: 10,
    npcs: [1, 2],
    portals: [
      {
        id: 1,
        position: [6, 1],
        targetArea: "market",
        targetPortalId: 1,
      },
    ],
  },
  market: {
    width: 15,
    height: 10,
    npcs: [],
    portals: [
      {
        id: 1,
        position: [6, 10],
        targetArea: "spawn",
        targetPortalId: 1,
      },
    ],
  },
});
