---
title: Eigener Server
sidebar_position: 3
---

# Eigener Server (PHP + MariaDB)

Wer die Datenhoheit behalten will oder besondere Datenschutz-Vorgaben
umsetzen muss, betreibt das PHP-Backend selbst. Es laeuft auf jedem
Standard-Webhosting (cPanel, Plesk, uberspace, Hosteurope, ...).

## Zutaten

- **Webhosting** mit PHP &ge; 7.4 (PDO/MySQL, Argon2 empfohlen).
- **MariaDB / MySQL** &ge; 5.7 mit `utf8mb4`.
- **HTTPS** (Let's Encrypt reicht) &ndash; Tokens gehen ueber die Leitung.
- Zugang per FTP/SFTP oder Datei-Manager.

## Ablauf in Kurzform

1. `Vertragsboard-PHP-Backend.zip` von der [Release-Seite](https://github.com/nicigrv/vertragsboard/releases/latest) laden.
2. Inhalt in ein Verzeichnis unter dem DocumentRoot entpacken, z. B. `public_html/vertragsboard/`.
3. Neue MariaDB-DB + Benutzer anlegen.
4. `config.example.php` nach `config.php` kopieren, Zugangsdaten eintragen.
5. `https://<dein-server>/vertragsboard/install.php` im Browser oeffnen.
6. Schema anlegen, ersten Admin + Space anlegen, `install.php` loeschen/umbenennen.
7. Im Client "Eigener Server" waehlen und Basis-URL eintragen.

Detaillierte Schritt-fuer-Schritt-Anleitung mit allen Optionen:
[Server-Backend / Installation](../server-backend/installation.md).

## Was du bekommst

- **Volle Kontrolle** ueber Daten und Backups.
- **Optionales Web-Admin-Portal** unter `/vertragsboard/portal/`
  (siehe [Portal](../portal/uebersicht.md)).
- Automatische Datenbank-Migrationen ueber `install.php` beim Updaten.

## Was du dafuer machen musst

- **Backups** &ndash; MySQL-Dump per Cronjob, Standard-Webhoster-Feature.
- **Updates einspielen** &ndash; `.zip` neu hochladen, `install.php` einmal
  aufrufen, wieder loeschen.
- **SSL im Blick behalten** &ndash; Let's Encrypt verlaengert sich meist
  selbst; trotzdem im Auge behalten.
- **Log-Files** im Blick &ndash; `error_log` des Webhosters bei
  Problemen.

## Multi-Tenancy

Die Datenbank ist so aufgebaut, dass **mehrere Spaces** parallel
liegen koennen (Spalte `space_id`). Beim eigenen Server ist typischerweise
**ein Space** genug &ndash; der Space-Code ist dann `default`.

Wer selbst Kunden hosten will, kann `ALLOW_REGISTRATION = true` in
`config.php` setzen. Dann duerfen Clients ueber `space.register` neue
Spaces anlegen (siehe [API / Endpoints](../api/endpoints.md)).

## Portal aktivieren

Das Web-Portal ist im PHP-Backend-Paket enthalten. Setup in Kurzform:

```php
// config.php erweitern:
define('PORTAL_BASE_URL', 'https://backend.example.com');
define('PORTAL_SECRET',   bin2hex(random_bytes(32)));
define('PORTAL_CRON_KEY', bin2hex(random_bytes(16)));
define('MAIL_FROM',       'no-reply@example.com');
define('MAIL_TRANSPORT',  'mail');
```

Dann `install.php` erneut aufrufen &ndash; die Portal-Tabellen werden
idempotent angelegt. Details unter [Portal / Installation](../portal/installation.md).
