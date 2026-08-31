---
title: Updates
sidebar_position: 3
---

# Updates

Vertragsboard prueft **beim Start** automatisch auf neue Releases und
zeigt bei Bedarf einen Update-Dialog. Ueber das Menue laesst sich der
Check jederzeit manuell ausloesen.

## Wie funktioniert der Check?

1. Der Client fragt die GitHub-Releases-API ab:
   `https://api.github.com/repos/nicigrv/vertragsboard/releases/latest`.
2. Version aus `tag_name` wird geparst und per SemVer-Vergleich mit
   `__version__` in `vertragsboard/__init__.py` geprueft (z. B.
   `1.10.0 > 1.9.9`).
3. Bei einer neueren Version wird `Vertragsboard-WebSetup.exe`
   (Fallback `Vertragsboard-Setup.exe`) heruntergeladen.
4. Der Installer wird ueber ein Wrapper-Batch **detached** gestartet;
   der Wrapper wartet 5 Sekunden, damit die aktuelle Vertragsboard-EXE
   sicher geschlossen ist, bevor der Installer sie ueberschreibt.
5. Nach dem Update startet die neue Version.

## Update-Dialog

Vier klare Phasen:

1. **Meldung** &ndash; "Neue Version 1.2.3 verfuegbar" mit Release-Notes.
2. **Download** &ndash; Fortschritt in Byte/Prozent.
3. **Bereit** &ndash; "Installer bereit, jetzt schliessen und starten".
4. **Installer** &ndash; Wrapper laeuft, App beendet sich.

Buttons an jeder Stelle klar beschriftet, kein "automagisches" Handeln.
Failsafe: schlaegt der automatische Start fehl, kann der Nutzer den
Datei-Explorer mit dem Installer oeffnen und ihn manuell starten.

## Update ignorieren

Der Dialog bietet **"Diese Version ueberspringen"**. Der Client merkt
sich die Version in `%APPDATA%\Vertragsboard\config.json` unter dem Key
`ignored_update`. Naechster Check ueberspringt genau diese Version, aber
nicht spaetere Versionen.

Manuell zuruecksetzen: den Key aus der `config.json` entfernen oder ueber
das Menue "Nach Updates suchen" (haelt sich nicht an die Ignore-Liste).

## Update-Log

Alle relevanten Ereignisse werden in `%APPDATA%\Vertragsboard\update.log`
protokolliert:

```
2026-01-15T10:04:12  fetch_latest: https://api.github.com/...
2026-01-15T10:04:12  fetch_latest OK: tag=v1.2.3 asset=Vertragsboard-WebSetup.exe
2026-01-15T10:04:12  compare: remote=1.2.3 local=1.2.0
2026-01-15T10:04:20  download start: https://... -> C:\Users\...\Temp\...\Vertragsboard-WebSetup.exe
2026-01-15T10:04:35  download done: ... (12456789 bytes)
2026-01-15T10:04:35  wrapper written: ... (wait=5s)
2026-01-15T10:04:35  wrapper launched: ...
```

Nuetzlich zur Fehlersuche &ndash; bitte bei Support-Anfragen beifuegen.

## Update-Ordner

Heruntergeladene Installer liegen unter `%TEMP%\Vertragsboard-Updates\`.
Sie werden von Windows-Cleanup regelmaessig entfernt. Der Menuepunkt
**"Installer-Ordner oeffnen"** zeigt den neuesten Installer im
Explorer &ndash; nuetzlich, falls der Auto-Start scheitert.

## Autom. Check unterdruecken

Der Auto-Check laesst sich nicht komplett abschalten &ndash; er bricht
still ab, wenn kein Netzwerk verfuegbar oder die API nicht erreichbar
ist. Menuepunkt **"Nach Updates suchen"** meldet dagegen jede Diagnose
in der Statusleiste.

## Server-Update (PHP-Backend)

Aendert sich das PHP-Backend, muss der Server-Betreiber `install.php`
**einmal** aufrufen (idempotente Migration, danach loeschen/umbenennen).
Details siehe [Server-Backend / Updates](../server-backend/updates.md).
