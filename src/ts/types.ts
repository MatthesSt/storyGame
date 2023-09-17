import { Tuple } from "./typehelpers";

export const ITEM_CATEGORIES = [
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
export const ENTITY_CATEGORIES = [
  "npc",
  "player",
  "enemy",
] as const;
export const WEAPON_CATEGORIES = [
  "magic",
  "melee",
  "range",
] as const;
export const ATTACK_CATEGORIES = {
  "melee" :{
    "bite" :{
      id:1,
      damage: 1,
    },
    "bodyslam" :{
      id:2,
      damage: 1
    }
  },
} as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];
export type WeaponCategory = (typeof WEAPON_CATEGORIES)[number];
export type EntityCategory = (typeof ENTITY_CATEGORIES)[number];
export type AttackCategories = (typeof ATTACK_CATEGORIES)

export type Entity = {
  id: number;
  type:EntityCategory
  name: string;
  maxHealth: number;
  currentHealth: number;
  maxMana: number;
  currentMana: number;
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
  attacking?: boolean;
  blocking?: boolean;
  abilities?: AttackCategories  
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

export type InvetorySlot = {
  amount: number;
  id: number;
};

export type Item = {
  image: string;
  name: string;
  id: number;
  category: ItemCategory;
  type?: WeaponCategory;
  description?: string;
  maxStack?: number;
  value: number;
  damage?: number;
  defense?: number;
  useSpeed?: number;
  heal?: number;
  range?: number;
  onUse?: () => void;
};
