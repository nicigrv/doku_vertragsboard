---
title: Endpoints
sidebar_position: 3
---

# API-Endpoints

Alle Endpoints erreichbar via `POST /api.php?action=<name>` (Ausnahme:
`ping` per `GET`). Body ist JSON. Authentifizierung siehe
[Authentifizierung](./authentifizierung.md).

## System

### `ping`

Health-Check, kein Auth.

**Request:** `GET /api.php?action=ping`

**Response:**

```json
{ "ok": true, "version": "1.2.0" }
```

### `whoami`

Wer bin ich (Token-Info)?

**Response:**

```json
{
  "ok": true,
  "user": { "kuerzel": "NG", "name": "...", "role": "admin" },
  "space_id": "default"
}
```

## Vorgaenge

### `list`

Alle Vorgaenge eines Bereichs.

**Request:**

```json
{ "space_id": "default", "area": "active" }
```

`area`: `"active"` oder `"archive"`.

**Response:**

```json
{
  "ok": true,
  "vorgaenge": [ <Vorgang>, ... ]
}
```

### `get`

Einzelnen Vorgang laden.

**Request:** `{"id": 42}`

**Response:** `{"ok": true, "vorgang": <Vorgang>}`

### `create`

Neuen Vorgang anlegen.

**Request:**

```json
{
  "space_id": "default",
  "name": "Mustermann, Erika",
  "kita": 3,
  "art": "Arbeitsvertrag",
  ...
}
```

**Response:** `{"ok": true, "id": 43}`

### `update`

Vorgang aktualisieren.

**Request:**

```json
{
  "id": 42,
  "expected_updated_at": "2026-08-30T09:12:00Z",
  "fields": { "email": "erika@example.com" }
}
```

Bei Konflikt (`expected_updated_at` passt nicht):
`{"ok": false, "error": "conflict", "current": <Vorgang>}` (HTTP 409).

### `delete`

Vorgang loeschen.

**Request:** `{"id": 42, "expected_updated_at": "..."}`

### `move`

Bereich wechseln (Aktiv &harr; Archiv).

**Request:** `{"id": 42, "area": "archive"}`

## Steps

### `step.toggle`

Statuspunkt umschalten (setzt/loescht Datum).

**Request:**

```json
{ "vorgang_id": 42, "step_index": 3, "value": true }
```

### `step.note`

Warnung/Notiz an einem Step.

**Request:**

```json
{ "vorgang_id": 42, "step_index": 3, "note": "..." }
```

Leerer `note` loescht die Notiz.

## Konfiguration

### `config.get`

Space-Konfiguration abrufen.

**Response:**

```json
{
  "ok": true,
  "config": {
    "org_name": "...", "org_logo": "base64...",
    "steps": [ ... ],
    "units": [ ... ],
    "arten": [ ... ],
    "stammdaten": { "email": true, ... }
  }
}
```

### `config.save`

Konfiguration speichern (nur Admin).

**Request:** vollstaendiges Config-Objekt.

## Nutzer

### `users.list`, `users.create`, `users.update`, `users.delete`

Verwaltung Space-Nutzer. Nur Admin.

## Praesenz

### `presence.beat`

Herzschlag setzen. Vom Client alle 60 s.

**Request:** `{"host": "PC-NG-01"}`

### `presence`

Aktuelle Online-Liste.

## Aktivitaet

### `activity`

Aktivitaetslog abrufen.

**Request:**

```json
{ "limit": 500, "before": "2026-09-01T00:00:00Z" }
```

## Fehler

Siehe [Fehler-Codes](./fehler.md).
