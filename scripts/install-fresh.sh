
#!/data/data/com.termux/files/usr/bin/bash
set -e

APP_NAME="NeuroClip"
APP_VERSION="2.0"
APP_DIR="$HOME/.neuroclip"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PREFIX="${PREFIX:-/data/data/com.termux/files/usr}"

R="\033[1;31m"
G="\033[1;32m"
Y="\033[1;33m"
C="\033[1;36m"
W="\033[1;37m"
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
  printf "    ${C}bash scripts/install-fresh.sh${N}\n\n"
}

trap fail_box ERR

step_start() {
  printf "${R}[%02d]${N} ${Y}%-34s${N}" "$1" "$2"
}

ok() {
  printf "${G}[OK]${N}\n"
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

success_screen() {
  printf "\n${G}[+]${N} Installation finished successfully!\n\n"

  printf "${C}.:: NeuroClip Commands ::.${N}\n\n"

  printf "${R}[>]${N} ${C}neuro on${N}\n"
  printf "${R}[>]${N} ${C}neuro off${N}\n"
  printf "${R}[>]${N} ${C}neuro status${N}\n"
  printf "${R}[>]${N} ${C}neuro log${N}\n"
  printf "${R}[>]${N} ${C}neuro mode${N}\n"
  printf "${R}[>]${N} ${C}neuro mode form${N}\n"
  printf "${R}[>]${N} ${C}neuro mode default${N}\n"
  printf "${R}[>]${N} ${C}neuro clip${N}\n"
  printf "${R}[>]${N} ${C}neuro run \"apa itu deforestasi?\"${N}\n"
  printf "${R}[>]${N} ${C}neuro reset${N}\n"
  printf "${R}[>]${N} ${C}neuro reset full${N}\n"
  printf "${R}[>]${N} ${C}neuro help${N}\n"
  printf "${R}[>]${N} ${C}neuro info${N}\n\n"

  printf "${G}Flow:${N} ${Y}Copy text ${W}->${Y} Notification ${W}->${Y} Answer ${W}->${Y} Paste${N}\n\n"
  printf "${G}[+]${N} Ready. Start watcher:\n"
  printf "    ${C}neuro on${N}\n\n"
}

# === MAIN ===
banner
printf "${C}.:: Fresh Install NeuroClip ::.${N}\n\n"

step_start 1 "Update & Upgrade Packages"
{ pkg update -y && pkg upgrade -y; } > /dev/null 2>&1
ok

step_start 2 "Install Dependencies"
{ pkg install -y nodejs termux-api unzip; } > /dev/null 2>&1
ok

step_start 3 "Preparing Directories"
mkdir -p "$APP_DIR/src" "$APP_DIR/config" "$HOME/.shortcuts"
ok

step_start 4 "Copying Source Files"
cp -f "$SRC_DIR/src/"*.mjs "$APP_DIR/src/"
cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/providers.json"
cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/config/providers.json"
ok

step_start 5 "Installing Neuro Command"
cat > "$PREFIX/bin/neuro" << 'NEURO'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/cli.mjs" "$@"
NEURO
chmod +x "$PREFIX/bin/neuro"
ok

step_start 6 "Creating Notification Shortcuts"
write_shortcut "neuro-answer"  'node "$HOME/.neuroclip/src/answer.mjs"  >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-reply"   'node "$HOME/.neuroclip/src/reply.mjs"   >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-reason"  'node "$HOME/.neuroclip/src/reason.mjs"  >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-menu"    'node "$HOME/.neuroclip/src/menu.mjs"    >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-view"    'node "$HOME/.neuroclip/src/view.mjs"    >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-close"   'node "$HOME/.neuroclip/src/close.mjs"   >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-reset"   'node "$HOME/.neuroclip/src/reset.mjs"   >> "$HOME/neuroclip.log" 2>&1'
write_shortcut "neuro-on"      'neuro on'
write_shortcut "neuro-off"     'neuro off'
ok

step_start 7 "Verifying Installation"
test -f "$APP_DIR/src/cli.mjs"
test -f "$APP_DIR/src/core.mjs"
test -f "$APP_DIR/providers.json"
test -x "$PREFIX/bin/neuro"
ok

success_screen
