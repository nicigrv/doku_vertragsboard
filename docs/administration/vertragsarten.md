---
title: Vertragsarten
sidebar_position: 5
---

# Vertragsarten

Die **Vertragsart** steuert, welche Vertragsauftrag-Vorlage automatisch
gewaehlt wird und wie ein Vorgang in der Liste kategorisiert wird.

## Standard-Liste

Nach dem Setup sind vorhanden:

- Arbeitsvertrag
- AV (Kurzform)
- Ausbildungsvertrag
- Berufspraktikum
- PIA (Praxisintegrierte Ausbildung)
- FSJ (Freiwilliges Soziales Jahr)
- BFD (Bundesfreiwilligendienst)
- Aenderungsvertrag
- Aufhebungsvertrag

## Anpassen

- Admin-Dashboard &rarr; Tab "Vertragsarten"
- **Neu**: freier Text, wird sofort in die Combobox uebernommen
- **Doppelklick**: umbenennen
- **Loeschen**: entfernt aus der Combobox &ndash; Vorgaenge mit
  entfernter Art zeigen den alten Text weiterhin an

## Zuordnung zu Vertragsauftrag-Vorlage

| Vertragsart | Vorlage |
|---|---|
| Arbeitsvertrag, AV, Aenderungsvertrag | `arbeit.pdf` |
| Ausbildungsvertrag, Berufspraktikum, PIA, FSJ, BFD | `praktikant.pdf` |
| alles andere | Vorlage manuell im Dialog waehlen |

Die Zuordnung ist aktuell **hardcoded** in `pdf_field_mapping.py`.
Neue Vorlagen fuegen nur Anwender mit Repo-Zugang hinzu &ndash; oder
per [Support](../support.md).

## Farbliche Markierung

Vertragsboard hebt bestimmte Vertragsarten in der Liste farbig hervor
(z. B. Aenderungsvertrag). Aktuell fest &ndash; nicht ueber das
Dashboard konfigurierbar.

## Empfehlung

- **Kurze Bezeichner** &ndash; die Combobox wird in der Vorgangsliste
  angezeigt und muss lesbar bleiben.
- Bei Umstellung auf neue Vertrags-Systematik (z. B. neue Tarifreform)
  neue Arten anlegen, alte nicht loeschen &ndash; historische Vorgaenge
  sollen ihre alte Kennung behalten.
