import { Tuple } from "./typehelpers";
import { InvetorySlot } from "./types";

export function createInventoryWithItems(items: InvetorySlot[]) {
  return Array(16)
    .fill({ amount: 0, id: 0 })
    .map((_, i) => items[i] || { amount: 0, id: 0 }) as Tuple<InvetorySlot, 16>;
}
