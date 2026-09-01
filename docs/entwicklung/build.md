---
title: Build
sidebar_position: 2
---

# Build

Aus dem Quellcode wird ein Windows-Installer erzeugt (PyInstaller +
NSIS). Alles automatisiert in `build.bat` im Repo-Root.

## Voraussetzungen

- Python 3.11 (virtualenv aktiv)
- PyInstaller (`pip install pyinstaller`, ist in
  `requirements-dev.txt`)
- **NSIS** (Nullsoft Scriptable Install System) installiert &ndash;
  Pfad in `PATH`
- Optional: **osslsigncode** oder eigene Windows-Signatur (fuer Release)

## Schnellstart

```bash
build.bat
```

Baut alle Artefakte in `dist/`:

- `Vertragsboard.exe` &ndash; Standalone-Executable
- `Vertragsboard-<version>/` &ndash; Ordner mit allen DLLs
- `Vertragsboard-Setup-<version>.exe` &ndash; Full-Installer
- `Vertragsboard-WebSetup-<version>.exe` &ndash; Web-Installer

## Was `build.bat` macht

1. Version aus `vertragsboard/__init__.py` lesen.
2. `pyinstaller vertragsboard.spec` &rarr; Bundle in `dist/`.
3. NSIS `install.nsi` &rarr; Setup.exe erzeugen.
4. NSIS `webinstall.nsi` &rarr; WebSetup.exe erzeugen.
5. Optional signieren, wenn `SIGN_CERT` gesetzt.
6. SHA256-Summen ausgeben.

## PyInstaller-Spec

`vertragsboard.spec` konfiguriert:

- Entry: `vertragsboard/main.py`
- Windowed (kein Konsolen-Fenster)
- Icon: `assets/icon.ico`
- Hidden Imports: `PySide6.QtSql`, `reportlab.pdfgen`
- Datei-Bundle: `assets/`, `pdf/vertragsauftrag/*.pdf`
- One-Folder statt One-File &ndash; schneller Start,
  bessere Update-Faehigkeit

## NSIS-Skript

`install.nsi` konfiguriert:

- Installations-Pfad: `$PROGRAMFILES64\Vertragsboard`
- Startmenue-Eintrag + Desktop-Verknuepfung
- Uninstaller-Registry-Eintrag
- **Silent-Mode** `/S` &ndash; von Auto-Update genutzt
- **Command-Line Args**:
  - `/S` &ndash; silent
  - `/D=<path>` &ndash; Ziel-Ordner
- Optional MSI-Wrapper (fuer Enterprise-Deploy) &ndash; separate
  `install.msi.nsi`-Variante.

## Web-Installer

`webinstall.nsi` erzeugt ein 2-MB-Executable, das beim Start den
Full-Installer von GitHub-Releases herunterlaedt und ausfuehrt. Nuetzlich,
weil das grosse .exe nicht in jedes E-Mail-Postfach passt.

## Signieren

```bash
signtool sign /f cert.pfx /p <password> ^
  /tr http://timestamp.digicert.com /td sha256 /fd sha256 ^
  dist\Vertragsboard-Setup-<v>.exe
```

Ohne Signatur zeigt Windows SmartScreen "Unknown Publisher" &ndash;
Nutzer muessen "Trotzdem ausfuehren" klicken.

## Cross-Platform-Build

**Nicht offiziell unterstuetzt.** Der Client baut auf Windows-APIs
(File-Dialoge, Registry, Auto-Update). Fuer Kernlogik-Tests laesst
sich `python -m vertragsboard` auf Linux/macOS starten &ndash; UI
haesslich, aber funktionsfaehig.

## PHP-Backend "bauen"

Kein Build. Der `php_backend/`-Ordner wird als Release-ZIP zusammengefasst:

```bash
cd php_backend
zip -r ../dist/vertragsboard-backend-<version>.zip . -x '*.git*'
```
