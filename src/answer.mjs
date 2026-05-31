import {
  getClipboard,
  setClipboard,
  loadMemory,
  askRouter,
  showResultNotification,
  toast,
  markBotOutput
} from "./core.mjs";

async function main() {
  try {
    const mem = loadMemory();
    const direct = process.argv.slice(2).join(" ").trim();
    const question = direct || mem.pending_text || getClipboard();

    if (!question) {
      toast("Tidak ada teks pending.");
      return;
    }

    const result = await askRouter({
      mode: mem.active_mode || "default",
      question
    });

    markBotOutput(result.answer);
    setClipboard(result.answer);
    showResultNotification(result);

    console.log(result.answer);
  } catch (e) {
    toast(`NeuroClip error: ${e.message}`);
    console.log(e);
  }
}

main();
