---
title: Einheiten (Kitas)
sidebar_position: 3
---

# Einheiten

**Einheiten** sind die untergeordneten Standorte oder Betriebe der
Organisation &ndash; bei Kita-Traegern also die einzelnen Kitas.

## Felder

| Feld | Bedeutung |
|---|---|
| **Name** | Anzeige-Name, z. B. "St. Marien Kita" |
| **Kuerzel** | Kurz-ID fuer Combobox und PDF, z. B. "MAR" |
| **Adresse** | optional, aktuell nur intern |
| **Aktiv** | Checkbox &ndash; inaktive Einheiten erscheinen nicht mehr in Neu-Anlegen-Dialog |

## Anlegen

- Admin-Dashboard &rarr; Tab "Einheiten" &rarr; **Neu**
- Neue Einheit steht sofort in der Combobox jedes Vorgangs zur Auswahl.

## Umbenennen

- Doppelklick auf die Zeile, Name/Kuerzel editieren, Speichern.
- Bestehende Vorgaenge behalten den **neuen** Namen (Verknuepfung ueber
  interne ID, nicht Text).

## Deaktivieren

- Checkbox "Aktiv" abwaehlen &rarr; Einheit verschwindet aus dem
  Neu-Dialog, bleibt aber bei bestehenden Vorgaengen weiterhin
  angezeigt.

## Loeschen

- Nur moeglich, wenn **kein** Vorgang mehr auf die Einheit verweist.
- Bei Referenzen: erst betroffene Vorgaenge in andere Einheit
  umhaengen (im Vorgangs-Detail Combobox), dann loeschen.

## Import / Massen-Anlage

Kein UI &ndash; wer viele Einheiten hat, kann direkt in der DB einspielen:

**SQLite (Lokal-Modus):**

```sql
INSERT INTO vb_units (space_id, name, short, active)
VALUES ('default', 'St. Josef', 'JOS', 1);
```

**MariaDB (Server-Modus):**

```sql
INSERT INTO vb_units (space_id, name, short, active)
VALUES ('default', 'St. Josef', 'JOS', 1);
```

Nach Import einmal den Client neu starten (Cache-Refresh).
