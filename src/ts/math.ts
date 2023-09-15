import { Entity } from "./types";

export function getDistance(entity1: Entity, entity2: Entity) {
  return Math.sqrt(
    Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2)
  );
}

export function getTileIndices(position: [number, number]): [number, number] {
  return [Math.ceil(position[0] / 40), Math.ceil(position[1] / 40)];
}

export function getTilePosition(position: [number, number]): [number, number] {
  return [position[0] * 40 - 20, position[1] * 40 - 20];
}

export function getVector(entity1:Entity, entity2:Entity){
  const deltaX = entity2.x - entity1.x
  const deltaY = entity2.y - entity1.y
  
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  const vectorX = deltaX /distance
  const vectorY = deltaY /distance
 return [vectorX,vectorY] 
  }
