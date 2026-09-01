---
title: Quellcode
sidebar_position: 1
---

# Quellcode & Entwicklungs-Setup

Vertragsboard ist Open Source auf GitHub:
[nicigrv/vertragsboard](https://github.com/nicigrv/vertragsboard).

## Voraussetzungen

- **Python 3.11** oder neuer
- **Git**
- **Windows 10/11** fuer volle Test-Reichweite (Client ist Windows-Only,
  aber Kernlogik laeuft auch unter Linux/macOS)
- Optional fuer Backend-Arbeit: **PHP 8.1**, **MariaDB 10.6**

## Repo klonen

```bash
git clone https://github.com/nicigrv/vertragsboard.git
cd vertragsboard
```

## Virtualenv & Dependencies

```bash
python -m venv .venv
.venv\Scripts\activate     # PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

## App starten

```bash
python -m vertragsboard
```

Beim ersten Start oeffnet sich der Setup-Wizard.

## Tests

```bash
pytest
```

Unit-Tests decken hauptsaechlich das SqliteRepo, das PDF-Mapping und
die Presets ab. UI-Tests sind manuell.

## Code-Struktur

```
vertragsboard/
  __init__.py       # __version__
  main.py           # Entry-Point
  config.py         # Konstanten
  paths.py          # Pfade
  storage.py        # SQLite Low-Level
  updater.py        # Auto-Update
  pdf_field_mapping.py

  ui/               # PySide6 Widgets
  backend/          # Repos, Presets, Factory
  pdf/              # Report & Vertragsauftrag
  assets/           # Icons, Vorlagen

php_backend/
  api.php
  config.example.php
  schema.sql
  portal/           # Web-Admin-Portal

tools/              # Hilfs-Skripte (Test-PDF, Migrationen)
docs/               # In-Repo-Doku (API_SPEC, MIGRATION_*)
tests/              # pytest
```

## Coding-Style

- **Black** (line-length 100) + **isort** &ndash; Pre-Commit-Hook konfiguriert.
- **Type-Hints** ueberall in `backend/` und `pdf/`; in `ui/` teilweise.
- **Docstrings** (`Args/Returns`) fuer oeffentliche Repo-Methoden.
- **Kein** `print` &ndash; `logging.getLogger(__name__)`.

## PySide6-Tipps

- Immer im UI-Thread updaten &ndash; keine Widgets aus Worker-Threads.
- Signals mit `Signal(int, str)` typ-annotieren.
- Fuer Long-Running-Tasks `QThreadPool.globalInstance()`.

## Debugging

- `--debug` als Kommando-Argument &rarr; verbose Logging, Fenster
  "Debug-Konsole" mit Live-Log.
- Backend: `define('DEBUG', true)` in `config.php`.

## Kontribuieren

- Fork &rarr; Feature-Branch &rarr; PR.
- **Tests hinzufuegen** wenn Verhalten neu ist.
- **Migrationen** in `php_backend/migrations/<version>-<slug>.sql`.
- **Changelog** in `docs/CHANGELOG.md` ergaenzen.

Fragen? Issue auf GitHub oder [Support](../support.md).
