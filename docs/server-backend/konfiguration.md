---
title: Konfiguration
sidebar_position: 3
---

# Backend-Konfiguration

Alle Einstellungen liegen in `config.php`. Datei ist **nicht** unter
Versionskontrolle &ndash; kopiere `config.example.php` und passe an.

## Pflicht-Konstanten

| Konstante | Zweck |
|---|---|
| `DB_HOST` | Hostname der DB (meist `localhost`) |
| `DB_NAME` | Datenbank-Name |
| `DB_USER` | DB-User |
| `DB_PASS` | DB-Passwort |

## Optionale Konstanten

| Konstante | Default | Zweck |
|---|---|---|
| `PRESENCE_STALE_SECONDS` | `300` | Nach wie viel Sekunden ohne Herzschlag ein Nutzer aus Praesenz fliegt |
| `CORS_ORIGIN` | `*` | `Access-Control-Allow-Origin`-Header. Fuer Produktion Domain eintragen |
| `TOKEN_TTL` | `3600` | Sekunden bis Bearer-Token ablaeuft |
| `ACTIVITY_MAX_ROWS` | `500` | Standard-Limit fuer Aktivitaets-Endpoint |
| `LOG_ERRORS_TO` | `error_log` | Alternative Log-Datei |
| `PORTAL_SECRET` | (leer) | Notwendig, wenn Portal aktiv &ndash; siehe [Portal-Installation](../portal/installation.md) |
| `PORTAL_CRON_KEY` | (leer) | Shared-Secret fuer Cron-Aufrufe (Portal) |

## Datei-Berechtigungen

```bash
chown www-data:www-data /var/www/vertragsboard
chmod 750 /var/www/vertragsboard
chmod 640 /var/www/vertragsboard/config.php
```

Ziel: `config.php` **nicht** lesbar fuer andere User &ndash; sonst
liegt das DB-Passwort offen.

## Zeitzone

Die DB speichert alle `at`-Zeitstempel in **UTC** (bzw. `CURRENT_TIMESTAMP`
des DB-Servers). Der Client rechnet auf Lokal-Zeit um. Empfohlen:
DB-Server explizit auf `+00:00` einstellen, damit auch bei
Server-Umzuegen keine Diskrepanz entsteht:

```sql
SET GLOBAL time_zone = '+00:00';
```

## Character-Set

Alle Tabellen `utf8mb4` mit `utf8mb4_unicode_ci`. Bei Migration aus
alteren Systemen zwingend pruefen &ndash; sonst gibt es Aerger mit
Umlauten und Emoji-Namen.

## Debug-Modus

Fuer Fehlersuche waehrend Installation:

```php
define('DEBUG', true);
```

Bewirkt: `error_reporting(E_ALL)`, Stack-Traces in HTTP-Fehlern.
**Nur temporaer** &ndash; im Produktivbetrieb aus.

## Rate-Limits

Aktuell kein eigenes Rate-Limiting in `api.php`. Vorschlag:
`mod_evasive` (Apache) oder `limit_req_zone` (nginx) auf
`/api.php?action=login`.
