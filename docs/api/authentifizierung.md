---
title: Authentifizierung
sidebar_position: 2
---

# Authentifizierung

Fast alle Actions brauchen eine gueltige Authentifizierung. Ausnahme:
`ping` (unauthenticated Health-Check).

## Login

**Action:** `login`

```json
POST /api.php?action=login
{
  "space_id": "default",
  "kuerzel": "NG",
  "password": "MeinPasswort"
}
```

Antwort (Erfolg):

```json
{
  "ok": true,
  "token": "eyJhbGciOi...",
  "user": {
    "kuerzel": "NG",
    "name": "Nicolas Greulich",
    "role": "admin"
  },
  "expires_at": "2026-09-01T13:00:00Z"
}
```

Antwort (Fehler):

```json
{ "ok": false, "error": "invalid_credentials" }
```

## Token verwenden

Zwei aequivalente Wege:

**Authorization-Header (empfohlen):**

```
Authorization: Bearer eyJhbGci...
```

**X-Auth-Token-Header (Fallback fuer Reverse-Proxies, die Authorization
strippen):**

```
X-Auth-Token: eyJhbGci...
```

## Token-Details

- **Format:** JWT-aehnlich, HMAC-SHA256, `PORTAL_SECRET` als Key.
- **TTL:** default 3600 s (`TOKEN_TTL` in `config.php`).
- **Nicht widerrufbar** einzeln &ndash; nur ueber `PORTAL_SECRET`-Rotation.
- **Nicht refreshbar** &ndash; nach Ablauf neu einloggen.

Der Client cached Token in `%APPDATA%\Vertragsboard\session.json` (nicht
verschluesselt &ndash; wer den lokalen Ordner lesen kann, kann sich einloggen).

## Logout

**Action:** `logout`

```
POST /api.php?action=logout
Authorization: Bearer ...
```

Antwort:

```json
{ "ok": true }
```

Serverseitig wird der Token in einer Blacklist (`vb_revoked_tokens`)
markiert &ndash; bis zum Ablauf. Damit lassen sich gestohlene Tokens
sofort abschalten.

## Passwort aendern

**Action:** `password.change`

```json
{
  "old_password": "AltesPW",
  "new_password": "NeuesPW"
}
```

- Bei Erfolg: `ok: true`, Token bleibt gueltig.
- Bei Fehler: `ok: false, error: "wrong_password" | "weak_password"`.

## Fehler-Codes im Auth-Kontext

| Code | HTTP | Bedeutung |
|---|---|---|
| `invalid_credentials` | 401 | Kuerzel/Passwort falsch |
| `token_expired` | 401 | Bearer-Token abgelaufen |
| `token_invalid` | 401 | Token-Signatur falsch |
| `space_not_found` | 404 | Space existiert nicht |
| `user_disabled` | 403 | Nutzer deaktiviert |
| `forbidden` | 403 | Rolle reicht fuer diese Action nicht |

Alle Fehler siehe [Fehler-Codes](./fehler.md).
