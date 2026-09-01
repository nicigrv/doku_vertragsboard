---
title: Warnungen & Notizen
sidebar_position: 6
---

# Warnungen & Notizen

Jedem Prozessschritt eines Vorgangs kann eine **Warnung** mit Freitext
zugeordnet werden. Sinn: kurze Info fuer Kollegen ("Ausdruck fehlt
noch", "Ruecksprache MA am 15.").

## Warnung setzen

- Im Detail-Panel neben dem jeweiligen Step steht ein
  **Ausrufezeichen-Button**.
- Klick oeffnet einen Popover mit einem Textfeld.
- Text eingeben &rarr; Speichern.
- Der Button faerbt sich orange, wenn eine Warnung gesetzt ist.

Die Warnung wird **sofort** persistiert (`step.note`-API-Call bzw.
direktes UPDATE in SQLite), damit auch bei App-Absturz nichts verloren
geht.

## Warnung entfernen

- Popover erneut oeffnen, Textfeld leeren, Speichern.
- Der Button wird wieder grau.

## Vorgaenge mit Warnungen filtern

- **Ansicht &rarr; Nur Vorgaenge mit Warnung** oder Checkbox in der Toolbar.
- Zeigt nur Vorgaenge, bei denen mindestens ein Step eine nicht-leere
  Notiz hat.
- Nuetzlich fuer die taegliche "was ist noch offen"-Runde.

## Warnung vs. Kommentar

Verwechslungsgefahr:

| Feld | Wo | Zweck |
|---|---|---|
| **Warnung** | Popover an einem Step | Kurzer Hinweis zu diesem konkreten Schritt |
| **Kommentar** | Feld im Vertragsdaten-Tab | Freier Vorgangs-Kommentar (kein Schritt-Bezug) |
| **Stammdaten-Notiz** | Feld in Sektion Stammdaten | Interne Info zur Person |

Alle drei sind persistent, alle drei werden im PDF-Export beruecksichtigt.

## Sichtbarkeit / Anzeige in der Liste

In der Vorgangsliste gibt es die Spalte **Warnung** (Icon), die bei
mindestens einer offenen Warnung angezeigt wird. Tooltip zeigt die
konkreten Texte an.

## Best Practice

- Warnungen kurz halten &ndash; ein Satz.
- Zur Terminfindung lieber ein Datum in den Step eintragen.
- Regelmaessig "aufraeumen" &ndash; erledigte Warnungen loeschen, damit
  der Filter nicht ausufert.
