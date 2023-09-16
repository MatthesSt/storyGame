import { Tuple } from "./typehelpers";

export const EQUIPMENT_CATEGORIES = [
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
export type EquipmentCategory = (typeof EQUIPMENT_CATEGORIES)[number];

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
  equipment?: Record<EquipmentCategory, Item | null>;
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

export type InvetorySlot = {
  amount: number;
  id: number;
};

type ItemCategory = "consumable" | "material" | "misc" | EquipmentCategory;

export type Item = {
  image: string;
  name: string;
  id: number;
  category: ItemCategory;
  description?: string;
  maxStack?: number;
  value: number;
  damage?: number;
  defence?: number;
  heal?: number;
  range?: number;
  onUse?: () => void;
};
