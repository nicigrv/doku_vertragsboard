---
title: Backend-Updates
sidebar_position: 4
---

# Backend-Updates

Das PHP-Backend hat einen deutlich langsameren Release-Zyklus als der
Client. Aber jeder Release enthaelt ggf. **Schema-Migrationen** &ndash;
lies das [Release-Log](https://github.com/nicigrv/vertragsboard/releases)
vor jedem Update.

## Ablauf

1. **Backup!** Datenbank + `config.php` sichern.
2. Neue Release-Version herunterladen (`vertragsboard-backend-<version>.zip`).
3. In ein Staging-Verzeichnis entpacken, `config.php` uebertragen.
4. **Migrations-SQL** einspielen (falls Release-Notes darauf hinweisen):
   ```bash
   mysql -u vertragsboard -p vertragsboard < migrations/<version>.sql
   ```
5. Staging in Produktions-Pfad tauschen (symlink flip).
6. Test: `curl https://backend.example.com/api.php?action=ping` &ndash;
   Version im JSON pruefen.

## Kompatibilitaets-Regeln

- **Server &ge; Client-Version** ist immer sicher.
- **Server &lt; Client-Version**: Client warnt beim Start und
  verweigert ggf. neue Actions (HTTP 501). Update also zuerst Server,
  dann Client-Rollout.
- Innerhalb einer Major-Version (1.x) sind die Actions
  abwaertskompatibel.

## Rollback

Wenn nach Update ein kritischer Fehler auftaucht:

1. Alten Backend-Code zurueckkopieren.
2. DB-Backup einspielen (nur wenn Migration Daten geaendert hat).
3. Fehler-Bericht an [Support](../support.md), mit `error_log`-Ausschnitt.

## Zero-Downtime?

Weder Client noch Server sind auf Zero-Downtime-Deployments getrimmt.
Kurzes Wartungsfenster (5&ndash;10 min) einplanen. Fuer die Zeit einen
Wartungs-Hinweis im Backend erzeugen &ndash; z. B. `api.php` durch
statisches JSON ersetzen:

```json
{"ok":false,"error":"maintenance","retry_after":600}
```

Der Client zeigt dem Nutzer eine passende Meldung an.

## Automatische Updates?

Kein Auto-Update fuer das Backend &ndash; anders als beim Client.
Grund: Server-Admins sollen die Kontrolle behalten und Wartungsfenster
selbst waehlen.
