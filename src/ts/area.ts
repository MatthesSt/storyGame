import { ref } from "vue";

export const currentArea = ref<AreaName>("spawn");
export type Area = (typeof areas.value)[keyof typeof areas.value];

type AreaName = "spawn" | "market";

export const areas = ref<
  Record<
    AreaName,
    {
      width: number;
      height: number;
      npcs: number[];
      enemies: number[];
      floorImage: string;
      portals: {
        id: number;
        position: [number, number];
        targetArea: AreaName;
        targetPortalId: number;
        blocked: boolean;
      }[];
    }
  >
>({
  spawn: {
    width: 15,
    height: 10,
    npcs: [1, 2],
    enemies: [],
    floorImage: "environment/spawn_floor.png",
    portals: [
      {
        id: 1,
        position: [6, 1],
        targetArea: "market",
        targetPortalId: 1,
        blocked: false,
      },
    ],
  },
  market: {
    width: 15,
    height: 10,
    npcs: [],
    enemies: [1,2],
    floorImage: "environment/town_floor.png",
    portals: [
      {
        id: 1,
        position: [6, 10],
        targetArea: "spawn",
        targetPortalId: 1,
        blocked: false,
      },
    ],
  },
});
