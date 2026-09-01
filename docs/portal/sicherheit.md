---
title: Portal-Sicherheit
sidebar_position: 5
---

# Portal-Sicherheit

Das Portal ist der **empfindlichste** Teil der Vertragsboard-
Infrastruktur &ndash; wer hier reinkommt, sieht alle Spaces und
Nutzer. Entsprechend absichern.

## HTTPS und HSTS

- Ausnahmslos HTTPS &ndash; siehe [Backend-Sicherheit](../server-backend/sicherheit.md).
- HSTS setzen.
- Portal-URL nur intern erreichbar? Dann per Firewall auf `10.0.0.0/8`
  oder VPN-Netz einschraenken.

## Sessions

- Cookie-Flags: `HttpOnly`, `Secure`, `SameSite=Strict`.
- Session-TTL: 4 h idle-Timeout, danach Re-Login.
- Session-Speicher: Server-seitig (nicht Client-Cookie mit Payload).

## PORTAL_SECRET

- **64 Zeichen zufaellig**, in `config.php`.
- Wird fuer Session-Signatur und CSRF-Token benutzt.
- Bei Rotation: alle Sessions werden invalidiert &ndash; im
  Wartungsfenster einplanen.

## PORTAL_CRON_KEY

- Shared-Secret fuer `cron.php`-Aufrufe.
- Nur in Cron-Kommandos einsetzen, nie in URL-Logs oder Chat-Nachrichten.

## Login-Schutz

- Aktuell **kein** eigenes Rate-Limit &ndash; siehe
  [Server-Sicherheit](../server-backend/sicherheit.md) fuer
  Nginx/Apache-Vorschlaege.
- Empfohlen: fail2ban-Filter auf `POST /portal/login.php` und
  Response-Code 401.

## Passwoerter

- bcrypt via `password_hash()`.
- Rotieren nicht erzwungen &ndash; aber bei Zwischenfall sofort.

## Zwei-Faktor?

Aktuell kein 2FA-Support. Feature-Request offen. Workaround: Portal
nur ueber VPN erreichbar machen, VPN mit 2FA.

## Audit-Log

Portal fuehrt eigenes Audit-Log in `vb_portal_activity`:

| Kind | Bedeutung |
|---|---|
| `portal.login` | Erfolgreicher Login |
| `portal.login.fail` | Fehlschlag |
| `portal.impersonate.start` / `.stop` | Impersonate-Session |
| `portal.user.create` / `.delete` | Nutzer-Verwaltung |
| `portal.space.create` / `.delete` | Space-Verwaltung |

Log wird **nicht** automatisch geleert &ndash; Retention manuell.

## Backup-Isolation

Portal-Tabellen liegen in derselben DB wie das Backend
(`vb_portal_*`-Prefix). Damit gilt: DB-Backup enthaelt Portal-Daten
mit &ndash; Verschluesselung ist Pflicht.

## Zugriffs-Whitelist

Optional in `config.php`:

```php
define('PORTAL_IP_WHITELIST', '10.0.0.0/8,192.168.0.0/16');
```

Dann verwirft das Portal alle Requests ausserhalb dieser Bereiche
sofort (HTTP 403). Praktisch fuer Hoster mit eigenem
Management-Netz.
