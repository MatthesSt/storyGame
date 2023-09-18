import { npcs } from './npcs'

export function getNpcs(npcs: string[]) {
  return npcs.map((npc) => npcs.value[npc].id)
}
