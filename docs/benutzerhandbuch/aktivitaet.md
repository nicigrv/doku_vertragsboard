---
title: Aktivitaetsprotokoll
sidebar_position: 10
---

# Aktivitaetsprotokoll

Jede relevante Aenderung im System wird in einem **Aktivitaets-Log**
protokolliert. So laesst sich nachvollziehen, wer wann welchen Vorgang
angelegt, geaendert, geloescht oder verschoben hat.

## Aufrufen

- **Extras &rarr; Aktivitaetsprotokoll...**
- Dialog mit sortierter Liste (neueste oben).
- Standard-Limit: 500 Zeilen. Aeltere Eintraege koennen per Menue
  nachgeladen werden.

## Ereignis-Arten (`kind`)

| Kind | Bedeutung |
|---|---|
| `vorgang.create` | Neuer Vorgang angelegt |
| `vorgang.update` | Vorgangsdaten oder Steps aktualisiert |
| `vorgang.delete` | Vorgang geloescht |
| `vorgang.move` | Bereich gewechselt (Aktiv &harr; Archiv) |
| `step.toggle` | Prozessschritt via Klick auf Statuspunkt geaendert |
| `step.note` | Warnung/Notiz an einem Step gesetzt/geloescht |
| `user.create` | Neuer Benutzer angelegt |
| `user.delete` | Benutzer geloescht |
| `config.save` | Space-Konfiguration geaendert (Admin-Dashboard) |
| `login`/`logout` | Anmeldung/Abmeldung (nur Server-Modus) |

## Felder

| Feld | Bedeutung |
|---|---|
| `at` | Zeitstempel (ISO) |
| `by` | Kuerzel des Nutzers |
| `kind` | siehe oben |
| `vorgang_id` | ID (falls Bezug zu einem Vorgang) |
| `description` | Freier Kurztext, z. B. `"Mustermann, Erika - MAV informieren am 18.08.2026"` |

## Wo landen die Eintraege?

- **Server-Modus:** Tabelle `vb_activity` in MariaDB.
- **Lokal-Modus:** Tabelle `vb_activity` in `vertragsboard.db`.

## Ausduennen

`clear_activity_older_than(days)` (im Repo) loescht Eintraege aelter
als N Tage. Fuer SQLite ist die Methode implementiert; auf dem Server
laesst sich das per Cronjob abfangen:

```sql
DELETE FROM vb_activity WHERE at < DATE_SUB(NOW(), INTERVAL 180 DAY);
```

## Datenschutz

Das Log enthaelt Klartext-Beschreibungen ("Mustermann, Erika ..."). Also
personenbezogen &ndash; entsprechend beim DSGVO-Konzept beruecksichtigen.
Loesch-Fristen sinnvoll ansetzen (z. B. 6 oder 12 Monate).
