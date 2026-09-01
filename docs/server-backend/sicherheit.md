---
title: Sicherheit
sidebar_position: 5
---

# Sicherheit

Das Backend verarbeitet personenbezogene Daten (Namen, Geburtstage,
Adressen). Ein paar Punkte zwingend beachten.

## Transport

- **Nur HTTPS.** Vertragsboard-Client blockiert http-URLs (Warnung im
  Setup-Wizard).
- Zertifikat via Let's Encrypt reicht &ndash; oder eigene CA, wenn im
  Intranet.
- HSTS-Header setzen:
  ```
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  ```

## Authentifizierung

- **Bearer-Token** aus Login (`?action=login`).
- Alternative: **X-Auth-Token**-Header (fuer Reverse-Proxies, die
  Authorization nicht durchreichen).
- TTL default 1 Stunde &ndash; danach 401, Client refreshet automatisch.

## Passwoerter

- Nur als **bcrypt-Hash** in `vb_users.pw_hash`.
- **Nie** im Klartext oder MD5 speichern.
- Passwort-Reset ausschliesslich durch Admin (kein E-Mail-basierter
  Self-Service).

## SQL-Injection

- Alle Queries verwenden **prepared statements** (PDO).
- Nie Nutzer-Eingaben in SQL zusammensetzen. Wer eigene Endpoints
  erweitert: strikt beim Muster bleiben.

## CORS

- Default `Access-Control-Allow-Origin: *` &ndash; **problematisch**,
  wenn das Backend im Internet steht.
- Fuer Produktion in `config.php`:
  ```php
  define('CORS_ORIGIN', 'https://portal.example.com');
  ```
- Der Vertragsboard-Client selbst hat keinen Origin-Header (Native App),
  ist also von CORS nicht betroffen.

## Datei-Zugriffe

- `config.php` **darf nicht** per HTTP erreichbar sein:
  ```
  location ~ ^/config\.php$ { deny all; }
  ```
- `.git`, `.env`, `schema.sql` ebenfalls sperren.

## Logging

- `error_log` zeigt Datenbank-Fehler und PHP-Warnungen.
- **Nicht** in Klartext ins Web-Verzeichnis loggen &ndash; ausserhalb
  `document_root` ablegen.
- Passwoerter und Tokens landen nie im Log (Framework filtert).

## Backup-Sicherheit

- Datenbank-Dumps enthalten alle Daten &ndash; **verschluesselt**
  aufbewahren (z. B. `gpg --symmetric`).
- Bei Offsite-Backup: Zugriff durch minimalen Personenkreis.

## Portal

Wenn das Web-Admin-Portal aktiv ist, gelten zusaetzliche
Anforderungen &ndash; siehe [Portal-Sicherheit](../portal/sicherheit.md).

## Empfohlene Basis-Massnahmen

- fail2ban auf `access_log` (bei > 10 fehlgeschlagenen Logins/Minute
  IP sperren)
- Firewall: nur 443 offen fuer die Welt, MariaDB nur lokal
- Regelmaessige Updates (PHP-Security, MariaDB-Patch-Level, Betriebssystem)
- Monitoring (Uptime + `error_log` grepen auf `FATAL`)
