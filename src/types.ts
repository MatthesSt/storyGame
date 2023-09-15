import { Tuple } from "./typehelpers";

export type Entity = {
  id: number;
  name: string;
  x: number;
  y: number;
  money: number;
  direction: number;
  movespeed: number;
  image: string;

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

export type InvetorySlot = {
  amount: number;
  id: number;
};

export const CATEGORIES = ["weapon", "consumable", "misc"] as const;

export type Item = {
  image: string;
  name: string;
  id: number;
  category: (typeof CATEGORIES)[number];
  description?: string;
  maxStack?: number;
  value: number;
  damage?: number;
  heal?: number;
  onUse?: () => void;
};
