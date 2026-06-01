<p align="center">
  <img src="https://raw.githubusercontent.com/vynaa9-create/Agen-clipboard/refs/heads/main/src/output%20(1).png" alt="NeuroClip Preview" width="100%" />
</p><h1 align="center">NeuroClip Agent</h1><p align="center">
  <b>Android Clipboard AI Agent for Termux</b><br/>
  Copy a question. Save it to clipboard. Get an AI answer from notification.
</p><p align="center">
  <a href="https://github.com/vynaa9-create/Agen-clipboard">
    <img src="https://img.shields.io/badge/GitHub-Agen--clipboard-39d353?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Android-Termux:API-39d353?style=for-the-badge&logo=android&logoColor=white" />
  <img src="https://img.shields.io/badge/Automation-MacroDroid-39d353?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Open%20Source-Yes-39d353?style=for-the-badge" />
</p>---
✦ ### PREVIWE 
<p align="center">
  <img src="https://raw.githubusercontent.com/vynaa9-create/Agen-clipboard/refs/heads/main/src/Screenshot_2026-05-31-20-08-37-62.png" alt="NeuroClip Install Preview" width="100%" />
</p>✦ Tentang NeuroClip

NeuroClip adalah clipboard AI copilot untuk Android + Termux.

Tools ini dibuat untuk workflow cepat di HP. Cukup salin teks atau pertanyaan dari aplikasi apa pun, lalu NeuroClip akan membaca clipboard, menampilkan notifikasi, memproses teks dengan AI, dan mengembalikan hasil jawaban ke clipboard.

GitHub:

https://github.com/vynaa9-create/Agen-clipboard

Flow utamanya:

Salin teks / pertanyaan
↓
Clipboard terbaca
↓
Notif NeuroClip muncul
↓
Tap notif = buka menu modular
atau buka panel notif = Jawab / Balas / Tutup
↓
AI memproses teks
↓
Jawaban masuk clipboard + notifikasi
↓
Paste di aplikasi mana pun

Project ini dibuat untuk workflow pribadi, belajar, testing automation, dan eksperimen Android + Termux.

---

✦ Konsep Kerja

NeuroClip mengubah clipboard Android menjadi AI assistant ringan.

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

Contoh real workflow:

Teks disalin:
Pengakuan dan perlindungan HAM memiliki arti bahwa ....

Notifikasi muncul:
AI Jawaban • default/chatgpt

Jawaban:
mengakui dan menghormati HAM

Tombol:
ALASAN | BALAS | TUTUP

Setelah jawaban muncul, hasil otomatis masuk clipboard dan bisa langsung dipaste.

---

✦ Fitur

- Clipboard watcher otomatis.
- Deteksi teks baru yang disalin.
- Confirm mode agar tidak langsung spam endpoint.
- Kirim teks ke AI public endpoint.
- Jawaban otomatis masuk clipboard.
- Jawaban muncul sebagai notifikasi Android.
- Notifikasi modular.
- Tap body notif untuk membuka menu.
- Tombol notifikasi:
  - "Jawab"
  - "Balas"
  - "Tutup"
  - "Lihat"
  - "Alasan"
- Memory lokal untuk menyimpan:
  - mode aktif
  - pending text
  - jawaban terakhir
  - alasan terakhir
  - state watcher
- Provider router + fallback otomatis.
- Support beberapa provider AI:
  - ChatGPT (via Nanzz Copilot)
  - Claude (via Nexray)
  - Copilot (via Nanzz)
  - Gemini (via Soonex)
  - Claude Soonex (backup)
  - provider custom dari "config/providers.json"
- Mode jawaban fleksibel.
- Support Termux:API.
- Support Termux:Widget.
- Support MacroDroid.
- Bisa dipakai tanpa root.

---

✦ Mode Jawaban

Mode yang tersedia:

default
form
pilihanganda
opsi
sd
smp
sma
singkat
sedang
lengkap
detail
formal
santai
code
math
wa
ringkas
rewrite
huruf

Contoh fungsi mode:

Mode| Fungsi
"default"| mode umum
"form"| cocok untuk pertanyaan form
"pilihanganda"| menjawab soal pilihan ganda
"opsi"| fokus memilih opsi jawaban
"sd"| jawaban bahasa anak SD
"smp"| jawaban tingkat SMP
"sma"| jawaban tingkat SMA
"singkat"| jawaban pendek
"sedang"| jawaban sedang
"lengkap"| jawaban lebih lengkap
"detail"| penjelasan detail
"formal"| gaya bahasa formal
"santai"| gaya bahasa santai
"code"| bantuan coding
"math"| matematika / hitungan
"wa"| format chat WhatsApp
"ringkas"| meringkas teks
"rewrite"| menulis ulang teks
"huruf"| fokus jawab huruf opsi

---

✦ Install Cepat Copy-Paste

pkg update -y
pkg install nodejs termux-api git unzip -y
termux-setup-storage

git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard

bash scripts/install-fresh.sh
neuro on

Atau tanpa git, download zip lalu:

cp /sdcard/Download/Agen-clipboard-fixed.zip ~/
cd ~
unzip -o Agen-clipboard-fixed.zip -d Agen-clipboard
cd Agen-clipboard
bash scripts/install-fresh.sh

---

✦ Syarat

Install aplikasi berikut di Android:

- Termux
- Termux:API wajib. Download dari F-Droid, GitHub release, atau sumber lain yang kompatibel dengan versi Termux kamu.
- Termux:Widget, opsional.
- MacroDroid, opsional.

«Catatan penting: package "termux-api" di Termux tidak cukup kalau aplikasi Android Termux:API belum terinstall. Clipboard dan notifikasi membutuhkan keduanya.»

Pastikan clipboard jalan:

termux-clipboard-set "halo"
termux-clipboard-get

