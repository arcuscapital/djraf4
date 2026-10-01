import { playFanfare } from "./audio";
import { loadTrophies, saveTrophies } from "./storage";
import { celebrate, PARTIES_PER_GOLD, toGoHint } from "./trophies";

// The fun bit when a show finishes: a dance party, or after five dance parties
// a gold record. Short (about 6 seconds), and the ✕ ends it straight away. It
// sits over the "Show finished" screen, which is there when it goes.

const $ = (id: string) => document.getElementById(id) as HTMLElement;
const root = $("celebrate");
const SHOW_MS = { party: 6000, gold: 7000 };
let timer: number | null = null;

export function celebrateShowEnd(): void {
  const c = celebrate(loadTrophies());
  saveTrophies(c.trophies);
  const { parties, golds } = c.trophies;
  const gold = c.kind === "gold";
  $("scene-party").classList.toggle("hidden", gold);
  $("scene-gold").classList.toggle("hidden", !gold);
  if (gold) {
    $("gold-golds").textContent = String(golds);
    $("gold-hint").textContent = golds === 1 ? "Your first gold record!" : `That's ${golds} gold records!`;
  } else {
    $("party-count").textContent = `${parties}/${PARTIES_PER_GOLD}`;
    $("party-golds").textContent = String(golds);
    $("party-hint").textContent = toGoHint(parties);
  }
  // Showing it again restarts all the animations from the beginning.
  root.classList.remove("closing");
  root.classList.remove("hidden");
  void playFanfare(gold).catch(() => {});
  if (timer !== null) clearTimeout(timer);
  timer = window.setTimeout(() => closeCelebration(), SHOW_MS[c.kind]);
}

export function closeCelebration(immediately = false): void {
  if (timer !== null) { clearTimeout(timer); timer = null; }
  if (root.classList.contains("hidden")) return;
  if (immediately) { root.classList.add("hidden"); return; }
  root.classList.add("closing");
  window.setTimeout(() => { if (root.classList.contains("closing")) root.classList.add("hidden"); }, 400);
}

$("celebrate-close").addEventListener("click", () => closeCelebration());
