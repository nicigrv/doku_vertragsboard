---
title: Backup & Restore
sidebar_position: 8
---

# Backup & Restore

Vertragsboard bietet einen einfachen **JSON-Export** aller Vorgaenge
eines Space. Fuer richtiges Server-Backup gehoert zusaetzlich der
Datenbank-Dump dazu.

## Manueller JSON-Export

- Admin-Dashboard &rarr; Tab "Backup / Export" &rarr; **Export als JSON...**
- Zielpfad waehlen (Standard: `Vertragsboard-Backup-<Space>-<YYYYMMDD>.json`)
- Enthaelt: Vorgaenge (Aktiv + Archiv), Steps, Stammdaten, Warnungen,
  Kommentare, Space-Konfiguration.
- **Nicht** enthalten: Aktivitaetslog, Presence, Nutzer/Passwoerter.

## Restore

- Admin-Dashboard &rarr; Tab "Backup / Export" &rarr; **Import aus JSON...**
- Ueberschreibt **die aktuellen** Vorgaenge des Space (mit Rueckfrage).
- **Nicht** merge &ndash; wer nur einzelne Vorgaenge importieren will,
  bearbeitet die JSON-Datei per Hand.

:::warning
Restore ist zerstoerend. Am besten vorher einen aktuellen Export
erzeugen und weglegen.
:::

## Datenbank-Backup (empfohlen)

Der JSON-Export ist gut fuer Migration und schnelle Sicherung, aber
kein vollstaendiges Backup. Fuer Produktivbetrieb zusaetzlich:

### Lokal-Modus

- Datei `vertragsboard.db` sichern (im Daten-Verzeichnis, siehe
  [Lokal/OneDrive](../betriebsmodi/lokal-onedrive.md))
- Am besten mit **Versionierung** (OneDrive-Verlauf, tools wie
  restic/borg).

### Server-Modus (MariaDB)

Nightly Dump via Cron:

```bash
mysqldump -u vertragsboard -p<pass> vertragsboard \
  | gzip > /var/backups/vertragsboard-$(date +%F).sql.gz
```

Aeltere Dumps automatisch aufraeumen:

```bash
find /var/backups -name 'vertragsboard-*.sql.gz' -mtime +30 -delete
```

Empfohlener Retention-Zyklus: 7 tages-, 4 wochen-, 3 monats-Backups.

## Was gehoert alles zum Backup?

| Komponente | Wo |
|---|---|
| Vorgangs-Daten | DB (`vb_vorgaenge`, `vb_steps`, `vb_notes`) |
| Space-Konfig | DB (`vb_space_config`, `vb_units`) |
| Nutzer | DB (`vb_users`) |
| Aktivitaetslog | DB (`vb_activity`) |
| Vertragsauftrag-Vorlagen | Repo/Installation (unveraenderlich, kein Backup noetig) |
| App-Einstellungen (client-seitig) | `%APPDATA%\Vertragsboard\settings.json` (pro Nutzer, i. d. R. nicht kritisch) |

## Restore-Test

Regelmaessig testen &ndash; ein Backup, das nie zurueckgespielt wurde,
ist kein Backup. Vorschlag: alle 3&ndash;6 Monate den letzten Dump in
eine Test-DB einspielen und mit dem Client aufrufen.