Pastikan notifikasi jalan:

termux-notification --title "TEST" --content "Notif hidup"

Kalau notifikasi tidak muncul, aktifkan permission notifikasi untuk Termux dan Termux:API.

---

✦ Cara Pakai Cepat

Aktifkan watcher:

neuro on

Lalu salin teks apa pun, misalnya:

We use my eyes for ...
A. see
B. eat
C. kick
D. listen

Akan muncul notifikasi NeuroClip.

Aksi yang tersedia:

Tap notif        → buka menu
Jawab            → proses AI
Balas            → kasih instruksi tambahan
Tutup            → abaikan

Setelah AI menjawab:

Jawaban masuk clipboard
↓
Paste di tempat yang dibutuhkan

Matikan watcher:

neuro off

---

✦ Command Utama

neuro on
neuro off
neuro status
neuro log
neuro reset
neuro reset full
neuro mode
neuro mode form
neuro mode default
neuro run "siapa presiden ke 2 indonesia"
neuro clip

Command| Fungsi
"neuro on"| aktifkan clipboard watcher
"neuro off"| matikan watcher dan bersihkan notifikasi
"neuro status"| cek status tools
"neuro log"| lihat log watcher
"neuro reset"| hapus konteks lama
"neuro reset full"| hapus semua memory termasuk mode
"neuro mode"| cek mode aktif
"neuro mode form"| set mode aktif ke form
"neuro mode default"| balik ke mode default
"neuro run "teks""| jawab teks langsung
"neuro clip"| jawab isi clipboard sekali

---

✦ Provider AI

Endpoint dikonfigurasi di:

config/providers.json

Provider aktif:

Provider| URL| Cocok Untuk
"chatgpt"| api-nanzz.my.id/copilot| default, form, pilihan ganda
"claude"| api.nexray.eu.cc/claude| deep, lengkap, SMA, formal
"copilot"| api-nanzz.my.id/copilot| rewrite, ringkas, WA
"gemini"| api.soonex.biz.id/gemini| backup umum
"claude_soonex"| api.soonex.biz.id/claude| backup claude

Fallback otomatis jika provider pertama gagal.

Contoh route:

default     → chatgpt → claude → gemini
lengkap     → claude → chatgpt → gemini
sma         → claude → chatgpt → gemini
ringkas     → copilot → chatgpt → claude
code        → chatgpt → claude → gemini

---

✦ Provider Router

Mode| Urutan Provider
"default"| chatgpt → claude → gemini
"form"| chatgpt → claude → gemini
"pilihanganda"| chatgpt → claude → gemini
"singkat"| chatgpt → claude → gemini
"lengkap"| claude → chatgpt → gemini
"bahas"| claude → chatgpt → gemini
"sma"| claude → chatgpt → gemini
"code"| chatgpt → claude → gemini
"wa"| copilot → chatgpt → claude
"ringkas"| copilot → chatgpt → claude

---

✦ Termux:Widget

Buat shortcut widget:

bash scripts/setup-widget.sh

Shortcut yang tersedia:

neuro-on
neuro-off
neuro-answer
neuro-reply
neuro-reason
neuro-menu
neuro-view
neuro-close
neuro-reset

---

✦ MacroDroid

Contoh trigger MacroDroid:

Action:
Run Termux Command

Command:
neuro clip

---

✦ File Memory

Memory lokal disimpan di:

~/.neuroclip/memory.json

Reset konteks:

neuro reset

Reset total:

neuro reset full

---

✦ Tips Stabil di Oppo / ColorOS / Xiaomi / Vivo

Matikan battery optimization untuk:

- Termux
- Termux:API
- Termux:Widget
- MacroDroid

Aktifkan jika tersedia:

Allow background activity
Autostart
Izinkan notifikasi
Jangan batasi penggunaan baterai

---

✦ Troubleshooting

Clipboard tidak terbaca

termux-clipboard-set "tes"
termux-clipboard-get

Kalau error: pastikan Termux:API terinstall, beri izin akses, restart Termux.

---

Notifikasi tidak muncul

termux-notification --title "TEST" --content "Notif hidup"

Kalau tidak muncul: cek izin notifikasi Termux dan Termux:API, cek battery optimization.

---

Watcher mati sendiri

neuro status
neuro log
neuro off
neuro on

---

Jawaban nyangkut ke konteks lama

neuro reset
neuro on

Reset total:

neuro reset full
neuro on

---

Provider error

neuro log

Edit provider di "config/providers.json" lalu ulangi setup:

bash scripts/install-fresh.sh

---

✦ Struktur Project

Agen-clipboard/
├── src/
│   ├── core.mjs
│   ├── cli.mjs
│   ├── watch-confirm.mjs
│   ├── watch.mjs
│   ├── answer.mjs
│   ├── reply.mjs
│   ├── reason.mjs
│   ├── menu.mjs
│   ├── view.mjs
│   ├── close.mjs
│   ├── reset.mjs
│   ├── mode.mjs
│   └── server.mjs
├── scripts/
│   ├── install-fresh.sh
│   ├── setup-termux.sh
│   └── setup-widget.sh
├── config/
│   └── providers.json
├── package.json
├── README.md
└── LICENSE

---

✦ Catatan

- Semua memory disimpan lokal.
- Public endpoint bisa mati kapan saja, ganti di "config/providers.json".
- Jangan gunakan untuk spam endpoint.
- Gunakan untuk workflow pribadi, belajar, testing automation, dan eksperimen Android + Termux.
- Project ini tidak membutuhkan root.
- MacroDroid dan Termux:Widget bersifat opsional.

---

✦ Lisensi

MIT

---

<p align="center">
  <b>NeuroClip Agent</b><br/>
  Local Android automation with clipboard + notification workflow.
</p>
