<p align="center">
  <img src="https://files.catbox.moe/qj5why.png" alt="Neuroclip Preview" width="100%" />
</p>

<h1 align="center">Neuroclip Agent</h1>

<p align="center">
  <b>Android Clipboard AI Agent for Termux</b><br/>
  Copy a question. Save it to clipboard. Get an AI answer from notification.
</p>

<p align="center">
  <a href="https://github.com/vynaa9-create/Agen-clipboard">
    <img src="https://img.shields.io/badge/GitHub-Agen--clipboard-39d353?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Android-Termux:API-39d353?style=for-the-badge&logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/Automation-MacroDroid-39d353?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Open%20Source-MIT-39d353?style=for-the-badge" />
</p>

---

## ✦ Tentang Neuroclip

**Neuroclip** adalah clipboard AI copilot untuk Android + Termux.

Tools ini dibuat untuk workflow HP/Termux yang ringan, tanpa root, dan bisa dipakai lewat clipboard watcher, Termux:Widget, command CLI, atau server lokal untuk MacroDroid.

GitHub:

```txt
https://github.com/vynaa9-create/Agen-clipboard
```

Flow utamanya:

```txt
Salin teks / pertanyaan
↓
Clipboard terbaca
↓
Notif muncul
↓
Tap notif = buka menu modular
atau buka panel notif = Jawab / Balas / Tutup
↓
AI memproses teks
↓
Jawaban masuk clipboard + notifikasi
↓
Paste di aplikasi mana pun
```

Project ini dibuat untuk workflow pribadi/testing: copy pertanyaan, kirim ke endpoint AI publik, lalu hasilnya otomatis balik ke clipboard.

---

## ✦ Preview Workflow

```txt
Copy text
↓
Clipboard detected
↓
AI Agent processing
↓
Answer copied to clipboard
↓
Android notification appears
↓
Paste anywhere
```

Contoh real workflow:

```txt
Teks disalin:
Pengakuan dan perlindungan HAM memiliki arti bahwa ....

Notifikasi muncul:
AI Jawaban • default/chatgpt

Jawaban:
mengakui dan menghormati HAM

Tombol:
ALASAN | BALAS | TUTUP
```

---

## ✦ Fitur

- Ambil teks dari clipboard Android.
- Clipboard watcher: deteksi teks baru yang disalin.
- Confirm mode: tidak langsung spam endpoint.
- Kirim teks ke AI public endpoint.
- Jawaban otomatis masuk clipboard.
- Jawaban juga muncul sebagai notifikasi Android.
- Notifikasi modular:
  - `Jawab`
  - `Balas`
  - `Tutup`
  - setelah jawab: `Lihat`, `Balas`, `Tutup`
- Tap body notif membuka menu.
- Memory lokal:
  - mode aktif
  - pending text
  - jawaban terakhir
  - alasan terakhir
  - state watcher
- Provider router + fallback:
  - ChatGPT endpoint
  - DeepSeek endpoint
  - Claude endpoint
  - Copilot endpoint
  - provider custom dari `config/providers.json`
- Provider AI bisa dirotasi lewat `config/providers.json`.
- Mode jawaban:
  - `default`
  - `form`
  - `pilihanganda`
  - `opsi`
  - `sd`
  - `smp`
  - `sma`
  - `singkat`
  - `sedang`
  - `lengkap`
  - `detail`
  - `formal`
  - `santai`
  - `code`
  - `math`
  - `wa`
  - `ringkas`
  - `rewrite`
  - `huruf`
- Watcher otomatis: cukup salin teks, AI langsung jalan.
- Termux:Widget: tap widget untuk proses clipboard.
- Server lokal untuk MacroDroid / HTTP trigger.
- Bisa dipakai tanpa root.
- Cocok untuk workflow cepat di Android.
- Cocok untuk belajar, testing automation, dan eksperimen AI tools.

---

## ✦ Kebutuhan

Install aplikasi berikut di Android:

- Termux
- Termux:API
- Termux:Widget, opsional tapi direkomendasikan
- MacroDroid, opsional untuk trigger automation

Package Termux:

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

Cek notifikasi:

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau notifikasi tidak muncul, aktifkan permission notifikasi untuk:

- Termux
- Termux:API

---

## ✦ Install Cepat Copy-Paste

