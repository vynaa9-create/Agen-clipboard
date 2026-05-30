#!/data/data/com.termux/files/usr/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BIN_DIR="$HOME/.local/bin"
mkdir -p "$BIN_DIR" "$HOME/.anu-agent"

cat > "$BIN_DIR/anu" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
node "$PROJECT_DIR/src/cli.mjs" "\$@"
EOF2

cat > "$BIN_DIR/anu-watch" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
node "$PROJECT_DIR/src/watch.mjs"
EOF2

cat > "$BIN_DIR/anu-server" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
node "$PROJECT_DIR/src/server.mjs"
EOF2

cat > "$BIN_DIR/anu-mode" <<EOF2
#!/data/data/com.termux/files/usr/bin/bash
node "$PROJECT_DIR/src/mode.mjs" "\$@"
EOF2

chmod +x "$BIN_DIR/anu" "$BIN_DIR/anu-watch" "$BIN_DIR/anu-server" "$BIN_DIR/anu-mode"

if ! grep -q 'export PATH="$HOME/.local/bin:$PATH"' "$HOME/.bashrc" 2>/dev/null; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$HOME/.bashrc"
fi

if [ ! -f "$HOME/.anu-agent/mode" ]; then
  echo "default" > "$HOME/.anu-agent/mode"
fi

echo "Setup selesai. Jalankan:"
echo "source ~/.bashrc"
echo "anu /sd apa dampak deforestasi?"
