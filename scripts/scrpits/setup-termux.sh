#!/data/data/com.termux/files/usr/bin/bash
set -e

APP_NAME="NeuroClip"
APP_VERSION="2.0"
APP_DIR="$HOME/.neuroclip"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"

R="\033[1;31m"
G="\033[1;32m"
Y="\033[1;33m"
C="\033[1;36m"
W="\033[1;37m"
D="\033[2m"
N="\033[0m"

clear_screen() {
  clear 2>/dev/null || true
}

banner() {
  clear_screen
  printf "${Y}"
  cat <<'ART'
 _   _                         ____ _ _       
| \ | | ___ _   _ _ __ ___    / ___| (_)_ __  
|  \| |/ _ \ | | | '__/ _ \  | |   | | | '_ \ 
| |\  |  __/ |_| | | | (_) | | |___| | | |_) |
|_| \_|\___|\__,_|_|  \___/   \____|_|_| .__/ 
                                       |_|    
ART
  printf "${N}"
  printf "                      ${W}Version ${APP_VERSION}${N}\n\n"
  printf "${G}[+]${N} Tool Created by ${Y}rhmt${N}\n"
  printf "${G}[+]${N} Project      : ${C}${APP_NAME} Agent${N}\n"
  printf "${G}[+]${N} Runtime      : ${C}Termux + Node.js${N}\n"
  printf "${G}[+]${N} Mode         : ${C}Clipboard AI Copilot${N}\n\n"
}

fail_box() {
  printf "\n${R}[!] Setup gagal.${N}\n"
  printf "${Y}Cek error di atas, lalu ulangi:${N}\n"
  printf "    ${C}bash scripts/setup-termux.sh${N}\n\n"
}

trap fail_box ERR

step_start() {
  printf "${R}[%02d]${N} ${Y}%-34s${N}" "$1" "$2"
}

ok() {
  printf "${G}[OK]${N}\n"
}

warn() {
  printf "${Y}[WARN]${N} %s\n" "$1"
}

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf "\n${R}[!] Command '%s' belum ada.${N}\n" "$1"
    printf "${Y}Install dulu:${N} ${C}pkg install %s -y${N}\n\n" "$2"
    exit 1
  fi
}

write_shortcut() {
  local name="$1"
  local body="$2"

  cat > "$HOME/.shortcuts/$name" <<SHORTCUT
#!/data/data/com.termux/files/usr/bin/bash
$body
SHORTCUT

  chmod +x "$HOME/.shortcuts/$name"
}

install_files() {
  step_start 1 "Checking Requirements"
  need_cmd node nodejs
  need_cmd termux-clipboard-get termux-api
  need_cmd termux-notification termux-api
  ok

  step_start 2 "Preparing Directory"
  mkdir -p "$APP_DIR/src" "$APP_DIR/config" "$HOME/.shortcuts"
  mkdir -p /sdcard/termux 2>/dev/null || warn "Storage belum siap. Jalankan termux-setup-storage kalau perlu."
  ok

  step_start 3 "Copying Source Files"
  cp -f "$SRC_DIR/src/"*.mjs "$APP_DIR/src/"
  cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/providers.json"
  cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/config/providers.json"
  ok

  step_start 4 "Installing Neuro Command"
  mkdir -p "$PREFIX/bin"
  cat > "$PREFIX/bin/neuro" <<'NEURO'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/cli.mjs" "$@"
NEURO
  chmod +x "$PREFIX/bin/neuro"
  ok

  step_start 5 "Creating Notification Actions"
  write_shortcut "neuro-answer" 'node "$HOME/.neuroclip/src/answer.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-reply" 'node "$HOME/.neuroclip/src/reply.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-reason" 'node "$HOME/.neuroclip/src/reason.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-menu" 'node "$HOME/.neuroclip/src/menu.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-view" 'node "$HOME/.neuroclip/src/view.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-close" 'node "$HOME/.neuroclip/src/close.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-reset" 'node "$HOME/.neuroclip/src/reset.mjs" >> "$HOME/neuroclip.log" 2>&1'
  write_shortcut "neuro-on" 'neuro on'
  write_shortcut "neuro-off" 'neuro off'
  ok

  step_start 6 "Checking JavaScript Syntax"
  node --check "$APP_DIR/src/core.mjs" >/dev/null
  node --check "$APP_DIR/src/watch-confirm.mjs" >/dev/null
  node --check "$APP_DIR/src/answer.mjs" >/dev/null
  node --check "$APP_DIR/src/reply.mjs" >/dev/null
  node --check "$APP_DIR/src/reason.mjs" >/dev/null
  node --check "$APP_DIR/src/menu.mjs" >/dev/null
  node --check "$APP_DIR/src/view.mjs" >/dev/null
  node --check "$APP_DIR/src/reset.mjs" >/dev/null
  node --check "$APP_DIR/src/mode.mjs" >/dev/null
  node --check "$APP_DIR/src/cli.mjs" >/dev/null
  ok
}

success_screen() {
  printf "\n${G}[+]${N} Installation finished successfully!\n\n"

  printf "${C}.:: NeuroClip Command List ::.${N}\n\n"

  printf "${R}[>]${N} ${C}neuro on${N}\n"
  printf "    ${Y}Start clipboard watcher / nyalakan agent clipboard${N}\n\n"

  printf "${R}[>]${N} ${C}neuro off${N}\n"
  printf "    ${Y}Stop clipboard watcher / matikan agent clipboard${N}\n\n"

  printf "${R}[>]${N} ${C}neuro status${N}\n"
  printf "    ${Y}Cek status NeuroClip${N}\n\n"

  printf "${R}[>]${N} ${C}neuro log${N}\n"
  printf "    ${Y}Lihat log watcher${N}\n\n"

  printf "${R}[>]${N} ${C}neuro mode${N}\n"
  printf "    ${Y}Cek mode jawaban aktif${N}\n\n"

  printf "${R}[>]${N} ${C}neuro mode form${N}\n"
  printf "    ${Y}Set mode untuk soal/form${N}\n\n"

  printf "${R}[>]${N} ${C}neuro mode default${N}\n"
  printf "    ${Y}Balik ke mode default${N}\n\n"

  printf "${R}[>]${N} ${C}neuro clip${N}\n"
  printf "    ${Y}Jawab isi clipboard sekali${N}\n\n"

  printf "${R}[>]${N} ${C}neuro run \"apa itu deforestasi?\"${N}\n"
  printf "    ${Y}Jawab teks langsung dari command${N}\n\n"

  printf "${R}[>]${N} ${C}neuro reset${N}\n"
  printf "    ${Y}Reset konteks / pending text${N}\n\n"

  printf "${R}[>]${N} ${C}neuro reset full${N}\n"
  printf "    ${Y}Reset total memory NeuroClip${N}\n\n"

  printf "${R}[>]${N} ${C}neuro help${N}\n"
  printf "    ${Y}Tampilkan bantuan command${N}\n\n"

  printf "${G}Flow:${N} ${Y}Copy text ${W}->${Y} Notification ${W}->${Y} Answer ${W}->${Y} Paste${N}\n\n"
  printf "${G}[+]${N} Ready. Jalankan sekarang:\n"
  printf "    ${C}neuro on${N}\n\n"
}

banner
printf "${C}.:: Installing NeuroClip Components ::.${N}\n\n"
install_files
success_screen
