---
title: Stammdaten-Felder aktivieren
sidebar_position: 6
---

# Stammdaten-Felder aktivieren

Vertragsboard kennt zehn optionale **Stammdaten-Felder** pro Vorgang.
Der Admin entscheidet pro Space, welche davon in der Oberflaeche
sichtbar sind.

## Verfuegbare Felder

| Feld | Typ | Vorbelegung |
|---|---|---|
| **E-Mail** | Text | aus |
| **Telefon** | Text | aus |
| **Adresse** | Text (mehrzeilig) | aus |
| **PLZ** | Text (kurz) | aus |
| **Ort** | Text | aus |
| **Geburtstag** | Datum (TT.MM.JJJJ) | an |
| **Konfession** | Combobox (frei) | an |
| **Geschlecht** | Combobox (m/w/d) | an |
| **Befristung** | Datum + Bemerkung | aus |
| **Notiz** | Text (mehrzeilig, intern) | an |

## Aktivieren

- Admin-Dashboard &rarr; Tab "Stammdaten"
- Checkbox pro Feld setzen &rarr; Speichern
- Danach erscheint das Feld sofort im Detail-Panel der Vorgaenge.

## Ausblenden

- Checkbox abwaehlen &rarr; Feld wird ausgeblendet
- Werte bleiben in der DB &ndash; wer die Sichtbarkeit spaeter wieder
  aktiviert, sieht die alten Eintraege wieder.

## Warum optional?

- **DSGVO-Minimierung:** Was du nicht abfragst, musst du auch nicht
  begruenden.
- **Uebersicht:** Wer nur mit E-Mail arbeitet, blendet Telefon/Adresse
  aus.
- **PDF-Ausgabe:** Nur aktivierte Felder erscheinen im Report.

:::warning DSGVO-Hinweis
Auch inaktive Felder speichern weiterhin Daten in der DB, wenn dort
schon Werte drin standen. Wer Felder **wirklich** loeschen will:
Admin-Dashboard bietet aktuell keinen "Feld leeren fuer alle
Vorgaenge"-Button. Ein direkter SQL-`UPDATE ... SET feld=NULL` ist
noetig.
:::

## Auswirkung auf PDF und Vertragsauftrag

- **PDF-Report:** nur aktivierte Felder werden gedruckt.
- **Vertragsauftrag (AcroForm):** Feld wird gefuellt, wenn ein Wert
  vorhanden **und** das PDF ein passendes Feld enthaelt &ndash;
  unabhaengig davon, ob das Feld in der Oberflaeche sichtbar ist.
