---
title: Betrieb & Monitoring
sidebar_position: 6
---

# Betrieb & Monitoring

Vertragsboard braucht kein aufwaendiges Ops-Setup, aber ein paar
Basics halten den Server verlaesslich.

## Health-Check

**Endpoint:** `?action=ping`

```json
{"ok": true, "version": "1.2.0"}
```

Nagios/Icinga/Uptime-Kuma anweisen, alle 60 s abzurufen. Antwortzeit
sollte &lt; 200 ms sein.

## Logs

| Log | Wo | Was steht drin |
|---|---|---|
| Apache/nginx access | `/var/log/{apache2,nginx}/vertragsboard-access.log` | HTTP-Anfragen (IP, Action, Status, ms) |
| PHP-Fehler | `/var/log/php-fpm/error.log` oder `error_log`-Direktive | Syntaxfehler, PDO-Exceptions |
| MariaDB slow | `/var/log/mysql/slow.log` (aktivieren) | Queries > 1 s |

Sinnvoll: `access.log` nach `HTTP 5xx` grepen und alerten.

## Praesenz aufraeumen

Die Tabelle `vb_presence` waechst, wenn Clients ohne sauberes Logout
verschwinden. Aufraeumen via SQL-Cronjob (taeglich, 4 Uhr):

```sql
DELETE FROM vb_presence
 WHERE last_beat < DATE_SUB(NOW(), INTERVAL 1 DAY);
```

## Aktivitaetslog ausduennen

Standard-Empfehlung: 6 Monate Retention. Cronjob:

```sql
DELETE FROM vb_activity
 WHERE at < DATE_SUB(NOW(), INTERVAL 180 DAY);
```

## Datenbank-Groesse

Grobe Richtwerte (Erfahrung aus Bonifatius-Instanz):

| Anzahl Vorgaenge | DB-Groesse |
|---:|---:|
| 100 | ~10 MB |
| 1 000 | ~50 MB |
| 10 000 | ~500 MB |

Wichtigste Tabellen: `vb_vorgaenge`, `vb_activity` &ndash; letzteres
waechst am schnellsten.

## Backup-Zyklus

Siehe auch [Backup & Restore](../administration/backup.md). Kurzform:

- **Nightly Dump** via `mysqldump`, `gzip`, off-site.
- **Retention:** 7 tages-, 4 wochen-, 3 monats-Snapshots.
- **Restore-Test** alle 3&ndash;6 Monate.

## Wartungsfenster

Wartungsarbeiten kuendigen: `api.php` durch statisches JSON tauschen,
Client zeigt Meldung. Details: [Updates](./updates.md).

## Skalierung

Vertragsboard skaliert bis in den unteren 4-stelligen Vorgangs-Bereich
auf einer kleinen VM problemlos. Ab da:

- Slow-Query-Log pruefen, ggf. Indexe (`vb_vorgaenge.name`, `.updated_at`).
- PHP-FPM Pool-Groessen erhoehen (`pm.max_children`).
- Cache-Header fuer `?action=list` &ndash; aktuell **nicht** implementiert
  (Feature-Request).

Fuer &gt; 10 000 Vorgaenge oder &gt; 50 gleichzeitige Nutzer: bitte
[Support](../support.md) fragen, da nicht getestet.
