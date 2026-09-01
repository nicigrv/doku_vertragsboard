---
title: PDF-Export
sidebar_position: 7
---

# PDF-Export

Vertragsboard kann jeden Vorgang als **strukturierten PDF-Report**
exportieren &ndash; nuetzlich fuer Ausdrucke, E-Mail-Anhaenge oder
Ablagen.

## PDF eines Vorgangs erzeugen

- Vorgang auswaehlen.
- **Datei &rarr; PDF exportieren...** oder `Ctrl+P`.
- Dialog "Speichern unter" &rarr; Zielordner + Dateiname waehlen.
- Standarddateiname: `Vertragsboard-<Nachname>-<YYYYMMDD>.pdf`.

## Inhalt des Reports

- **Kopf:** Organisation, Datum, Vorgangs-ID, aktueller Bereich (Aktiv/Archiv).
- **Vertragsdaten:** Kita, Vertragsart, Funktion, Beginn, Beschaeftigungsumfang.
- **Stammdaten:** alle vom Admin aktivierten Felder (E-Mail, Telefon, Adresse,
  Geburtstag, Konfession, Geschlecht, Befristung).
- **Prozessschritte:** Tabelle mit Label, Datum, Kuerzel, Zeitstempel und Notiz.
- **Kommentar:** wenn vorhanden.
- **Fuss:** Bearbeiter (Kuerzel des Erzeugers), Erstellungsdatum des PDFs.

## Technisch

- Erzeugt mit **reportlab** (Python).
- **A4** Hochformat.
- Farb-Palette angelehnt an die App: Primary-Blau fuer Ueberschriften.
- **Keine externen Fonts** &ndash; verwendet reportlab-Standard (Helvetica).

## Massen-Export

Der aktuelle Client bietet keinen "Alle als PDF"-Button. Wer viele
Vorgaenge exportieren muss, kann ueber die HTTP-API alle IDs abfragen
und mit einem eigenen Skript einzelne PDFs anstossen (per
Command-Line-Fake ist das nicht vorgesehen &ndash; Feature-Request via
[Support](../support.md)).

## PDF vs. Vertragsauftrag

- **PDF-Export** = internes Report-PDF (frei gestaltet, alle Daten).
- **Vertragsauftrag** = befuelltes Original-PDF-Formular des Bistums
  Limburg, siehe [Vertragsauftrag](./vertragsauftrag.md).

Beides ist unabhaengig voneinander verfuegbar.
