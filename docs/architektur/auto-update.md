---
title: Auto-Update
sidebar_position: 3
---

# Auto-Update

Vertragsboard prueft beim Start automatisch, ob eine neuere Version
verfuegbar ist. Der Update-Prozess laeuft ueber die GitHub-Releases-
API.

## Ablauf

1. **30 s nach App-Start** ruft `updater.py` die GitHub-API auf:
   ```
   GET https://api.github.com/repos/nicigrv/vertragsboard/releases/latest
   ```
2. Vergleich der Versionen (`config.VERSION` vs. `tag_name`).
3. Wenn eine neuere Version vorliegt: Toast unten rechts mit Button
   "Aktualisieren".
4. Klick startet Download der passenden Asset-Datei
   (`Vertragsboard-Setup-<version>.exe`).
5. Wrapper-Batch:
   - beendet den laufenden Vertragsboard-Prozess
   - wartet auf Prozess-Ende via `ping -n 3 127.0.0.1`
   - startet Setup.exe im `/S`-Silent-Mode
   - startet nach Erfolg Vertragsboard neu

## Kein Zwang

- Nutzer kann Toast wegklicken. Naechster Reminder am nachfolgenden Tag.
- Update laesst sich ueber **Extras &rarr; Nach Update suchen...**
  manuell anstossen.
- Deaktivieren: **Einstellungen &rarr; Auto-Update pruefen** ausschalten.

## Setup-Varianten

Zwei Installer-Assets pro Release:

| Datei | Zweck |
|---|---|
| `Vertragsboard-Setup-<v>.exe` | Full-Installer, ~80 MB |
| `Vertragsboard-WebSetup-<v>.exe` | Web-Installer, ~2 MB &ndash; laedt Rest zur Laufzeit |

Auto-Update nutzt den **Web-Setup**, wenn genug Bandbreite da ist &ndash;
sonst Full.

## Datei-Layout

- Installation: `C:\Program Files\Vertragsboard\`
- Nutzer-Daten: `%APPDATA%\Vertragsboard\`
- Log: `%APPDATA%\Vertragsboard\updater.log`

## Sicherheits-Aspekte

- **HTTPS-Only** zu GitHub-API und Download.
- **Digital-Signature-Check** des Setup: NSIS-Installer ist signiert;
  Windows SmartScreen prueft und meldet ggf. "vom Hersteller Nicolas
  Greulich".
- Kein Auto-Update-Server, den ein Angreifer uebernehmen koennte &ndash;
  nur GitHub-Releases.
- Aktualisierung erfolgt mit den Rechten des laufenden Nutzers &ndash;
  bei Windows-Installation "fuer alle Nutzer" fordert das UAC-Elevation.

## Wrapper-Batch (verkuerzt)

```batch
@echo off
taskkill /F /IM Vertragsboard.exe
ping -n 3 127.0.0.1 >nul
"%~dp0Setup.exe" /S
timeout /t 5
start "" "C:\Program Files\Vertragsboard\Vertragsboard.exe"
del "%~f0"
```

## Fehlerfaelle

- **GitHub-API 403 (Rate-Limit):** Silent-Retry am naechsten Tag.
- **Download unterbrochen:** partieller Setup wird geloescht, Nutzer
  bekommt Meldung "Update abgebrochen, spaeter erneut versuchen".
- **Setup-Fehler:** Log in `%APPDATA%\Vertragsboard\updater.log`.

## Rollback

Windows-Deinstallation der neuen Version + Neuinstallation der alten
&ndash; kein eingebauter Rollback. Die Datenbank-Struktur ist innerhalb
einer Major-Version stabil, also i. d. R. unproblematisch.

## Enterprise-Deployment

Fuer IT-Abteilungen, die Updates zentral steuern wollen:

- **Auto-Update abschalten** ueber GPO/Registry:
  `HKCU\Software\Vertragsboard\AutoUpdate = 0`
- Setup-Verteilung ueber SCCM / Intune / Chocolatey.
