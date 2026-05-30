/**
 * 【 Anu Clipboard AI Core 】
 * Creator  : rhmt
 * Base     : https://api.lexcode(.)biz.id/
 * Category : AI / Clipboard / Termux
 * Desc     : Core helper untuk clipboard AI agent di Android Termux
 * Channel  : https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p
 * Note : public endpoint fallback testing, bisa ditambah provider lain di config/providers.json
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

export const APP_DIR = path.join(process.env.HOME || "/tmp", ".anu-agent");
export const STATE_FILE = path.join(APP_DIR, "state.json");
export const MODE_FILE = path.join(APP_DIR, "mode");
export const PROVIDER_FILE = path.join(ROOT_DIR, "config", "providers.json");

export const DEFAULT_PORT = 3030;

export const MODE_MAP = {
  default: "Jawab singkat, jelas, dan langsung. Jika pilihan ganda, balas jawaban terbaik saja.",
  sd: "Jawab seperti anak SD. Gunakan bahasa sangat sederhana, pendek, dan mudah dipahami.",
  smp: "Jawab seperti siswa SMP. Jelas, ringkas, dan mudah dihafal.",
  sma: "Jawab seperti siswa SMA. Jawab agak lengkap tapi tetap padat.",
  singkat: "Jawab sangat singkat. Langsung ke inti.",
  detail: "Jawab lengkap, runtut, dan beri contoh jika perlu.",
  formal: "Jawab dengan bahasa formal dan rapi.",
  santai: "Jawab santai, natural, tapi tetap jelas.",
  code: "Fokus pada solusi coding. Beri kode siap pakai jika relevan.",
  wa: "Jawab dengan format singkat, padat, enak dibaca untuk WhatsApp.",
  form: "Mode Google Form. Jawab langsung siap ditempel. Jika pilihan ganda, pilih opsi paling benar saja. Jika isian, jawab singkat tanpa penjelasan panjang.",
  huruf: "Jika pertanyaan pilihan ganda, jawab hanya huruf opsi yang benar. Jangan tambah penjelasan."
};

export function ensureAppDir() {
  fs.mkdirSync(APP_DIR, { recursive: true });
}

export function run(cmd, args = [], options = {}) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options
  });

  if (res.error) throw res.error;
  if (res.status && options.throwOnError !== false) {
    throw new Error(String(res.stderr || res.stdout || `${cmd} exited ${res.status}`).trim());
  }

  return String(res.stdout || "").trim();
}

export function getClipboard() {
  try {
    return run("termux-clipboard-get", [], { throwOnError: false }).trim();
  } catch {
    return "";
  }
}

export function setClipboard(text) {
  try {
    spawnSync("termux-clipboard-set", [String(text)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return true;
  } catch {
    return false;
  }
}

export function notify(title, text) {
  try {
    spawnSync("termux-notification", [
      "--title",
      String(title),
      "--content",
      String(text).slice(0, 900),
      "--priority",
      "high"
    ], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return true;
  } catch {
    return false;
  }
}

export function toast(text) {
  try {
    spawnSync("termux-toast", [String(text).slice(0, 300)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"]
    });
    return true;
  } catch {
    return false;
  }
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function readJsonSafe(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

export function writeJsonSafe(file, data) {
  ensureAppDir();
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export function loadState() {
  ensureAppDir();
  return readJsonSafe(STATE_FILE, {
    lastInput: "",
    lastAnswer: "",
    providerIndex: 0,
    busy: false
  });
}

export function saveState(state) {
  writeJsonSafe(STATE_FILE, state);
}

export function loadProviders() {
  const cfg = readJsonSafe(PROVIDER_FILE, { providers: [] });
  const providers = Array.isArray(cfg.providers) ? cfg.providers.filter(p => p?.enabled !== false) : [];

  if (!providers.length) {
    return [
      {
        name: "lexcode-claude-3-haiku",
        type: "get-query",
        url: "https://api.lexcode.biz.id/api/ai/claude-3-haiku",
        param: "text",
        enabled: true
      }
    ];
  }

  return providers;
}

export function getMode() {
  ensureAppDir();
  try {
    const mode = fs.readFileSync(MODE_FILE, "utf8").trim().toLowerCase();
    return MODE_MAP[mode] ? mode : "default";
  } catch {
    return "default";
  }
}

export function setMode(mode) {
  ensureAppDir();
  const clean = String(mode || "default").replace(/^\//, "").trim().toLowerCase();
  const finalMode = MODE_MAP[clean] ? clean : "default";
  fs.writeFileSync(MODE_FILE, finalMode);
  return finalMode;
}

export function parseMode(input) {
  const raw = String(input || "").trim();
  const lower = raw.toLowerCase();

  for (const mode of Object.keys(MODE_MAP)) {
    const prefix = `/${mode}`;
    if (lower === prefix || lower.startsWith(prefix + " ")) {
      return {
        mode,
        instruction: MODE_MAP[mode],
        question: raw.slice(prefix.length).trim()
      };
    }
  }

  const globalMode = getMode();
  return {
    mode: globalMode,
    instruction: MODE_MAP[globalMode] || MODE_MAP.default,
    question: raw
  };
}

export function pickAnswer(data) {
  if (typeof data === "string") return data;

  return (
    data?.result ||
    data?.response ||
    data?.answer ||
    data?.message ||
    data?.text ||
    data?.data?.result ||
    data?.data?.response ||
    data?.data?.answer ||
    data?.data?.message ||
    data?.data?.text ||
    JSON.stringify(data, null, 2)
  );
}

export function cleanAnswer(input) {
  let text = String(input ?? "");

  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "string") text = parsed;
  } catch {}

  return text
    .replace(/\u001c[\s\S]*$/g, "")
    .replace(/\\u001c[\s\S]*$/g, "")
    .replace(/\s*\{['\"]character_cooldown['\"]:\s*true\}\s*$/g, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

export function buildPrompt(input) {
  const { mode, instruction, question } = parseMode(input);

  const prompt = `${instruction}

Konteks:
- Kamu menjawab pertanyaan dari clipboard Android.
- Jangan jelaskan bahwa kamu AI.
- Jangan ulang pertanyaan kecuali memang perlu.
- Kalau pertanyaan tidak jelas, jawab kemungkinan paling masuk akal.

Pertanyaan:
${question}`;

  return { mode, question, prompt };
}

async function askProvider(provider, prompt) {
  if (provider.type === "post-json") {
    const res = await fetch(provider.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(provider.headers || {})
      },
      body: JSON.stringify({ text: prompt, prompt, q: prompt })
    });

    const raw = await res.text();
    if (!res.ok) throw new Error(`${provider.name || provider.url}: HTTP ${res.status} ${raw.slice(0, 120)}`);

    try {
      return pickAnswer(JSON.parse(raw));
    } catch {
      return raw;
    }
  }

  const param = provider.param || "text";
  const url = new URL(provider.url);
  url.searchParams.set(param, prompt);

  const res = await fetch(url);
  const raw = await res.text();
  if (!res.ok) throw new Error(`${provider.name || provider.url}: HTTP ${res.status} ${raw.slice(0, 120)}`);

  try {
    return pickAnswer(JSON.parse(raw));
  } catch {
    return raw;
  }
}

export async function askAI(input) {
  const { mode, question, prompt } = buildPrompt(input);
  const providers = loadProviders();
  const state = loadState();
  const start = Number(state.providerIndex || 0) % providers.length;
  const errors = [];

  for (let i = 0; i < providers.length; i++) {
    const idx = (start + i) % providers.length;
    const provider = providers[idx];

    try {
      const raw = await askProvider(provider, prompt);
      const answer = cleanAnswer(raw);

      state.providerIndex = (idx + 1) % providers.length;
      saveState(state);

      return {
        status: true,
        provider: provider.name || provider.url,
        mode,
        question,
        answer
      };
    } catch (err) {
      errors.push(`${provider.name || provider.url}: ${err?.message || err}`);
    }
  }

  throw new Error(`Semua provider gagal: ${errors.join(" | ")}`);
}

export function shouldIgnoreClipboard(text, state = loadState()) {
  const raw = String(text || "").trim();

  if (!raw) return true;
  if (raw.length < 4) return true;
  if (raw === state.lastInput) return true;
  if (raw === state.lastAnswer) return true;

  const lower = raw.toLowerCase();
  const ignoredStarts = [
    "http://127.0.0.1",
    "curl ",
    "node ",
    "npm ",
    "pkg ",
    "cp ",
    "ls ",
    "cat ",
    "tail ",
    "grep ",
    "nano ",
    "termux-clipboard",
    "nohup ",
    "pkill "
  ];

  if (ignoredStarts.some(x => lower.startsWith(x))) return true;

  return false;
}

export async function processInput(input, source = "manual") {
  const result = await askAI(input);

  setClipboard(result.answer);
  notify(`AI Jawaban ${result.mode}`, result.answer);

  const state = loadState();
  state.lastInput = String(input || "").trim();
  state.lastAnswer = result.answer;
  saveState(state);

  return { ...result, source };
}