```bash
pkg update -y
pkg install nodejs termux-api git -y
termux-setup-storage

git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard

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

## ✦ Install dari GitHub

```bash
git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard
bash scripts/setup-termux.sh
source ~/.bashrc
```

Cek:

```bash
anu /sd apa dampak deforestasi?
```

Cek hasil clipboard:

```bash
termux-clipboard-get
```

---

## ✦ Catatan Nama Command

Nama project publik bisa pakai:

```txt
Neuroclip
```

Tapi command bawaan pada source saat ini masih:

```txt
anu
anu-watch
anu-server
anu-mode
```

Jadi README ini tetap memakai command asli dari file project agar langsung bisa jalan tanpa rename script.

Kalau nanti command sudah diganti, tinggal rename:

```txt
anu        → neuro
anu-watch  → neuro-watch
anu-server → neuro-server
anu-mode   → neuro-mode
```

---

## ✦ Cara Pakai Mode CLI

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

Contoh output:

```txt
[ Input Terbaca ]

/sd apa dampak deforestasi?

[ Proses AI... ]

[ Mode: sd | Provider: lexcode-claude-3-haiku ]

[ Jawaban ]

Dampak deforestasi adalah lingkungan menjadi lebih panas, hewan kehilangan tempat tinggal, dan tanah mudah longsor.

[ OK ] Jawaban sudah masuk clipboard + notifikasi.
```

---

## ✦ Cara Pakai Cepat dari Clipboard

Aktifkan watcher atau pakai CLI biasa.

Contoh teks yang disalin:

```txt
We use my eyes for ...
A. see
B. eat
C. kick
D. listen
```

Akan muncul notifikasi Neuroclip.

Aksi:

```txt
Tap notif        → buka menu
Jawab            → proses AI
Balas            → kasih instruksi baru
Tutup            → abaikan
```

Setelah AI menjawab:

```txt
Jawaban masuk clipboard
↓
Paste di tempat yang dibutuhkan
```

---

## ✦ Mode Global Tanpa Nambah Prefix

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

Contoh mode:

```bash
anu-mode form
anu-mode pilihanganda
anu-mode opsi
anu-mode sd
anu-mode smp
anu-mode sma
anu-mode singkat
anu-mode detail
anu-mode lengkap
anu-mode formal
anu-mode santai
anu-mode code
anu-mode math
anu-mode wa
anu-mode ringkas
anu-mode rewrite
anu-mode huruf
```

---

## ✦ Command Utama

```bash
anu
anu siapa presiden ke 2 indonesia
anu /sd apa dampak deforestasi?
anu /singkat jelaskan HAM
anu /detail jelaskan dampak deforestasi
anu /code buat contoh fetch nodejs esm

anu-watch
anu-server

anu-mode list
anu-mode default
anu-mode sd
anu-mode form
anu-mode detail
anu-mode singkat
anu-mode code
anu-mode huruf
```

Keterangan:

| Command | Fungsi |
|---|---|
| `anu` | membaca clipboard lalu proses AI |
| `anu "teks"` | proses teks langsung dari CLI |
| `anu /mode teks` | proses teks dengan mode prefix |
| `anu-watch` | aktifkan clipboard watcher |
| `anu-server` | aktifkan server lokal untuk HTTP/MacroDroid |
| `anu-mode list` | lihat mode aktif dan daftar mode |
| `anu-mode default` | balik ke mode default |
| `anu-mode sd` | set mode global ke SD |
| `anu-mode form` | set mode global ke form |
| `anu-mode code` | set mode global ke coding |

---

## ✦ Termux:Widget

Buat shortcut widget:

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
Pilih shortcut
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
Salin pertanyaan
↓
Tap widget anu
↓
Jawaban masuk clipboard + notif
↓
Paste
```

Flow mode tetap:

```txt
Tap widget mode-form
↓
Salin pertanyaan biasa
↓
Tap widget anu
↓
Jawaban mode form masuk clipboard
```

---

## ✦ Auto Watcher, Salin Langsung Jalan

Ini mode paling dekat dengan target utama.

Flow:

