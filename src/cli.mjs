import { spawnSync } from "node:child_process";
import {
  HOME,
  APP_NAME,
  getClipboard,
  setClipboard,
  wakeLock,
  wakeUnlock,
  toast,
  askRouter,
  loadMemory,
  saveMemory,
  resetContext,
  markBotOutput,
  normalizeMode,
  removeNotif,
  NOTIF_PENDING_ID,
  NOTIF_RESULT_ID
} from "./core.mjs";

function spawnBg(logFile) {
  spawnSync("sh", ["-lc", `nohup node "$HOME/.neuroclip/src/watch-confirm.mjs" > "$HOME/${logFile}" 2>&1 &`], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function killWatcher() {
  spawnSync("pkill", ["-f", "watch-confirm.mjs"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
}

function pgrep() {
  const res = spawnSync("pgrep", ["-af", "watch-confirm.mjs"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  return String(res.stdout || "").trim();
}

function runAction(file, args = []) {
  const res = spawnSync("node", [`${HOME}/.neuroclip/src/${file}`, ...args], {
    encoding: "utf8",
    stdio: "inherit"
  });

  if (res.error) throw res.error;

  if (typeof res.status === "number" && res.status !== 0) {
    process.exit(res.status);
  }
}

function usage() {
  console.log(`${APP_NAME} CLI

Command utama:
  neuro on
    Aktifkan clipboard watcher. Setelah aktif, salin teks dari aplikasi mana pun dan NeuroClip akan menampilkan notifikasi.

  neuro off
    Matikan clipboard watcher, hapus notifikasi NeuroClip, dan lepas wakelock.

  neuro status
    Cek apakah watcher sedang aktif atau mati.

  neuro log
    Lihat log watcher secara live. Tekan CTRL + C untuk keluar.

  neuro mode
    Lihat mode jawaban yang sedang aktif.

  neuro mode form
    Set mode ke form/soal. Cocok untuk pertanyaan pilihan, form sekolah, dan jawaban singkat.

  neuro mode default
    Balik ke mode normal/default.

  neuro clip
    Jawab isi clipboard sekali tanpa menyalakan watcher permanen.

  neuro run "teks"
    Jawab teks langsung dari command.

  neuro reset
    Bersihkan konteks, pending text, jawaban terakhir, dan state sementara.

  neuro reset full
    Reset total memory NeuroClip termasuk mode aktif.

  neuro help
    Tampilkan bantuan command.

  neuro info
    Sama seperti help, menampilkan penjelasan command.

Shortcut internal:
  neuro answer
    Jawab pending text atau clipboard dari shortcut/notifikasi.

  neuro reply "instruksi"
    Follow-up jawaban terakhir dengan instruksi tambahan.

  neuro reason
    Tampilkan alasan dari jawaban terakhir.

  neuro view
    Buka jawaban terakhir versi full.

  neuro close
    Tutup notifikasi NeuroClip.

  neuro menu
    Buka menu dialog NeuroClip.

Mode:
  default, form, pilihanganda, opsi, sd, smp, sma, singkat, sedang,
  lengkap, bahas, alasan, formal, code, math, wa, ringkas, rewrite

Contoh cepat:
  neuro on
  neuro mode form
  neuro clip
  neuro run "apa itu deforestasi?"`);
}

async function runOnce(text) {
  const input = text || getClipboard();

  if (!input) {
    console.log("Input kosong.");
    toast("Input kosong.");
    return;
  }

  const mem = loadMemory();

  const result = await askRouter({
    mode: mem.active_mode || "default",
    question: input
  });

  markBotOutput(result.answer);
  setClipboard(result.answer);
  console.log(result.answer);
  toast("Jawaban masuk clipboard.");
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const command = String(cmd || "").toLowerCase();

  switch (command) {
    case "on":
    case "start":
      killWatcher();
      wakeLock();
      spawnBg("neuroclip-watch.log");
      toast("NeuroClip ON");
      console.log("NeuroClip ON");
      break;

    case "off":
    case "stop":
      killWatcher();
      removeNotif(NOTIF_PENDING_ID);
      removeNotif(NOTIF_RESULT_ID);
      wakeUnlock();
      toast("NeuroClip OFF");
      console.log("NeuroClip OFF");
      break;

    case "status": {
      const out = pgrep();
      console.log(out ? `NeuroClip ON\n${out}` : "NeuroClip OFF");
      break;
    }

    case "log":
      spawnSync("tail", ["-f", `${HOME}/neuroclip-watch.log`], {
        encoding: "utf8",
        stdio: "inherit"
      });
      break;

    case "reset": {
      const full = rest.join(" ").trim().toLowerCase() === "full";
      resetContext({ full });
      removeNotif(NOTIF_PENDING_ID);
      removeNotif(NOTIF_RESULT_ID);
      toast(full ? "Memory full reset." : "Memory konteks dibersihkan.");
      console.log(full ? "Memory full reset." : "Memory konteks dibersihkan.");
      break;
    }

    case "mode": {
      const input = rest.join(" ").trim();
      const mem = loadMemory();

      if (!input) {
        console.log(mem.active_mode || "default");
        return;
      }

      mem.active_mode = normalizeMode(input) || "default";
      saveMemory(mem);
      toast(`Mode aktif: ${mem.active_mode}`);
      console.log(`Mode aktif: ${mem.active_mode}`);
      break;
    }

    case "run":
      await runOnce(rest.join(" ").trim());
      break;

    case "clip":
      await runOnce("");
      break;

    case "answer":
    case "jawab":
      runAction("answer.mjs", rest);
      break;

    case "reply":
    case "balas":
      runAction("reply.mjs", rest);
      break;

    case "reason":
    case "alasan":
      runAction("reason.mjs", rest);
      break;

    case "view":
    case "lihat":
      runAction("view.mjs", rest);
      break;

    case "close":
    case "tutup":
      runAction("close.mjs", rest);
      break;

    case "menu":
      runAction("menu.mjs", rest);
      break;

    case "commands":
    case "command":
    case "help":
    case "info":
    case "--help":
    case "-h":
    default:
      usage();
      break;
  }
}

main().catch(e => {
  console.error(e);
  toast(`NeuroClip error: ${e.message}`);
});
