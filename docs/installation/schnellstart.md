---
title: Schnellstart
sidebar_position: 1
---

# Schnellstart

Die schnellste Variante fuer Endnutzer:innen: **Web-Installer laden,
ausfuehren, im Setup-Wizard "Standard-Server" waehlen und anmelden.**

## Voraussetzungen

- **Windows 11** (Windows 10 funktioniert erfahrungsgemaess auch, ist aber nicht Zielplattform).
- Fuer den **Server-Modus**: Zugang zu einer laufenden Instanz (Basis-URL + Login).
- Fuer den **Lokal-Modus**: OneDrive installiert und eingerichtet (wenn mehrere PCs den Datenordner teilen sollen).
- Keine Admin-Rechte noetig &ndash; der Installer installiert im User-Profil.

## In 3 Schritten

1. **Web-Installer laden** (klein, laedt die eigentliche EXE bei Bedarf nach):

   [Vertragsboard-Installer.zip](https://github.com/nicigrv/vertragsboard/releases/latest/download/Vertragsboard-Installer.zip)

2. **ZIP entpacken**, `Vertragsboard-WebSetup.exe` starten, Installation bestaetigen.

3. Bei der Erstinstallation startet der **Setup-Wizard**:
   - **Backend waehlen** &ndash; Standard-Server / Eigener Server / Lokal.
   - **Anmeldung / Ersteinrichtung** (je nach Modus unterschiedlich).
   - Fertig.

Danach oeffnet sich das Hauptfenster mit der Vorgangsliste.

## Wo liegen die Dateien nach der Installation?

| Bereich | Pfad |
|---|---|
| EXE (portable Kopie / Bundle) | `%LOCALAPPDATA%\Programs\Vertragsboard\Vertragsboard.exe` |
| Lokale Konfiguration | `%APPDATA%\Vertragsboard\config.json` |
| Update-Log | `%APPDATA%\Vertragsboard\update.log` |
| Ignorierte Update-Versionen | `%APPDATA%\Vertragsboard\config.json` (Key `ignored_update`) |
| Lokale SQLite-DB (nur Lokal-Modus) | konfigurierter Datenordner &rarr; `vertragsboard.db` |
| Update-Downloads | `%TEMP%\Vertragsboard-Updates\` |

## Erste Anmeldung

- **Standard-Server:** Basis-URL `https://backend.nicolasgreulich.de` ist vorbelegt. Zugangsdaten (Username + Passwort + Space-Code) erhaeltst du vom Betreiber.
- **Eigener Server:** Basis-URL des eigenen Backends eintragen (z. B. `https://mein-server.de/vertragsboard/`).
- **Lokal:** Datenordner waehlen (Vorschlag: `<OneDrive>\Vertragsboard`), Preset waehlen (Standard-Kita oder Leer), Admin-User anlegen.

## Weiter

- [Installer-Varianten](./installer-varianten.md) &ndash; Web- vs. Offline-Installer vs. portable EXE.
- [Betriebsmodi im Detail](../betriebsmodi/uebersicht.md).
- [Benutzerhandbuch](../benutzerhandbuch/erster-start.md).
