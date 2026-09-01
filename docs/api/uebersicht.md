---
title: Uebersicht
sidebar_position: 1
---

# HTTP-API Uebersicht

Der PHP-Backend bietet eine **JSON-HTTP-API**, die der Vertragsboard-
Client anspricht. Sie ist auch fuer Skripte und Drittsysteme
verfuegbar.

## Endpoint

Ein einzelnes Skript: `api.php`. Die Action wird per Query-Parameter
gewaehlt:

```
POST https://backend.example.com/api.php?action=list
```

## Konventionen

- **Alle Bodys** sind JSON (`Content-Type: application/json`).
- **Alle Antworten** haben das Feld `ok: true|false`.
- **HTTP-Methoden** meist `POST`, ausser `ping` (`GET`).
- **Authentifizierung** via Bearer-Token (siehe [Authentifizierung](./authentifizierung.md)).
- **Zeichensatz** durchgehend UTF-8.
- **Zeitstempel** ISO-8601 UTC (`YYYY-MM-DDTHH:MM:SSZ`).

## Beispiel-Aufruf

```bash
curl -X POST https://backend.example.com/api.php?action=list \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"space_id":"default","area":"active"}'
```

Antwort:

```json
{
  "ok": true,
  "vorgaenge": [
    { "id": 42, "name": "Mustermann, Erika", ... }
  ]
}
```

## Versionierung

- Aktuelle Version in `?action=ping` sichtbar.
- Innerhalb einer Major-Version (1.x) sind Actions
  abwaertskompatibel &ndash; neue optionale Felder koennen dazukommen.
- Breaking Changes werden im Release-Log klar dokumentiert.

## Rate-Limits

Kein Server-seitiges Rate-Limit &ndash; verlaesse dich auf den Webserver
(nginx/Apache). Client wartet nach `429`-Response mit exponentiellem
Backoff.

## Detailseiten

- [Authentifizierung](./authentifizierung.md)
- [Endpoints](./endpoints.md)
- [Objekte](./objekte.md)
- [Fehler-Codes](./fehler.md)
- [Datenmodell](./datenmodell.md)
