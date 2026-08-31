---
title: Uebersicht
sidebar_position: 1
---

# Betriebsmodi &ndash; Uebersicht

Vertragsboard kennt drei Betriebsmodi. Die Wahl wird beim Erstart im
Setup-Wizard getroffen und in `%APPDATA%\Vertragsboard\config.json`
gespeichert (`backend.kind`).

## Vergleichstabelle

| Aspekt | Standard-Server | Eigener Server | Lokal / OneDrive |
|---|---|---|---|
| Datenhaltung | zentral (MariaDB bei Nicolas) | eigenes Webhosting (MariaDB) | SQLite-Datei |
| Mehrbenutzerbetrieb | live, gleichzeitig | live, gleichzeitig | wechselnd (nicht gleichzeitig) |
| Kosten | mtl. Miete (mit Anbieter klaeren) | Webhosting-Kosten | keine |
| Setup-Aufwand Kunde | minimal (Login-Daten) | moderat (PHP-Hosting + Installer) | gering (Ordner waehlen) |
| Optionales Web-Portal | ja (durch Hoster verwaltet) | ja (selbst installieren) | nein |
| Auto-Update | ja | ja | ja |
| Backup | Hoster-Aufgabe | Hoster-Aufgabe (MySQL-Dump) | selbst (Datei kopieren) |

## Client-seitige Implementierung

Alle UI-Module programmieren gegen die abstrakte `Repo`-Schnittstelle
(`vertragsboard/backend/base.py`). Zwei konkrete Implementierungen:

- **`SqliteRepo`** &ndash; lokale SQLite-Datei. Schema-Migrationen laufen
  idempotent (`PRAGMA`-Check auf Spalten, dann `ALTER TABLE`).
- **`ApiRepo`** &ndash; HTTP-Client gegen das PHP-Backend, Bearer-Token
  wird zusaetzlich als `X-Auth-Token`-Header gesendet (Shared-Hoster-Fallback).

Die Factory `open_repo_from_config()` waehlt anhand von `BackendConfig.kind`
(`"local"` oder `"server"`).

## Wann welchen Modus waehlen?

**Standard-Server:** Ideal fuer kleine bis mittlere Kita-Traeger, die den
Server nicht selbst betreiben wollen. Setup ist ein Login-Vorgang.

**Eigener Server:** Datenschutz-Vorgaben verlangen "Hosting im
eigenen Rechenzentrum" oder "beim Hausdienstleister". Voraussetzung ist
PHP &ge; 7.4 mit PDO/MySQL &ndash; also Standard-Webhosting.

**Lokal / OneDrive:** Kleiner Traeger mit einer Person, oder mehrere
Personen, die nie gleichzeitig arbeiten und ihre Datei ueber OneDrive
synchronisieren.

## Wechsel zwischen Modi

Der Modus laesst sich nachtraeglich aendern, indem `config.json` unter
`%APPDATA%\Vertragsboard\` geloescht wird. Beim naechsten Start startet
der Setup-Wizard neu. **Wichtig:** Die Daten wandern **nicht automatisch**
zwischen Modi. Ein Wechsel von Lokal zu Server oder umgekehrt bedeutet:
Daten sind im alten Modus, muessen exportiert und neu eingespielt werden
&ndash; typischerweise per Excel-/CSV-Zwischenschritt.
