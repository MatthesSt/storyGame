import { Entity } from "./types";

export function getDistance(entity1: Entity, entity2: Entity) {
  return Math.sqrt(
    Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
  );
}
