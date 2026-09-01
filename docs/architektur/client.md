---
title: Client-Architektur
sidebar_position: 2
---

# Client-Architektur

Der Client ist eine **PySide6-Desktop-Anwendung** (Qt for Python). Der
wichtigste Import-Vertrag: **UI kennt kein SQL**. Alles laeuft ueber
das `Repo`-Interface.

## Ebenen

```
UI-Widgets  ->  Controller/Presenter  ->  Repo  ->  Speicher
(main_window)   (per Dialog)              (interface)
```

- **UI-Widgets** (`vertragsboard/ui/`) &ndash; reine Anzeige, keine
  Business-Logik.
- **Controller** &ndash; Signal-Handler in den Widgets, ruft
  Repo-Methoden auf.
- **Repo** &ndash; abstrakte Schicht (siehe [Uebersicht](./uebersicht.md)).

## Modul-Karte

| Modul | Zweck |
|---|---|
| `main.py` | Entry-Point, App-Setup, Modus-Auswahl |
| `ui/main_window.py` | Hauptfenster, Liste + Detail-Panel |
| `ui/detail.py` | Detail-Widget eines Vorgangs |
| `ui/setup_wizard.py` | Erst-Konfiguration |
| `ui/admin_dashboard.py` | Admin-Dialog (Space-Konfig) |
| `ui/activity_dialog.py` | Aktivitaetslog-Fenster |
| `ui/presence_dialog.py` | Live-Praesenz-Liste |
| `backend/base.py` | Abstrakte `Repo`-Klasse |
| `backend/factory.py` | Modus-Auswahl (sqlite vs api) |
| `backend/presets.py` | Standard-Steps und Vertragsarten |
| `storage.py` | Low-Level SQLite-Zugriff |
| `updater.py` | Auto-Update (GitHub-Releases) |
| `paths.py` | Datei-Pfade (`%APPDATA%`, OneDrive, ...) |
| `config.py` | Konstanten, Version |
| `pdf/report.py` | PDF-Report-Erzeugung |
| `pdf/vertragsauftrag.py` | Vertragsauftrag-Formular fuellen |
| `pdf_field_mapping.py` | AcroForm-Feld &rarr; Vorgangsfeld |

## Signals & Slots

Vertragsboard nutzt Qt-Signals, damit UI-Widgets lose gekoppelt sind:

- `MainWindow.vorgangSelected(int)` &rarr; `DetailWidget.load()`
- `DetailWidget.stepToggled(int)` &rarr; Controller ruft
  `repo.toggle_step()`
- `Repo.dataChanged()` (custom) &rarr; UI refresh

## Thread-Modell

- **UI-Thread** (Qt-Main): alle Widget-Aktionen.
- **Network-Thread**: nur `ApiRepo`. Ein `QThreadPool`-Worker fuer
  HTTP-Requests. UI-Callbacks via `QTimer.singleShot(0, ...)`.
- **Presence-Timer**: `QTimer` alle 60 s, ruft `repo.presence_beat()`.
- **Auto-Update-Check**: einmalig 30 s nach Start (Background-Task).

## State und Cache

Der Client cacht:

- **Vorgangsliste** pro Bereich, refresh bei Aenderungen.
- **Space-Config**, refresh alle 5 min oder bei Push-Event
  (`config.save`).
- **Praesenz-Liste**, refresh alle 30 s.

Persistente Client-Einstellungen liegen in
`%APPDATA%\Vertragsboard\settings.json` &ndash; z. B. Spaltenbreiten,
zuletzt geoeffneter Bereich.

## Fehler-Handling

- Jeder Repo-Aufruf ist in `try/except VbError` verpackt.
- `VbError` hat `code` und `message` &ndash; UI zeigt Message-Box mit
  Kontext.
- Netzwerkfehler haben einen expliziten Retry-Button.

## Konfliktbehandlung

Bei HTTP 409 (Optimistische Sperre) oeffnet der Client einen
Konflikt-Dialog:

- Links: eigene Aenderung
- Mitte: aktueller Server-Stand
- Rechts: Vorschau nach Merge
- Buttons: "Meine Version behalten", "Server-Version uebernehmen",
  "Zusammenfuehren" (falls unterschiedliche Felder)

## Tests

Repo-Ebene: unit-tests mit einer temp. SQLite-DB (`tests/test_sqlite_repo.py`).
UI: manueller Test-Katalog, keine automatisierten UI-Tests.
