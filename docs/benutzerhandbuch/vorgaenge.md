---
title: Vorgaenge verwalten
sidebar_position: 3
---

# Vorgaenge verwalten

Ein **Vorgang** buendelt Personen- und Vertragsdaten mit den
Prozessschritten einer Einstellung. Alle Operationen laufen ueber
Vorgangsliste und Detail-Panel.

## Neuen Vorgang anlegen

- **Datei &rarr; Neuer Vorgang** (`Ctrl+N`) oder Button **+ Neu** in der Toolbar.
- Ein neuer, leerer Vorgang wird im aktuellen Bereich (Aktiv/Archiv) angelegt.
- Cursor springt in das Namensfeld.
- **Pflichtfelder** in der Standard-Konfiguration: `Name`, `Kita`, `Art`.
- Beim ersten **Speichern** (`Ctrl+S` oder Button) bekommt der Vorgang
  eine ID und einen `created_at`-Zeitstempel.

## Vorgang bearbeiten

- Vorgang in der Liste anklicken &rarr; Detail-Panel laedt.
- Felder direkt editieren.
- Datumsfelder akzeptieren `TT.MM.JJJJ` und `JJJJ-MM-TT`;
  intern wird auf ISO-Format normalisiert.
- **Dirty-Zustand:** sobald du etwas aenderst, erscheint in der
  Statusleiste ein oranger Hinweis; der Auto-Reload aus OneDrive
  bzw. vom Server pausiert fuer den offenen Vorgang, damit dir nichts
  ueberschrieben wird.
- **Speichern:** `Ctrl+S` oder Button "Speichern" unten. Bei Konflikt
  siehe unten.

## Konflikte (zwei Personen bearbeiten denselben Vorgang)

Der Server prueft `expected_updated_at`. Passt sie nicht, kommt ein
**Konflikt-Dialog** hoch:

1. Links: **Deine Version** (die du gerade gespeichert hast).
2. Rechts: **Aktuelle Server-Version** (die des anderen).
3. Buttons:
   - **Neu laden** &ndash; deine Aenderungen verwerfen, Server-Version uebernehmen.
   - **Ueberschreiben** &ndash; deine Version speichern; die des anderen geht verloren.
   - **Abbrechen** &ndash; bleiben im Dirty-Zustand, Konflikt bleibt bestehen.

Bester Umgang: kurz mit der anderen Person klaeren, dann bewusst entscheiden.

## Verschieben zwischen Aktiv und Archiv

- Button **"In Archiv verschieben"** (im Aktiv-Bereich) bzw. **"Zurueck in Aktiv"** (im Archiv).
- Rechtsklick in der Liste &rarr; **Verschieben**.
- Die zugehoerigen Prozessschritte bleiben erhalten; nur die Anzeige
  wechselt zwischen den Listen.

## Loeschen

- Rechtsklick in der Liste &rarr; **Loeschen** oder Button im Detail-Panel.
- Sicherheitsabfrage.
- **Endgueltig** &ndash; auch die zugehoerigen Steps und Aktivitaeten
  werden geloescht (`ON DELETE CASCADE`).
- Ins Aktivitaets-Log wird der Loeschvorgang eingetragen (mit
  Kuerzel und Zeitstempel).

## Duplizieren

- Rechtsklick in der Liste &rarr; **Duplizieren**.
- Legt einen neuen Vorgang mit denselben Stammdaten an; Prozessschritte
  bleiben leer.
- Nuetzlich fuer aehnliche Faelle (z. B. weitere Praktikanten mit gleichem
  Vertragstyp).

## Suchen und Filtern

- **Volltext-Suche** oben in der Toolbar: filtert Name, Kita, Kommentar.
- Filter **"Nur Vorgaenge mit Warnung"**: blendet alles ohne Warnungen aus.
- Sortierung: Klick auf Spaltenkopf. Standard ist Sortierung nach Name.

## Auto-Reload

Alle 3 Sekunden prueft die App auf externe Aenderungen:

- **Server-Modus:** `list_vorgaenge` gegen die API.
- **Lokal-Modus:** Modification-Time von `vertragsboard.db`.

Ist der aktuell offene Vorgang **dirty**, wird er nicht ueberschrieben;
andere Vorgaenge in der Liste werden aktualisiert.
