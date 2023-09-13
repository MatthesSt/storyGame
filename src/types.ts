export type Entity = {
  id: number;
  name: string;
  x: number;
  y: number;
  talking?: boolean;
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
