---
title: Fehler-Codes
sidebar_position: 5
---

# Fehler-Codes

Jede Fehler-Antwort hat die Form:

```json
{ "ok": false, "error": "<code>", "message": "..." }
```

Der `error`-Wert ist ein Kurz-Bezeichner (stabil ueber Versionen). Die
`message` ist Deutsch/menschenlesbar und **nicht** stabil.

## HTTP-Status

- **200** &ndash; Erfolgs- und Bedingungsfehler (`invalid_credentials`,
  `not_found`, `conflict`)
- **401** &ndash; Auth fehlgeschlagen oder Token weg
- **403** &ndash; Rolle reicht nicht
- **404** &ndash; Route/Action unbekannt
- **409** &ndash; Optimistische Sperre (Konflikt)
- **500** &ndash; Interner Fehler
- **503** &ndash; Wartung / DB nicht erreichbar

## Uebersicht

| Code | HTTP | Wann |
|---|---|---|
| `invalid_credentials` | 401 | Kuerzel/Passwort falsch beim Login |
| `token_expired` | 401 | Bearer-Token abgelaufen |
| `token_invalid` | 401 | Signatur ungueltig oder Token widerrufen |
| `no_token` | 401 | Kein Auth-Header und Action erfordert Auth |
| `forbidden` | 403 | Rolle des Nutzers reicht nicht |
| `user_disabled` | 403 | Nutzer deaktiviert |
| `space_not_found` | 404 | `space_id` gibt es nicht |
| `not_found` | 404 | Vorgang, Nutzer, Unit, Step nicht gefunden |
| `unknown_action` | 404 | `action=xyz` gibt es nicht |
| `conflict` | 409 | `expected_updated_at` passt nicht (Konflikt-Dialog) |
| `weak_password` | 200 | Neues Passwort zu schwach |
| `wrong_password` | 200 | Altes Passwort falsch bei `password.change` |
| `validation` | 200 | Feld leer/zu lang/falsches Format |
| `db_error` | 500 | Datenbank-Fehler (siehe Backend-Log) |
| `internal` | 500 | Alles andere |
| `maintenance` | 503 | Wartungsfenster aktiv |

## Beispiel: Konflikt

**Request:**

```json
POST /api.php?action=update
{
  "id": 42,
  "expected_updated_at": "2026-08-30T09:12:00Z",
  "fields": { "email": "neu@example.com" }
}
```

**Response (409):**

```json
{
  "ok": false,
  "error": "conflict",
  "current": {
    "id": 42,
    "updated_at": "2026-08-30T14:22:11Z",
    "updated_by": "AB",
    "email": "andere@example.com",
    ...
  }
}
```

Der Client zeigt einen Merge-Dialog und laesst den Nutzer entscheiden,
welche Version bleibt.

## Beispiel: Validation

**Request:**

```json
{ "name": "" }
```

**Response:**

```json
{
  "ok": false,
  "error": "validation",
  "message": "Feld 'name' darf nicht leer sein",
  "field": "name"
}
```

## Beispiel: Rate-Limit

Kommt vom Webserver, nicht von `api.php`:

**HTTP 429:**

```
Retry-After: 30
```

Client wartet 30 s und versucht erneut.

## Client-Verhalten

- **401** &rarr; Setup-Wizard-Neuanmeldung anbieten.
- **403** &rarr; Aktion im UI ausgrauen, Nutzer informieren.
- **409** &rarr; Merge-Dialog.
- **500/503** &rarr; Retry mit Backoff (1, 2, 4, 8 s ...).
- **Netzwerkfehler** &rarr; Meldung "Server nicht erreichbar", Retry-Button.
