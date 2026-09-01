---
title: Portal-Installation
sidebar_position: 2
---

# Portal-Installation

Das Portal liegt im Repo unter `php_backend/portal/` und wird zusammen
mit dem Backend deployed.

## Voraussetzungen

- Bereits laufendes [PHP-Backend](../server-backend/installation.md)
- Zusaetzlich: **PHP-Extension `openssl`** (fuer sichere Zufallszahlen
  und E-Mail-TLS)
- Optional: `mail`-Kommando oder eigener SMTP-Zugang fuer
  [Benachrichtigungen](./benachrichtigungen.md)

## Schritt 1 &mdash; Verzeichnis

Das Portal ist eine Unterverzeichnis-Instanz &ndash; typischerweise
unter `/portal/`:

```
/var/www/vertragsboard/
  api.php
  config.php
  schema.sql
  portal/
    index.php
    login.php
    templates/
    ...
```

## Schritt 2 &mdash; `config.php` erweitern

```php
// Portal aktivieren
define('PORTAL_ENABLED', true);
define('PORTAL_SECRET', '<64-zeichen-random>');    // openssl rand -hex 32
define('PORTAL_CRON_KEY', '<32-zeichen-random>');  // fuer /portal/cron.php

// Optional: SMTP
define('PORTAL_SMTP_HOST', 'smtp.example.com');
define('PORTAL_SMTP_PORT', 587);
define('PORTAL_SMTP_USER', 'noreply@example.com');
define('PORTAL_SMTP_PASS', '...');
define('PORTAL_SMTP_FROM', 'Vertragsboard <noreply@example.com>');
```

## Schritt 3 &mdash; Superadmin anlegen

Portal hat eine eigene Tabelle `vb_portal_users`.

```bash
php portal/tools/create_superadmin.php admin@example.com "sicheres passwort"
```

Ausgabe:

```
Superadmin admin@example.com angelegt.
```

## Schritt 4 &mdash; Webserver

### Apache

Portal-Ordner ist per Default zugreifbar unter
`https://backend.example.com/portal/`. Kein Zusatz noetig, wenn der
API-VHost passt.

### nginx

```nginx
location /portal/ {
    try_files $uri $uri/ /portal/index.php?$args;
}
```

## Schritt 5 &mdash; Cron

Fuer [Benachrichtigungen](./benachrichtigungen.md) wird ein
periodischer Job gebraucht &ndash; alle 5 Minuten:

```
*/5 * * * * curl -sSf "https://backend.example.com/portal/cron.php?key=<PORTAL_CRON_KEY>" >/dev/null
```

Alternativ direkt via CLI:

```
*/5 * * * * php /var/www/vertragsboard/portal/cron.php
```

## Schritt 6 &mdash; Anmelden

`https://backend.example.com/portal/` &rarr; Login mit dem
Superadmin-Account. Erste Aktion: einen Space anlegen und einen
ersten Nutzer dazu einladen.

## De-Installation

- `PORTAL_ENABLED` auf `false` &rarr; Portal-URL antwortet mit 404.
- Optional: `portal/`-Ordner loeschen und Portal-Tabellen
  (`vb_portal_*`) fallen lassen.
- API laeuft davon unabhaengig weiter.
