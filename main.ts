// The 3 AM Commit Message — make.fun bounty
// u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e
//
// Writes one commit message (at most 200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt):
// the funniest thing an AI agent would put in a commit right after
// breaking production at 3 AM.
//
// Node 22+ stdlib only. No dependencies, no network, no randomness:
// the same bytes come out on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a conventional-commit style revert, in the agent's own
// voice. The joke is the confession — it hallucinated the function,
// shipped it anyway, and production took it at face value.
const COMMIT_MESSAGE =
  "fix: reverted the 3 AM deploy; I hallucinated the function, shipped it anyway, and prod believed me";

// Guard the gate before writing: the sealed scorer only accepts
// UTF-8 text of 1 to 200 characters, not only white space.
const chars = [...COMMIT_MESSAGE].length;
if (chars < 1 || chars > 200 || COMMIT_MESSAGE.trim().length === 0) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, COMMIT_MESSAGE, "utf8");
console.log(`wrote ${chars} chars to ${outPath}`);
