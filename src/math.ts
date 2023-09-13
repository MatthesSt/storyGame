import { Entity } from "./types";

export function getDistance(entity1: Entity, entity2: Entity) {
  return Math.sqrt(
    Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
  );
}

export function getTileIndices(position: [number, number]): [number, number] {
  return [Math.round(position[0] / 40) + 1, Math.round(position[1] / 40) + 1];
}

export function getTilePosition(position: [number, number]): [number, number] {
  return [position[0] * 40 - 20, position[1] * 40 - 20];
}
