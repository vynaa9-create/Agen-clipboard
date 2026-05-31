#!/data/data/com.termux/files/usr/bin/bash
set -e

APP_NAME="NeuroClip"
APP_VERSION="2.0"
APP_DIR="$HOME/.neuroclip"
SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)"

R="\033[1;31m"
G="\033[1;32m"
Y="\033[1;33m"
B="\033[1;34m"
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
  cat <<'EOF'
 _   _                         ____ _ _       
| \ | | ___ _   _ _ __ ___    / ___| (_)_ __  
|  \| |/ _ \ | | | '__/ _ \  | |   | | | '_ \ 
| |\  |  __/ |_| | | | (_) | | |___| | | |_) |
|_| \_|\___|\__,_|_|  \___/   \____|_|_| .__/ 
                                       |_|    
EOF
  printf "${N}"
  printf "                      ${W}Version ${APP_VERSION}${N}\n\n"
  printf "${G}[+]${N} Tool Created by ${Y}rhmt${N}\n"
  printf "${G}[+]${N} Project      : ${C}${APP_NAME} Agent${N}\n"
  printf "${G}[+]${N} Runtime      : ${C}Termux + Node.js${N}\n"
  printf "${G}[+]${N} Mode         : ${C}Clipboard AI Copilot${N}\n\n"
}

ok() {
  printf "${G}[OK]${N}\n"
}

fail_box() {
  printf "\n${R}[!] Setup gagal.${N}\n"
  printf "${Y}Cek error di atas, lalu ulangi:${N}\n"
  printf "    ${C}bash scripts/setup-termux.sh${N}\n\n"
}

trap fail_box ERR

step_start() {
  printf "${R}[%02d]${N} ${Y}%-32s${N}" "$1" "$2"
}

write_shortcut() {
  local name="$1"
  local body="$2"

  cat > "$HOME/.shortcuts/$name" <<EOF
#!/data/data/com.termux/files/usr/bin/bash
$body
EOF

  chmod +x "$HOME/.shortcuts/$name"
}

install_files() {
  step_start 1 "Preparing Directory"
  mkdir -p "$APP_DIR/src" "$APP_DIR/config" "$HOME/.shortcuts" /sdcard/termux
  ok

  step_start 2 "Copying Source Files"
  cp -f "$SRC_DIR/src/"*.mjs "$APP_DIR/src/"
  cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/providers.json"
  cp -f "$SRC_DIR/config/providers.json" "$APP_DIR/config/providers.json"
  ok

  step_start 3 "Installing Neuro Command"
  mkdir -p "$PREFIX/bin"
  cat > "$PREFIX/bin/neuro" <<'EOF'
#!/data/data/com.termux/files/usr/bin/bash
node "$HOME/.neuroclip/src/cli.mjs" "$@"
EOF
  chmod +x "$PREFIX/bin/neuro"
  ok

  step_start 4 "Creating Notification Action"
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

  step_start 5 "Checking JavaScript Syntax"
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

  step_start 6 "Preparing Widget Shortcut"
  chmod +x "$HOME/.shortcuts"/neuro-* 2>/dev/null || true
  ok
}

success_screen() {
  printf "\n${G}[+]${N} Installation finished successfully!\n\n"

  printf "${C}.:: Select Any NeuroClip Action ::.${N}\n\n"

  printf "${R}[01]${N} ${Y}Start Clipboard Watcher${N}     ${R}[06]${N} ${Y}View Log${N}\n"
  printf "${R}[02]${N} ${Y}Stop Clipboard Watcher${N}      ${R}[07]${N} ${Y}Reset Memory${N}\n"
  printf "${R}[03]${N} ${Y}Check Status${N}                ${R}[08]${N} ${Y}Reset Full${N}\n"
  printf "${R}[04]${N} ${Y}Answer Clipboard Once${N}       ${R}[09]${N} ${Y}Set Mode Form${N}\n"
  printf "${R}[05]${N} ${Y}Run Text Directly${N}           ${R}[10]${N} ${Y}Exit${N}\n\n"

  printf "${G}Command Example:${N}\n\n"
  printf "${R}[>]${N} ${C}neuro on${N}\n"
  printf "${R}[>]${N} ${C}neuro clip${N}\n"
  printf "${R}[>]${N} ${C}neuro run \"apa itu deforestasi?\"${N}\n\n"

  printf "${G}Flow:${N} ${Y}Copy text ${W}->${Y} Notification ${W}->${Y} Answer ${W}->${Y} Paste${N}\n\n"
}

run_action_menu() {
  if [ ! -t 0 ]; then
    printf "${G}Ready.${N} Jalankan: ${C}neuro on${N}\n"
    return
  fi

  printf "${R}[-]${N} ${G}Select an option:${N} "
  read -r opt

  case "$opt" in
    1|01)
      neuro on
      ;;
    2|02)
      neuro off
      ;;
    3|03)
      neuro status
      ;;
    4|04)
      neuro clip
      ;;
    5|05)
      printf "${C}Enter text:${N} "
      read -r text
      neuro run "$text"
      ;;
    6|06)
      neuro log
      ;;
    7|07)
      neuro reset
      ;;
    8|08)
      neuro reset full
      ;;
    9|09)
      neuro mode form
      ;;
    10|x|X|exit|q|Q)
      printf "${G}Bye.${N}\n"
      ;;
    "")
      printf "${G}Ready.${N} Jalankan: ${C}neuro on${N}\n"
      ;;
    *)
      printf "${R}Invalid option.${N}\n"
      printf "${Y}Command manual:${N} ${C}neuro on${N}\n"
      ;;
  esac
}

banner
printf "${C}.:: Installing NeuroClip Components ::.${N}\n\n"
install_files
success_screen
run_action_menu
