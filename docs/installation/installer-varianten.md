---
title: Installer-Varianten
sidebar_position: 2
---

# Installer-Varianten

Fuer jede Verteilart wird bei einem Release ein passendes Asset auf
GitHub bereitgestellt. Alle Assets sind auf der
[Release-Seite](https://github.com/nicigrv/vertragsboard/releases/latest)
zu finden.

## Uebersicht

| Datei | Groesse | Wann geeignet |
|---|---|---|
| `Vertragsboard-Installer.zip` | klein | **Standardempfehlung.** Enthaelt den Web-Setup, der die EXE waehrend der Installation von GitHub nachlaedt. |
| `Vertragsboard-WebSetup.exe` | klein | Direkt der Web-Setup (ohne ZIP-Huelle). |
| `Vertragsboard-Setup.exe` | gross | Offline-Installer (Inno Setup) mit der EXE komplett gebundelt. Fuer PCs ohne Internetzugang. |
| `Vertragsboard.exe` | gross | Portable EXE. Keine Installation, einfach in einen Ordner kopieren und starten. |
| `Vertragsboard-PHP-Backend.zip` | mittel | Serverseitiges Paket fuer eigene Hoster (`api.php`, `schema.sql`, `install.php`, `portal/`, `.htaccess`, `README.md`). |

## Web-Installer (Standard)

- Wird als **`Vertragsboard-Installer.zip`** ausgeliefert.
- Enthaelt die kleine Setup-EXE plus `README-INSTALL.txt`.
- Waehrend der Installation wird die aktuelle `Vertragsboard.exe` vom Release
  heruntergeladen.
- Vorteil: kleiner Download, immer die neueste Version.

## Offline-Installer

- **`Vertragsboard-Setup.exe`** ist ein Inno-Setup-Installer mit der
  kompletten EXE im Bundle.
- Waehle diesen fuer PCs **ohne Internetzugang**.
- Legt Programm im User-Profil ab (kein Admin noetig).
- Anmerkung Inno Setup: `WizardStyle=classic` &ndash; `modern` rendert unter
  Windows 11 Dark Mode weisse Buttons auf weissem Grund.

## Portable EXE

- **`Vertragsboard.exe`** &ndash; direkt aus dem Release-Asset ziehen und
  starten.
- Kein Eintrag in "Programme & Features", keine Verknuepfungen im Startmenue.
- Konfiguration liegt trotzdem in `%APPDATA%\Vertragsboard\` (nicht im
  EXE-Verzeichnis).
- Nuetzlich fuer USB-Stick-Betrieb, Support-Sessions, schnelle Tests.

## PHP-Backend

- **`Vertragsboard-PHP-Backend.zip`** ist der Serverteil, nicht der Client.
- Nur relevant, wenn ein **eigener Server** betrieben werden soll
  (siehe [Server-Backend / Installation](../server-backend/installation.md)).

## Was bringt der Web-Installer beim Update?

- Die eingebaute Auto-Update-Funktion des Clients zieht **Vertragsboard-WebSetup.exe**
  von GitHub, faellt bei Fehlen auf **Vertragsboard-Setup.exe** zurueck.
- Beide Installer sind Inno-Setup-basiert und schreiben ins User-Profil.
- Details unter [Updates](./updates.md).
