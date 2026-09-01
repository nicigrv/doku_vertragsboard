---
title: Objekte
sidebar_position: 4
---

# API-Objekte

Struktur der zentralen JSON-Objekte, die die API zurueckliefert bzw.
erwartet.

## Vorgang

```json
{
  "id": 42,
  "space_id": "default",
  "area": "active",

  "name": "Mustermann, Erika",
  "kita": 3,
  "art": "Arbeitsvertrag",
  "funktion": "Erzieherin",
  "beginn": "2026-09-01",
  "bu": "39/39",

  "email": "erika@example.com",
  "telefon": "01234-56789",
  "adresse": "Beispielweg 1",
  "plz": "12345",
  "ort": "Musterstadt",
  "geburtstag": "1990-05-14",
  "konfession": "rk",
  "geschlecht": "w",
  "befristung": null,
  "notiz": "",

  "kommentar": "Ansprechpartner: Frau X",

  "steps": [
    {
      "index": 0,
      "label": "Vertrag angefordert",
      "value": true,
      "date": "2026-08-15",
      "by": "NG",
      "note": ""
    },
    ...
  ],

  "created_at": "2026-08-15T09:12:00Z",
  "created_by": "NG",
  "updated_at": "2026-08-30T14:22:11Z",
  "updated_by": "NG"
}
```

## Step

```json
{
  "index": 3,
  "label": "MAV informieren",
  "value": true,
  "date": "2026-08-18",
  "by": "NG",
  "note": "Ausdruck fehlt noch"
}
```

- `index`: 0-basiert, folgt Reihenfolge in Space-Config.
- `value`: `true` = Schritt erledigt, `false` = offen.
- `date`: gesetzt bei `value=true`.
- `by`: Kuerzel des Nutzers, der zuletzt umgeschaltet hat.
- `note`: Freitext, leer = keine Warnung.

## User

```json
{
  "kuerzel": "NG",
  "name": "Nicolas Greulich",
  "role": "admin",
  "active": true,
  "created_at": "2026-01-01T00:00:00Z"
}
```

Kein Passwort-Hash in API-Antworten &ndash; nie.

## Unit (Kita)

```json
{
  "id": 3,
  "name": "St. Marien Kita",
  "short": "MAR",
  "active": true
}
```

## Space-Config

```json
{
  "org_name": "Bonifatius Traeger",
  "org_logo": "data:image/png;base64,...",
  "steps": [
    { "label": "Vertrag angefordert", "active": true },
    ...
  ],
  "units": [ <Unit>, ... ],
  "arten": [ "Arbeitsvertrag", "AV", "PIA", ... ],
  "stammdaten": {
    "email": true, "telefon": false, "adresse": false,
    "plz": false, "ort": false, "geburtstag": true,
    "konfession": true, "geschlecht": true,
    "befristung": false, "notiz": true
  }
}
```

## Activity-Eintrag

```json
{
  "at": "2026-08-30T14:22:11Z",
  "by": "NG",
  "kind": "vorgang.update",
  "vorgang_id": 42,
  "description": "Mustermann, Erika - E-Mail geaendert"
}
```

## Presence-Eintrag

```json
{
  "kuerzel": "NG",
  "name": "Nicolas Greulich",
  "host": "PC-NG-01",
  "login_at": "2026-09-01T08:00:00Z",
  "last_beat": "2026-09-01T09:12:03Z"
}
```