```txt
Salin teks
↓
Watcher Termux deteksi clipboard
↓
Otomatis kirim ke AI
↓
Jawaban masuk clipboard + notif
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

## ✦ Server Lokal untuk MacroDroid

Jalankan server:

```bash
anu-server
```

Atau background:

```bash
termux-wake-lock
nohup anu-server > ~/.anu-agent/server.log 2>&1 &
```

Cek server:

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

Contoh response:

```json
{
  "status": true,
  "mode": "sd",
  "provider": "lexcode-claude-3-haiku",
  "answer": "Dampak deforestasi adalah lingkungan menjadi lebih panas, hewan kehilangan tempat tinggal, dan tanah mudah longsor."
}
```

MacroDroid HTTP Request:

```txt
Method: GET
URL: http://127.0.0.1:3030/run
```

Flow MacroDroid:

```txt
Trigger MacroDroid
↓
HTTP Request ke localhost
↓
Neuroclip membaca clipboard
↓
AI menjawab
↓
Hasil masuk clipboard + notifikasi
```

---

## ✦ Menu Balas

Saat notif muncul, tap body notif lalu isi salah satu:

```txt
jawab
balas
alasan
lihat
tutup
reset
reset full
mode form
mode sd
mode pilihan ganda
```

Atau instruksi natural:

```txt
apa arti dalam kbbi
kenapa bukan A?
jelaskan lebih singkat
buat bahasa anak SD
ada pembahasan lain
ubah ke bahasa Inggris
buat versi WhatsApp
jawab ringkas saja
jelaskan alasannya
ubah ke bahasa formal
```

---

## ✦ Provider AI

Endpoint dikonfigurasi di:

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

Tipe provider yang didukung:

| Type | Fungsi |
|---|---|
| `get-query` | prompt dikirim via query param |
| `post-json` | prompt dikirim via JSON body `{ text, prompt, q }` |

Sistem akan mencoba provider secara rotasi. Kalau provider pertama gagal, lanjut provider berikutnya.

---

## ✦ Provider Router + Fallback

Default router bisa diarahkan seperti ini:

| Provider | Cocok Untuk |
|---|---|
| `chatgpt` | default, form, pilihan ganda, fakta umum |
| `deepseek` | coding, matematika, logika |
| `claude` | bahasa natural, SD/SMP/SMA, formal |
| `copilot` | rewrite, ringkas, WhatsApp |

Contoh fallback:

```txt
form     → chatgpt → deepseek → claude
code     → deepseek → chatgpt → copilot
sd       → claude → chatgpt
ringkas  → copilot → claude → chatgpt
```

Kalau provider pertama gagal, Neuroclip otomatis mencoba provider berikutnya.

---

## ✦ File Memory

Memory lokal disimpan di folder:

```txt
~/.anu-agent/
```

Contoh file yang dipakai:

```txt
~/.anu-agent/mode
~/.anu-agent/state.json
~/.anu-agent/watch.log
~/.anu-agent/server.log
```

Memory ini dipakai untuk menyimpan:

```txt
mode aktif
state watcher
input terakhir
jawaban terakhir
status busy
proteksi loop
```

---

## ✦ Tips Stabil di Oppo / ColorOS / Xiaomi / Vivo

Agar watcher tidak mati sendiri, matikan battery optimization untuk:

- Termux
- Termux:API
- Termux:Widget
- MacroDroid

Aktifkan jika tersedia:

```txt
Allow background activity
Autostart
Izinkan notifikasi
Izinkan tampil di latar belakang
Jangan batasi penggunaan baterai
```

Gunakan wake lock:

```bash
termux-wake-lock
```

Jalankan watcher background:

```bash
nohup anu-watch > ~/.anu-agent/watch.log 2>&1 &
```

Matikan wake lock jika sudah selesai:

```bash
termux-wake-unlock
```

---

## ✦ Troubleshooting

### Clipboard tidak terbaca

Test manual:

```bash
termux-clipboard-set "tes"
termux-clipboard-get
```

Kalau error:

- pastikan Termux:API sudah terinstall
- buka Termux:API minimal sekali
- beri izin akses yang diminta
- restart Termux

---

### Notifikasi tidak muncul

Test:

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau tidak muncul:

- cek izin notifikasi Termux
- cek izin notifikasi Termux:API
- cek battery optimization
- restart Termux
- buka pengaturan aplikasi dan aktifkan semua permission yang dibutuhkan

---

### Tombol notif tidak kelihatan

Di beberapa HP, tombol hanya muncul kalau panel notifikasi ditarik/di-expand.

Solusi:

```txt
Tarik panel notifikasi
↓
Expand notifikasi Neuroclip
↓
Pilih Jawab / Balas / Tutup
```

Atau:

```txt
Tap body notif
↓
Menu modular terbuka
```

---

### Watcher mati sendiri

Matikan optimasi baterai untuk:

- Termux
- Termux:API
- Termux:Widget

Lalu jalankan:

```bash
termux-wake-lock
nohup anu-watch > ~/.anu-agent/watch.log 2>&1 &
```

Cek log:

```bash
tail -f ~/.anu-agent/watch.log
```

---

### Jawaban masuk lagi ke AI berulang

Watcher sudah punya proteksi `lastAnswer`, tapi kalau masih loop, matikan watcher dulu:

```bash
pkill -f "src/watch.mjs"
```

Lalu bersihkan state:

```bash
rm -f ~/.anu-agent/state.json
```

Nyalakan lagi:

```bash
anu-watch
```

---

### Jawaban nyangkut ke konteks lama

Gunakan reset state:

```bash
rm -f ~/.anu-agent/state.json
```

Atau kalau tersedia dari menu notifikasi:

```txt
reset
reset full
```

---

### Mode salah

Cek mode aktif:

```bash
anu-mode list
```

Ubah ke default:

```bash
anu-mode default
```

Atau ubah ke mode tertentu:

```bash
anu-mode sd
anu-mode form
anu-mode code
```

---

### Provider error

Lihat log:

```bash
tail -f ~/.anu-agent/watch.log
tail -f ~/.anu-agent/server.log
```

Edit provider:

```txt
config/providers.json
```

Lalu ulangi setup:

```bash
bash scripts/setup-termux.sh
source ~/.bashrc
```

---

## ✦ Struktur Project

```txt
Agen-clipboard/
├── src/
│   ├── core.mjs
│   ├── cli.mjs
│   ├── watch.mjs
│   ├── server.mjs
│   └── mode.mjs
├── scripts/
│   ├── setup-termux.sh
│   └── setup-widget.sh
├── config/
│   └── providers.json
├── package.json
├── README.md
├── LICENSE
└── .gitignore
```

---

## ✦ NPM Scripts

Dari `package.json`:

```json
{
  "scripts": {
    "anu": "node src/cli.mjs",
    "watch": "node src/watch.mjs",
    "server": "node src/server.mjs",
    "mode": "node src/mode.mjs",
    "check": "node --check src/*.mjs"
  }
}
```

Jalankan manual:

```bash
npm run anu -- /sd apa dampak deforestasi?
npm run watch
npm run server
npm run mode -- sd
npm run check
```

---

## ✦ Push ke GitHub

```bash
git init
git add .
git commit -m "Initial Neuroclip Agent"
git branch -M main
git remote add origin https://github.com/username/neuroclip-agent.git
git push -u origin main
```

Kalau pakai repo yang sudah ada:

```bash
git remote add origin https://github.com/vynaa9-create/Agen-clipboard.git
git branch -M main
git push -u origin main
```

---

## ✦ Roadmap

- Screenshot mode.
- Gemini Vision / provider multimodal.
- Provider session rotation.
- Mode OCR fallback.
- UI overlay kecil.
- Rename command publik dari `anu` ke `neuro`.
- README preview lebih lengkap.
- MacroDroid preset export.
- Widget shortcut lebih banyak.
- Mode school helper yang lebih stabil.
- Mode jawaban super ringkas untuk notifikasi kecil.

---

## ✦ Catatan

- Semua memory disimpan lokal.
- Public endpoint bisa mati kapan saja.
- Endpoint AI dapat berubah sewaktu-waktu.
- Jangan gunakan untuk spam endpoint.
- Gunakan untuk workflow pribadi, belajar, testing automation, dan eksperimen Android + Termux.
- Project ini tidak membutuhkan root.
- MacroDroid bersifat opsional.
- Termux:Widget bersifat opsional, tapi direkomendasikan untuk shortcut cepat.

---

## ✦ Lisensi

Project ini menggunakan lisensi:

```txt
MIT
```

---

<p align="center">
  <b>Neuroclip Agent</b><br/>
  Local Android automation with clipboard + notification workflow.
</p> 
