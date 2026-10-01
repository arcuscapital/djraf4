// The end-of-show celebration: every finished show is a dance party, and after
// five dance parties the next finished show wins a gold record.

export const PARTIES_PER_GOLD = 5;

export interface Trophies {
  parties: number; // dance parties since the last gold record (0–5)
  golds: number; // gold records won so far
}

export interface Celebration {
  kind: "party" | "gold";
  trophies: Trophies; // the new totals, to show and save
}

export function celebrate(t: Trophies): Celebration {
  const parties = Math.max(0, Math.min(PARTIES_PER_GOLD, Math.floor(t.parties) || 0));
  const golds = Math.max(0, Math.floor(t.golds) || 0);
  if (parties >= PARTIES_PER_GOLD) return { kind: "gold", trophies: { parties: 0, golds: golds + 1 } };
  return { kind: "party", trophies: { parties: parties + 1, golds } };
}

// What the dance party says under the counter, so he can see how close he is.
export function toGoHint(parties: number): string {
  const left = PARTIES_PER_GOLD - parties;
  if (left <= 0) return "Next show wins a gold record!";
  return `${left} more ${left === 1 ? "show" : "shows"} to a gold record`;
}
