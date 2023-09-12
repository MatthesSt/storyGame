export type Entity = {
  name: string;
  x: number;
  y: number;
};

export type Player = Entity & {
  direction: 0 | 45 | 90 | 135 | 180 | 225 | 270 | 315;
  movespeed: number;
};
