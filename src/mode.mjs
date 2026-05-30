#!/usr/bin/env node
/**
 * 【 Anu Agen Mode 】
 * Creator  : rhmt
 * Base     : local
 * Category : AI / Clipboard / Termux
 * Desc     : Set mode global untuk watcher/widget tanpa nambah prefix saat copy teks
 * Channel  : https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p
 */

import { getMode, MODE_MAP, setMode, toast } from "./core.mjs";

const mode = process.argv[2];

if (!mode || mode === "list") {
  console.log("Mode aktif:", getMode());
  console.log("Mode tersedia:", Object.keys(MODE_MAP).join(", "));
  process.exit(0);
}

const finalMode = setMode(mode);
console.log(`Mode aktif: ${finalMode}`);
toast(`Mode ${finalMode} aktif`);
