---
title: Stammdaten
sidebar_position: 5
---

# Stammdaten

Pro Vorgang koennen bis zu zehn Stammdaten-Felder gepflegt werden.
Welche davon **sichtbar** sein sollen, entscheidet der Admin pro Space
(siehe [Stammdaten-Felder](../administration/stammdaten-felder.md)).

## Verfuegbare Felder

| Key | Feld | Format | Hinweis |
|---|---|---|---|
| `email` | E-Mail | max. 120 Zeichen | Freitext, keine Validierung |
| `telefon` | Telefon | max. 120 Zeichen | Freitext |
| `adresse` | Adresse | max. 200 Zeichen | Strasse + Hausnummer |
| `plz` | PLZ | max. 20 Zeichen | |
| `ort` | Ort | max. 120 Zeichen | |
| `geburtstag` | Geburtstag | Datum (ISO oder TT.MM.JJJJ) | |
| `konfession` | Konfession | Freitext | Nur wenn Admin aktiv |
| `geschlecht` | Geschlecht | Combobox | Optionen aus `GESCHLECHT_OPTIONS` |
| `befristung` | Befristung | Freitext | z. B. Enddatum |
| `stammdaten_notiz` | Notiz | max. 2000 Zeichen | Freitext, mehrzeilig |

## Anzeige im Detail-Panel

- Tab **Vertragsdaten** &rarr; Sektion **STAMMDATEN** unter den Vertragsdaten.
- Zeigt nur die aktiven Felder (Sichtbarkeit pro Space konfiguriert).
- Deaktivierte Felder sind komplett ausgeblendet, nicht nur grau.

## Wo werden sie verwendet?

- Im **PDF-Export** eines Vorgangs.
- Im **Vertragsauftrag-PDF** &ndash; entsprechende AcroForm-Felder werden
  automatisch mit den Stammdaten befuellt (siehe [Vertragsauftrag](./vertragsauftrag.md)).
- In der **HTTP-API** unter denselben Keys (siehe [API / Objekte](../api/objekte.md)).

## Datenschutz

- Personenbezogene Daten &ndash; DSGVO gilt. Speicherung entsprechend
  begrenzen, nach Ablauf loeschen.
- Der Admin kann Stammdaten-Felder deaktivieren, wenn sie fuer den Space
  nicht benoetigt werden &ndash; Vermeidung ueberfluessiger Datenspeicherung.

## Migration

Alle Stammdaten-Felder wurden mit Version **1.1** eingefuehrt (Issue #4)
und mit Version **1.2** um `konfession`, `geschlecht` und `befristung`
erweitert. Bestehende DBs werden **automatisch** migriert:

- **Lokal (SQLite):** `SqliteRepo` fuegt fehlende Spalten beim Oeffnen
  idempotent per `ALTER TABLE ADD COLUMN` hinzu.
- **Server (MariaDB):** `install.php` erneut aufrufen &ndash;
  `add_columns_if_missing()` legt fehlende Spalten an, uebergeht
  vorhandene.
