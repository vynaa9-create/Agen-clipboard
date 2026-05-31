import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
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
  normalizeMode,
  removeNotif,
  NOTIF_PENDING_ID,
  NOTIF_RESULT_ID
} from "./core.mjs";

const PID_FILE = path.join(HOME, ".neuroclip", "watchdog.pid");
const LOG_FILE = path.join(HOME, "neuroclip-watch.log");

function ensureAppDir() {
  fs.mkdirSync(path.join(HOME, ".neuroclip"), { recursive: true });
}

function readPid() {
  try {
    const pid = Number(fs.readFileSync(PID_FILE, "utf8").trim());
    return Number.isFinite(pid) && pid > 0 ? pid : 0;
  } catch {
    return 0;
  }
}

function writePid(pid) {
  ensureAppDir();
  fs.writeFileSync(PID_FILE, String(pid));
}

function removePid() {
  try {
    fs.rmSync(PID_FILE, { force: true });
  } catch {}
}

function isAlive(pid) {
  if (!pid) return false;

  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function spawnWatchdog() {
  ensureAppDir();

  const out = fs.openSync(LOG_FILE, "a");

  const command = `
echo "[WATCHDOG] NeuroClip watchdog started: $(date)"
while true; do
  echo "[WATCHDOG] starting watcher: $(date)"
  node "$HOME/.neuroclip/src/watch-confirm.mjs"
  code=$?
  echo "[WATCHDOG] watcher exited with code $code: $(date)"
  sleep 2
done
`;

  const child = spawn("sh", ["-lc", command], {
    detached: true,
    stdio: ["ignore", out, out],
    env: process.env
  });

  child.unref();
  writePid(child.pid);

  return child.pid;
}

function killWatcher() {
  const pid = readPid();

  if (pid && isAlive(pid)) {
    try {
      process.kill(-pid, "SIGTERM");
    } catch {
      try {
        process.kill(pid, "SIGTERM");
      } catch {}
    }
  }

  removePid();

  spawnSync("sh", ["-lc", "pkill -f watch-confirm.mjs 2>/dev/null || true"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });

  spawnSync("sh", ["-lc", "pkill -f 'NeuroClip watchdog' 2>/dev/null || true"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  });
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

function markBotOutput(text) {
  const mem = loadMemory();
  mem.last_output_clip = String(text || "").trim();
  mem.last_output_at = Date.now();
  mem.last_clip_seen = "";
  mem.pending_text = "";
  saveMemory(mem);
}

function usage() {
  console.log(`${APP_NAME} CLI

Pakai:
  neuro on                 aktifkan clipboard watcher
  neuro off                matikan clipboard watcher
  neuro status             cek status watcher
  neuro log                lihat log watcher
  neuro reset              hapus konteks memory
  neuro reset full         hapus semua memory termasuk mode
  neuro mode               lihat mode aktif
  neuro mode form          set mode aktif
  neuro mode default       balik ke mode default
  neuro run "teks"         jawab sekali
  neuro clip               jawab isi clipboard sekali
  neuro help               tampilkan bantuan
  neuro info               tampilkan bantuan

Internal:
  neuro answer             jawab pending text
  neuro reply "instruksi"  follow-up jawaban terakhir
  neuro reason             tampilkan alasan
  neuro view               lihat jawaban full
  neuro close              tutup notif
  neuro menu               buka menu notif

Mode:
  default, form, pilihanganda, opsi, sd, smp, sma, singkat, sedang,
  lengkap, formal, code, math, wa, ringkas, rewrite`);
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
    case "start": {
      killWatcher();
      wakeLock();

      const pid = spawnWatchdog();

      setTimeout(() => {
        if (isAlive(pid)) {
          toast("NeuroClip ON");
          console.log(`NeuroClip ON\nPID: ${pid}`);
        } else {
          toast("NeuroClip gagal start.");
          console.log("NeuroClip gagal start. Cek log:");
          console.log(`tail -n 80 ${LOG_FILE}`);
        }
      }, 800);

      break;
    }

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
      const pid = readPid();

      if (pid && isAlive(pid)) {
        console.log(`NeuroClip ON\nPID: ${pid}`);
      } else {
        removePid();
        console.log("NeuroClip OFF");
        console.log(`Cek log: tail -n 80 ${LOG_FILE}`);
      }

      break;
    }

    case "log":
      spawnSync("tail", ["-f", LOG_FILE], {
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
