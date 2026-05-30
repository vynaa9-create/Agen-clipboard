#!/usr/bin/env node
/**
 * 【 Anu Agen CLI 】
 * Creator  : rhmt
 * Base     : https://api.lexcode(.)biz.id/
 * Category : AI / Clipboard / Termux
 * Desc     : CLI: baca argumen/clipboard, kirim ke AI, output ke clipboard + notif
 * Channel  : https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p
 */

import { getClipboard, notify, processInput } from "./core.mjs";

async function main() {
  try {
    const cliInput = process.argv.slice(2).join(" ").trim();
    const input = cliInput || getClipboard();

    if (!input) {
      console.log("Clipboard kosong.");
      notify("Anu Agen", "Clipboard kosong.");
      return;
    }

    console.log("\n[ Input Terbaca ]\n");
    console.log(input);
    console.log("\n[ Proses AI... ]\n");

    const result = await processInput(input, cliInput ? "cli" : "clipboard");

    console.log(`[ Mode: ${result.mode} | Provider: ${result.provider} ]\n`);
    console.log("[ Jawaban ]\n");
    console.log(result.answer);
    console.log("\n[ OK ] Jawaban sudah masuk clipboard + notifikasi.");
  } catch (err) {
    const msg = err?.message || String(err);
    console.log("\n[ ERROR ]");
    console.log(msg);
    notify("Anu Agen Error", msg);
    process.exitCode = 1;
  }
}

main();
