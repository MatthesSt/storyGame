import { MapObject } from "./types";

export const mapObjects: Omit<MapObject, "x" | "y">[] = [
  {
    id: 0,
    name: "tree",
    image: "/item/coin.png",
  },
];
