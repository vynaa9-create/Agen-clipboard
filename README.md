# NeuroClip Agent

**NeuroClip** adalah clipboard AI copilot untuk Android + Termux.

GitHub: https://github.com/vynaa9-create/Agen-clipboard

Flow utamanya:

```txt
Salin teks
↓
Notif muncul
↓
Tap notif = buka menu modular
atau buka panel notif = Jawab / Balas / Tutup
↓
AI menjawab
↓
Jawaban masuk clipboard
↓
Paste
```

Project ini dibuat untuk workflow pribadi/testing: copy pertanyaan, kirim ke endpoint AI publik, lalu hasilnya otomatis balik ke clipboard.

---

## Fitur

- Clipboard watcher: deteksi teks baru yang disalin.
- Confirm mode: tidak langsung spam endpoint.
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
- Provider router + fallback:
  - ChatGPT endpoint
  - DeepSeek endpoint
  - Claude endpoint
  - Copilot endpoint
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
  - `formal`
  - `code`
  - `math`
  - `wa`
  - `ringkas`
  - `rewrite`
- Command simpel:
  - `neuro on`
  - `neuro off`
  - `neuro status`
  - `neuro mode form`
  - `neuro reset`


## Install cepat copy-paste

```bash
pkg update -y
pkg install nodejs termux-api git -y
termux-setup-storage
git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard
bash scripts/setup-termux.sh
neuro on
```

Setelah itu tinggal salin teks, tap notifikasi NeuroClip, lalu pilih menu.

---

## Syarat

Install aplikasi:

- Termux
- Termux:API
- Termux:Widget opsional

Di Termux:

```bash
pkg update -y
pkg install nodejs termux-api git -y
termux-setup-storage
```

Pastikan clipboard dan notif jalan:

```bash
termux-clipboard-set "halo"
termux-clipboard-get
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau notif tidak muncul, aktifkan permission notifikasi untuk **Termux** dan **Termux:API**.

---

## Install dari GitHub

```bash
git clone https://github.com/vynaa9-create/Agen-clipboard.git
cd Agen-clipboard
bash scripts/setup-termux.sh
```

Cek:

```bash
neuro status
```

---

## Cara pakai cepat

Aktifkan watcher:

```bash
neuro on
```

Lalu salin teks apa pun, misalnya:

```txt
We use my eyes for ...
A. see
B. eat
C. kick
D. listen
```

Akan muncul notifikasi NeuroClip.

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

Matikan watcher:

```bash
neuro off
```

---

## Command utama

```bash
neuro on
neuro off
neuro status
neuro log
neuro reset
neuro reset full
neuro mode
neuro mode form
neuro run "siapa presiden ke 2 indonesia"
neuro clip
```

Keterangan:

| Command | Fungsi |
|---|---|
| `neuro on` | aktifkan clipboard watcher |
| `neuro off` | matikan watcher dan bersihkan notif |
| `neuro status` | cek hidup/mati |
| `neuro log` | lihat log watcher |
| `neuro reset` | hapus konteks lama |
| `neuro reset full` | hapus semua memory termasuk mode |
| `neuro mode form` | set mode aktif |
| `neuro run "teks"` | jawab teks langsung |
| `neuro clip` | jawab isi clipboard sekali |

---

## Mode memory

Mode disimpan di memory lokal:

```txt
~/.neuroclip/memory.json
```

Jadi cukup set sekali:

```bash
neuro mode form
```

Setelah itu semua teks yang disalin diproses sebagai mode form sampai mode diganti lagi.

Contoh mode:

```bash
neuro mode form
neuro mode pilihanganda
neuro mode opsi
neuro mode sd
neuro mode lengkap
neuro mode code
```

---

## Menu Balas

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
```

---

## Provider AI

Endpoint dikonfigurasi di:

```txt
config/providers.json
```

Default:

| Provider | Peran |
|---|---|
| chatgpt | default, form, pilihan ganda, fakta umum |
| deepseek | coding, matematika, logika |
| claude | bahasa natural, SD/SMP/SMA, formal |
| copilot | rewrite, ringkas, WhatsApp |

Router fallback contoh:

```txt
form         → chatgpt → deepseek → claude
code         → deepseek → chatgpt → copilot
sd           → claude → chatgpt
ringkas      → copilot → claude → chatgpt
```

Kalau provider pertama gagal, NeuroClip otomatis mencoba provider berikutnya.

---

## Termux:Widget

Buat shortcut widget:

```bash
bash scripts/setup-widget.sh
```

Lalu di home screen:

```txt
Tahan layar kosong
↓
Widget
↓
Termux:Widget
↓
Pilih neuro-on / neuro-off
```

---

## Tips agar stabil di Oppo/ColorOS

Matikan battery optimization untuk:

- Termux
- Termux:API

Aktifkan:

```txt
Allow background activity
Autostart jika ada
Izinkan notifikasi
```

Gunakan:

```bash
neuro on
```

untuk menahan wake lock selama watcher aktif.

---

## Troubleshooting

### Notif tidak muncul

Test:

```bash
termux-notification --title "TEST" --content "Notif hidup"
```

Kalau tidak muncul, cek izin notifikasi Termux dan Termux:API.

### Tombol notif tidak kelihatan

Di beberapa HP, tombol hanya muncul kalau panel notifikasi ditarik/di-expand.

Solusi:
- Tap body notif untuk membuka menu.
- Atau buka panel notif untuk tombol `Jawab/Balas/Tutup`.

### Jawaban nyangkut ke konteks lama

Gunakan:

```bash
neuro reset
```

atau lewat menu:

```txt
reset
```

### Mode salah

Cek:

```bash
neuro mode
```

Ubah:

```bash
neuro mode default
```

### Provider error

Lihat log:

```bash
neuro log
```

Ganti endpoint di `config/providers.json`, lalu ulangi setup:

```bash
bash scripts/setup-termux.sh
```

---

## Push ke GitHub

```bash
git init
git add .
git commit -m "Initial NeuroClip Agent"
git branch -M main
git remote add origin https://github.com/username/neuroclip-agent.git
git push -u origin main
```

---

## Catatan

- Semua memory disimpan lokal.
- Public endpoint bisa mati kapan saja.
- Jangan gunakan untuk spam endpoint.
- Gunakan untuk workflow pribadi, belajar, dan testing automation.
