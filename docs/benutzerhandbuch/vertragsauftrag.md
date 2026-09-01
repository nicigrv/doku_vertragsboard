---
title: Vertragsauftrag-PDF
sidebar_position: 8
---

# Vertragsauftrag-PDF

Der **Vertragsauftrag** ist das Original-PDF-Formular des Bistums
Limburg. Vertragsboard fuellt die AcroForm-Felder automatisch mit den
Daten des aktuellen Vorgangs.

## Ablauf

- Vorgang oeffnen.
- **Datei &rarr; Vertragsauftrag ausfuellen...** oder Toolbar-Button.
- Dialog: Vorlage waehlen (Arbeitsvertrag / Praktikanten-Vertrag),
  Zielpfad angeben.
- Die generierte PDF-Datei enthaelt das Original-Formular mit den
  eingetragenen Werten &ndash; **weiterhin ausfuellbar** (kein Flatten),
  damit letzte Anpassungen im PDF-Reader moeglich sind.

## Vorlagen

Enthalten in `vertragsboard/assets/vertragsauftrag/`:

- `arbeit.pdf` &ndash; Vertragsauftrag Arbeitsvertrag
- `praktikant.pdf` &ndash; Vertragsauftrag Praktikanten

Die App entscheidet anhand der Vertragsart automatisch, welche Vorlage
sich anbietet:

| Vertragsart | Vorlage |
|---|---|
| Arbeitsvertrag, AV | `arbeit.pdf` |
| Ausbildungsvertrag (Berufspraktikum), PIA, FSJ, BFD | `praktikant.pdf` |
| andere | manuelle Auswahl im Dialog |

## Feld-Mapping

Die Zuordnung `AcroForm-Feldname &rarr; Vorgangsfeld` liegt in
`pdf_field_mapping.py`. Beispiele:

| PDF-Feld | Quelle |
|---|---|
| `Name, Vorname` | `vorgang.name` |
| `Kita` | Anzeige-Name der `vorgang.kita`-Einheit |
| `Vertragsart` | `vorgang.art` |
| `Beginn` | `vorgang.beginn` |
| `Beschaeftigungsumfang` | `vorgang.bu` |
| `E-Mail` | `vorgang.email` |
| `Geburtstag` | `vorgang.geburtstag` (formatiert `TT.MM.JJJJ`) |
| `Geschlecht` | Combobox-Wert (`m`, `w`, `d`) |

Bei Auswahlfeldern (Combobox im PDF) wird die Feld-Auswahl gesetzt,
nicht Freitext.

## Technisch

- Bibliothek: **pypdf** (`PdfReader`/`PdfWriter`).
- Die Original-PDFs werden nicht veraendert; nur eine Kopie mit
  ausgefuellten Feldern wird gespeichert.
- Wenn ein Feld im Vorgang leer ist, bleibt es auch im PDF leer.
- Falls die App keine passende AcroForm findet ("PDF ist nicht
  ausfuellbar"), landet das Formular unveraendert am Zielpfad und der
  Nutzer wird gewarnt.

## Neue Vorlage einspielen

Aktuell hardcoded &ndash; wer eine neue Vorlage braucht, meldet sich beim
[Support](../support.md). Perspektivisch soll das ueber Admin-Dashboard
konfigurierbar werden (Feature-Request offen).

## Test

Fuer die Vertragsauftrag-Vorlagen gibt es einen einfachen
Fill-Test unter `tools/test_vertragsauftrag_fill.py`. Ruft die
Fill-Routine mit einem Beispiel-Vorgang und prueft, dass die
Ziel-PDFs entstehen und die wichtigsten Felder gesetzt sind.
