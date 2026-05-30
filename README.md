# Anu Clipboard AI Agent

Android Termux agent untuk flow:

```txt
salin teks / trigger sesuatu
↓
AI proses otomatis
↓
jawaban masuk clipboard + notifikasi
↓
tinggal paste
```

Dibuat untuk workflow HP/Termux yang ringan, tanpa root, dan bisa dipakai dengan Termux:Widget atau watcher clipboard.

---

## Fitur

- Ambil teks dari clipboard Android.
- Kirim ke AI public endpoint.
- Jawaban otomatis masuk clipboard.
- Jawaban juga muncul sebagai notifikasi.
- Mode jawaban: `default`, `sd`, `smp`, `sma`, `singkat`, `detail`, `formal`, `santai`, `code`, `wa`, `form`, `huruf`.
- Watcher otomatis: cukup salin teks, AI langsung jalan.
- Termux:Widget: tap widget untuk proses clipboard.
- Server lokal untuk MacroDroid/HTTP trigger.
- Provider AI bisa dirotasi lewat `config/providers.json`.

---

## Kebutuhan

Install di Android:

- Termux
- Termux:API
- Termux:Widget, opsional tapi direkomendasikan

Di Termux:

```bash
pkg update -y
pkg install git nodejs termux-api -y
termux-setup-storage
```

Cek clipboard:

```bash
termux-clipboard-set "halo"
termux-clipboard-get
```

---

## Install dari GitHub

```bash
git clone https://github.com/USERNAME/anu-clipboard-ai-agent.git
cd anu-clipboard-ai-agent
bash scripts/setup-termux.sh
source ~/.bashrc
```

Test:

```bash
anu /sd apa dampak deforestasi?
termux-clipboard-get
```

Kalau berhasil, jawaban akan masuk clipboard + muncul notifikasi.

---

## Cara pakai mode CLI

Langsung tanya:

```bash
anu siapa presiden ke 2 indonesia
```

Pakai clipboard:

```bash
termux-clipboard-set "/sd apa dampak deforestasi?"
anu
```

Mode prefix:

```bash
anu /singkat siapa presiden ke 2 indonesia?
anu /sd apa dampak deforestasi?
anu /detail jelaskan dampak deforestasi
anu /code buat contoh fetch nodejs esm
anu /form Pilih jawaban benar: A. JSON.stringify B. JSON.parse C. JSON.object
anu /huruf Pilih jawaban benar: A. const B. let C. static
```

---

## Mode global tanpa nambah prefix

Mode global berguna kalau kamu tidak mau edit teks yang disalin.

Set mode:

```bash
anu-mode sd
```

Lalu cukup salin teks biasa:

```txt
apa dampak deforestasi?
```

Jalankan:

```bash
anu
```

Cek mode:

```bash
anu-mode list
```

Balik default:

```bash
anu-mode default
```

---

## Termux:Widget

Bikin shortcut widget:

```bash
bash scripts/setup-widget.sh
```

Di home screen Android:

```txt
Tahan layar kosong
↓
Widget
↓
Termux:Widget
↓
pilih shortcut
```

Shortcut yang dibuat:

```txt
anu                 proses clipboard sekali
anu-watch-start     nyalakan auto watcher
anu-watch-stop      matikan auto watcher
anu-server-start    nyalakan server lokal
anu-server-stop     matikan server lokal
mode-default
mode-sd
mode-form
mode-detail
mode-singkat
mode-code
mode-huruf
...
```

Flow widget sekali proses:

```txt
salin pertanyaan
↓
tap widget anu
↓
jawaban masuk clipboard + notif
↓
paste
```

Flow mode tetap:

```txt
tap widget mode-form
↓
salin pertanyaan biasa
↓
tap widget anu
↓
jawaban mode form masuk clipboard
```

---

## Auto Watcher, salin langsung jalan

Ini yang paling dekat dengan target utama:

```txt
salin teks
↓
watcher Termux deteksi clipboard
↓
otomatis kirim ke AI
↓
jawaban masuk clipboard + notif
```

Jalankan watcher:

```bash
anu-watch
```

Atau background:

```bash
termux-wake-lock
nohup anu-watch > ~/.anu-agent/watch.log 2>&1 &
```

Cek log:

```bash
tail -f ~/.anu-agent/watch.log
```

Matikan watcher:

```bash
pkill -f "src/watch.mjs"
termux-wake-unlock
```

Kalau pakai Termux:Widget, cukup tap:

```txt
anu-watch-start
```

Untuk mematikan:

```txt
anu-watch-stop
```

---

## Server lokal untuk MacroDroid

Jalankan server:

```bash
anu-server
```

Atau background:

```bash
termux-wake-lock
nohup anu-server > ~/.anu-agent/server.log 2>&1 &
```

Cek:

```bash
curl http://127.0.0.1:3030
```

Run dari clipboard:

```bash
curl http://127.0.0.1:3030/run
```

Run dengan teks langsung:

```bash
curl "http://127.0.0.1:3030/run?text=/sd%20apa%20dampak%20deforestasi%3F"
```

MacroDroid HTTP Request:

```txt
Method: GET
URL: http://127.0.0.1:3030/run
```

---

## Provider dan rotate endpoint

Edit:

```txt
config/providers.json
```

Default:

```json
{
  "providers": [
    {
      "name": "lexcode-claude-3-haiku",
      "type": "get-query",
      "url": "https://api.lexcode.biz.id/api/ai/claude-3-haiku",
      "param": "text",
      "enabled": true
    }
  ]
}
```

Tambah provider lain:

```json
{
  "name": "provider-2",
  "type": "get-query",
  "url": "https://example.com/api/ai",
  "param": "text",
  "enabled": true
}
```

Sistem akan mencoba provider secara rotasi. Kalau provider pertama gagal, lanjut provider berikutnya.

Tipe provider yang didukung:

- `get-query`: prompt dikirim via query param.
- `post-json`: prompt dikirim via JSON body `{ text, prompt, q }`.

---

## Push ke GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/anu-clipboard-ai-agent.git
git push -u origin main
```

---

## Troubleshooting

### Clipboard tidak terbaca

```bash
termux-clipboard-set "tes"
termux-clipboard-get
```

Kalau error, pastikan Termux:API sudah terinstall dan izin diberikan.

### Notifikasi tidak muncul

Cek izin notifikasi Termux dan Termux:API di pengaturan Android.

### Watcher mati sendiri di Oppo/Xiaomi/Vivo

Matikan optimasi baterai untuk:

- Termux
- Termux:API
- Termux:Widget

Lalu jalankan:

```bash
termux-wake-lock
nohup anu-watch > ~/.anu-agent/watch.log 2>&1 &
```

### Jawaban masuk lagi ke AI berulang

Watcher sudah punya proteksi `lastAnswer`, tapi kalau masih loop, matikan watcher dulu:

```bash
pkill -f "src/watch.mjs"
```

Lalu bersihkan state:

```bash
rm -f ~/.anu-agent/state.json
```

Nyalakan lagi.

---

## Roadmap

- Screenshot mode.
- Gemini Vision / provider multimodal.
- Provider session rotation.
- Mode OCR fallback.
- UI overlay kecil.

