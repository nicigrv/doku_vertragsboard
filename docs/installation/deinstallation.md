---
title: Deinstallation
sidebar_position: 4
---

# Deinstallation

Vertragsboard wird abhaengig von der Installations-Variante entfernt.

## Ueber Windows-Einstellungen

Wenn der **Web-** oder **Offline-Installer** verwendet wurde, taucht
"Vertragsboard" unter *Einstellungen &rarr; Apps &rarr; Installierte Apps*
auf. Standard-Deinstallation ueber den entsprechenden Button.

Der Inno-Setup-Uninstaller entfernt:

- Programm-Dateien unter `%LOCALAPPDATA%\Programs\Vertragsboard\`
- Startmenue-Verknuepfungen
- Desktop-Verknuepfung (falls angelegt)

## Portable EXE

Einfach die `Vertragsboard.exe` loeschen. Es gibt keinen Registry-Eintrag.

## Nutzerdaten manuell entfernen

Der Uninstaller laesst **Nutzerdaten absichtlich stehen**, damit eine
Neuinstallation nicht die Konfiguration verliert. Um wirklich alles zu
entfernen:

| Verzeichnis | Inhalt |
|---|---|
| `%APPDATA%\Vertragsboard\` | `config.json`, `update.log`, Ignore-Liste |
| `%TEMP%\Vertragsboard-Updates\` | zwischengespeicherte Installer |
| konfigurierter Datenordner (Lokal-Modus) | `vertragsboard.db`, `vertragsboard.lock`, `settings.json` |

Kommandozeile:

```bash
rmdir /s /q "%APPDATA%\Vertragsboard"
rmdir /s /q "%TEMP%\Vertragsboard-Updates"
```

## Server-seitige Daten

Bei Server-Betrieb (Standard oder eigen) bleiben Vorgaenge in der
MariaDB des Servers unabhaengig davon, ob Clients deinstalliert werden.
Zum vollstaendigen Entfernen: DB per Webhoster-Backend loeschen und
`api.php`, `install.php`, `schema.sql`, `portal/` per FTP entfernen.
