export type Entity = {
  id: number;
  name: string;
  x: number;
  y: number;
  money: number;
  talking?: boolean;
  inventory: {
    size: number;
    items: ItemSlot[];
    openend?: boolean;
    blockOpen?: boolean;
  };
  currentDialog?: number;
  dialog?: Record<
    number,
    {
      text: string;
      answers: {
        text: string;
        next?: number;
        action?: () => void;
      }[];
    }
  >;
};

export type Player = Entity & {
  direction: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  movespeed: number;
};

export type ItemSlot = {
  amount: number;
  id: number;
  inventorySlotIndex: number;
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
