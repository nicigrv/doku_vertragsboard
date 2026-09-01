---
title: Oberflaeche
sidebar_position: 2
---

# Oberflaeche

Das Hauptfenster ist ein **Master-Detail-Layout**: links die Liste der
Vorgaenge, rechts das Detail-Panel des ausgewaehlten Vorgangs.

## Aufbau

```
+------------------------------------------------------------------+
|  Menue: Datei | Ansicht | Extras | Hilfe                         |
+------------------------------------------------------------------+
|  Toolbar: [Aktiv | Archiv]  [+ Neu] [Filter] [Suche...]          |
+------------------------------------------------------------------+
|                                     |                            |
|  Vorgangsliste                      |  Detail-Panel              |
|  ---------------                    |  --------------            |
|  Name  Kita  Art  Status  Warn...   |  Tabs: Prozess | Vertrags- |
|  ...                                |         daten              |
|                                     |                            |
+------------------------------------------------------------------+
|  Statusleiste: Nutzer | Online | Anzahl | Sync | Dirty | Ordner  |
+------------------------------------------------------------------+
```

## Menue

| Menue | Punkt | Shortcut | Zweck |
|---|---|---|---|
| Datei | Neuer Vorgang | Ctrl+N | Neuen leeren Vorgang anlegen |
| Datei | PDF exportieren | Ctrl+P | Aktuellen Vorgang als PDF |
| Datei | Beenden | Alt+F4 | App schliessen |
| Ansicht | Aktualisieren | F5 | Liste neu laden |
| Ansicht | Nur Vorgaenge mit Warnung | &ndash; | Filter umschalten |
| Extras | Kitas verwalten | &ndash; | Schnellverwaltung Einheiten |
| Extras | Benutzer | &ndash; | Nutzerverwaltung (nur Admin) |
| Extras | Aktivitaetsprotokoll | &ndash; | Wer hat was wann geaendert |
| Extras | Admin-Dashboard | &ndash; | Komplettes Admin-UI (nur Admin) |
| Hilfe | Nach Updates suchen | &ndash; | Manueller Update-Check |

## Toolbar

- **Bereich-Umschalter:** Segmented-Buttons `Aktiv | Archiv`. Legt fest,
  welcher Bereich in der Liste angezeigt wird.
- **+ Neu:** legt einen neuen Vorgang im aktuellen Bereich an.
- **Nur Warnungen:** Filter-Checkbox, zeigt nur Vorgaenge mit offenen
  Warnungen.
- **Suche:** Volltext ueber Name, Kita und Kommentar. Live-Filter.

## Vorgangsliste (linker Bereich)

- Sortierbar per Spalten-Klick.
- Alternierende Zeilenfarben fuer bessere Lesbarkeit.
- Doppelklick fokussiert das Detail-Panel.
- Kontextmenue (rechter Mausklick): Loeschen, Kopieren, Verschieben.

Sichtbare Spalten (siehe `table_model.py`): **Name**, **Kita**, **Art**,
**Funktion**, **Beginn**, **Status** (Heuristik ueber die Steps),
**Warnung**, **Letzte Aenderung**, **von**.

## Detail-Panel (rechter Bereich)

Zwei Tabs:

- **Prozess** &ndash; die konfigurierten Prozessschritte mit Datumsfeld,
  Kuerzel-Anzeige, Warnungs-Button je Schritt.
- **Vertragsdaten** &ndash; zwei Sektionen:
  - **VERTRAGSDATEN** (Kita, Art, Funktion, Beginn, Beschaeftigungsumfang, Kommentar)
  - **STAMMDATEN** (E-Mail, Telefon, Adresse, PLZ, Ort, Geburtstag,
    Konfession, Geschlecht, Befristung, Notiz). Nur sichtbare Felder
    werden angezeigt (Admin-Konfiguration je Space).

## Statusleiste

Von links nach rechts:

- **Angemeldet:** Nutzername + Kuerzel.
- **Online:** Anzahl der aktuell aktiven Nutzer im Space. Klick oeffnet Detailliste.
- **Anzahl:** Anzahl der sichtbaren Vorgaenge in der aktuellen Ansicht.
- **Sync:** Zeitstempel des letzten erfolgreichen Reloads.
- **Dirty:** *(nur wenn ungespeicherte Aenderungen)* orange
  "Ungespeicherte Aenderungen".
- **Ordner:** Kurztext zum Backend (`Lokal - C:\...` oder `Server - https://...`).

## Farbschema

- **Helle Palette** ist fest &ndash; die App ignoriert den Windows-Dark-Mode
  bewusst (Qt-Fusion + feste QPalette). Grund: konsistente Farben in PDFs
  und uebergreifend zwischen Windows-Versionen.
- Primary-Blau `#0F62FE` fuer Aktions-Buttons ("Speichern", "Weiter"),
  Highlight fuer aktive Selektion.

## Tastaturbedienung

- `Tab` / `Shift+Tab` bewegt sich durch Felder.
- `Enter` in Datumsfeldern uebernimmt den Wert und tabbt weiter.
- Comboboxen ignorieren das **Mausrad** bewusst (`_ComboWheelGuard`) &ndash;
  verhindert versehentliches Verstellen beim Scrollen.
- `Ctrl+S` speichert den aktuell offenen Vorgang.
- `Esc` verwirft ungespeicherte Aenderungen nach Rueckfrage.
