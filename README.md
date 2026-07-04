# Speesh

Speesh is a free, open-source, fully offline speech-to-text app for macOS, Windows, and Linux. Press a hotkey, speak, and your words are typed straight into whatever you're using — no cloud, no accounts, no data leaving your machine.

Its headline feature: **live typing** — with a streaming model, transcription appears at your cursor _as you speak_, not in a separate popup pasted at the end.

> **Speesh is an enhanced fork of [Handy](https://github.com/cjpais/Handy) by [CJ Pais](https://github.com/cjpais) ([handy.computer](https://handy.computer)).** Handy is the original free, open-source, offline speech-to-text app, and all the hard foundational work — the local inference pipeline, VAD, model catalog, and cross-platform plumbing — is theirs. Speesh builds on it with live typing at the cursor and stays synced with upstream. Full credit and thanks to CJ Pais and the Handy contributors. If you like this, please support the original project. This is not a replacement for Handy — it's my take on top of their excellent work.

## Features

- **Live typing at the cursor** — streaming models type words into the focused input as they're spoken (append-only, no flicker).
- **Fully offline** — all speech recognition runs locally (Whisper-family via `transcribe-cpp`, plus ONNX models like Parakeet, Moonshine, Canary).
- **Push-to-talk or toggle** — global hotkey, configurable.
- **Optional LLM post-processing** — clean up transcripts with a local or API model (off by default).
- **Custom words + filler removal** — bias recognition toward your vocabulary.
- **Cross-platform** — macOS (Metal), Windows (Vulkan), Linux.

## How it works

```
hotkey → record mic → Silero VAD → streaming ASR → text typed at cursor (live)
```

Non-streaming models fall back to transcribe-on-release, then paste.

## Default hotkeys (macOS)

| Action | Shortcut |
| --- | --- |
| Transcribe | `shift + fn` |
| Transcribe + post-process | `ctrl + option + shift + space` |
| Cancel | `escape` |

Windows/Linux default to `ctrl+space` / `ctrl+shift+space`. All are configurable in Settings.

## Live typing

Enabled by default. It engages when:

- a **streaming-capable** model is selected (e.g. `moonshine-streaming-tiny`, `nemotron-3.5-asr-streaming`), and
- post-processing is **off** (LLM rewrites can't be applied to text already typed).

Otherwise Speesh transcribes on release and pastes. Toggle it with the `live_typing` setting.

## Build from source

Prerequisites: [Rust](https://rustup.rs/) (stable), [Bun](https://bun.sh/), and CMake.

```bash
bun install

# fetch the voice-activity-detection model
mkdir -p src-tauri/resources/models
curl -o src-tauri/resources/models/silero_vad_v4.onnx https://blob.handy.computer/silero_vad_v4.onnx

# run in dev
bun run tauri dev

# production build (.app / .dmg / installer)
bun run tauri build
```

On macOS with CMake 4, prefix build commands with `CMAKE_POLICY_VERSION_MINIMUM=3.5`.

## Permissions (macOS)

On first launch, grant Speesh these in **System Settings → Privacy & Security**:

- **Microphone** — recording
- **Accessibility** — global hotkey + typing into other apps
- **Input Monitoring** — low-level key listener

## Models

Models download on demand from their hosted locations into the app data directory. Streaming models are required for live typing.

## Architecture

Tauri 2 (Rust backend + React/TypeScript frontend).

- `src-tauri/src/managers/transcription.rs` — streaming + batch transcription pipeline
- `src-tauri/src/actions.rs` — record → transcribe → output orchestration
- `src-tauri/src/audio_toolkit/` — capture, resampling, VAD
- `src/` — settings UI, onboarding, overlay

## License

MIT. See [LICENSE](LICENSE).

## Acknowledgments

Speesh exists because of **[Handy](https://github.com/cjpais/Handy)**, the original open-source offline speech-to-text app created by **[CJ Pais](https://github.com/cjpais)** — see [handy.computer](https://handy.computer). Handy is MIT-licensed, and its author does the genuinely hard work: a fully local inference pipeline, the model catalog, voice-activity detection, the streaming architecture, and the cross-platform Tauri app that Speesh depends on entirely.

Speesh is a personal, enhanced fork — it adds live typing at the cursor and tracks upstream — and takes **no credit** for Handy's foundation. If Speesh is useful to you, please star and support [the original project](https://github.com/cjpais/Handy).

Speech recognition is powered by `transcribe-cpp` / `transcribe-rs` (Whisper.cpp lineage) and Silero VAD.

### License & attribution

Speesh is distributed under the MIT License. The original copyright — `Copyright (c) 2025 CJ Pais` — is retained in [LICENSE](LICENSE) as required, and this fork does not claim ownership of the upstream work.
