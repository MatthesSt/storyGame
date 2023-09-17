import { Tuple } from "./typehelpers";

export const CATEGORIES = [
  "head",
  "body",
  "arms",
  "legs",
  "boots",
  "weapon",
  "shield",
  "tool",
  "accessory",
] as const;
export type ItemCategory = (typeof CATEGORIES)[number];

export type InvetorySlot = {
  amount: number;
  id: number;
};

export type Item = {
  image: string;
  name: string;
  id: number;
  category: ItemCategory;
  description?: string;
  maxStack?: number;
  value: number;
  damage?: number;
  defense?: number;
  heal?: number;
  range?: number;
  onUse?: () => void;
};

export type Entity = {
  id: number;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  money: number;
  direction: number;
  movespeed: number;
  image: string;
  lookRadius: number;
  talking: boolean;
  inventory: {
    size: number;
    items: Tuple<InvetorySlot, 16>;
    openend?: boolean;
    blockOpen?: boolean;
  };
  equipment?: {
    head?: Item | null;
    body?: Item | null;
    arms?: Item | null;
    legs?: Item | null;
    boots?: Item | null;
    weapon?: Item | null;
    shield?: Item | null;
    tool?: Item | null;
    accessory?: Item | null;
  };
  currentDialog?: string;
  dialog?: Record<
    string,
    {
      text: string;
      answers: {
        text: string;
        next?: string;
        action?: () => void;
      }[];
    }
  >;
};
export type Player = Entity & {};

export type MapObject = {
  id: number;
  name: string;
  image: string;
  x: number;
  y: number;
};

export type Tile = {
  id: number;
  name: string;
  image: string;
  walkable: boolean;
  x: number;
  y: number;
};
