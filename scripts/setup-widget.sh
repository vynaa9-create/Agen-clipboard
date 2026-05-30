#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$HOME/.shortcuts" "$HOME/.anu-agent"

cat > "$HOME/.shortcuts/anu" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
termux-wake-lock
node "$PROJECT_DIR/src/cli.mjs" >> "$HOME/.anu-agent/widget.log" 2>&1
termux-wake-unlock
EOF2

cat > "$HOME/.shortcuts/anu-watch-start" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
pkill -f "src/watch.mjs" 2>/dev/null
termux-wake-lock
nohup node "$PROJECT_DIR/src/watch.mjs" > "$HOME/.anu-agent/watch.log" 2>&1 &
termux-toast "Anu Watcher aktif"
EOF2

cat > "$HOME/.shortcuts/anu-watch-stop" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
pkill -f "src/watch.mjs" 2>/dev/null
termux-wake-unlock
termux-toast "Anu Watcher mati"
EOF2

cat > "$HOME/.shortcuts/anu-server-start" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
pkill -f "src/server.mjs" 2>/dev/null
termux-wake-lock
nohup node "$PROJECT_DIR/src/server.mjs" > "$HOME/.anu-agent/server.log" 2>&1 &
termux-toast "Anu Server aktif"
EOF2

cat > "$HOME/.shortcuts/anu-server-stop" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
pkill -f "src/server.mjs" 2>/dev/null
termux-wake-unlock
termux-toast "Anu Server mati"
EOF2

for mode in default sd smp sma singkat detail formal santai code wa form huruf; do
  cat > "$HOME/.shortcuts/mode-$mode" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
node "$PROJECT_DIR/src/mode.mjs" "$mode" >> "$HOME/.anu-agent/widget.log" 2>&1
EOF2
  chmod +x "$HOME/.shortcuts/mode-$mode"
done

chmod +x "$HOME/.shortcuts/anu" \
  "$HOME/.shortcuts/anu-watch-start" \
  "$HOME/.shortcuts/anu-watch-stop" \
  "$HOME/.shortcuts/anu-server-start" \
  "$HOME/.shortcuts/anu-server-stop"

echo "Shortcut Termux:Widget berhasil dibuat di ~/.shortcuts"
echo "Tambahkan widget Termux:Widget dari home screen."
