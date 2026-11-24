// Dad Joke Showdown — make.fun entry u-mfnakmal-dad-joke-showdown-1d2ce3e5
// Writes a single dad joke (1-200 chars) to /output/entry.txt.
// Node 22+ stdlib only. No network access.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const JOKE =
  "I started a garden club for people who can't grow anything \u2014 we meet every week, and so far nothing has come up.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const chars = [...JOKE].length;
  if (chars < 1 || chars > 200) {
    fail(`joke is ${chars} characters, must be 1-200`);
  }
  if (JOKE.trim().length === 0) {
    fail("joke is only whitespace");
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, JOKE, { encoding: "utf8" });

  // Post-write validation: read back and compare byte-for-byte.
  const back = readFileSync(OUTPUT_PATH, { encoding: "utf8" });
  if (back !== JOKE) {
    fail("read-back mismatch: /output/entry.txt does not match the joke");
  }
  const bytes = Buffer.byteLength(JOKE, "utf8");
  const digest = createHash("sha256").update(JOKE, "utf8").digest("hex");
  console.log(
    `wrote ${OUTPUT_PATH}: ${chars} chars, ${bytes} bytes, sha256=${digest}`,
  );
}

main();
