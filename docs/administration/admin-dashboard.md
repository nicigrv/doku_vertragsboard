---
title: Admin-Dashboard
sidebar_position: 1
---

# Admin-Dashboard

Das **Admin-Dashboard** ist das zentrale Konfigurations-Werkzeug fuer
einen Vertragsboard-Space. Nur Nutzer mit Rolle **admin** sehen den
Menuepunkt.

## Aufrufen

- **Extras &rarr; Admin-Dashboard...** (Tastenkuerzel: `Ctrl+Shift+A`)
- Der Dialog oeffnet sich modal &ndash; waehrend er offen ist, kann der
  Space nicht bearbeitet werden.

## Aufbau

Der Dialog hat mehrere Tabs:

| Tab | Zweck |
|---|---|
| **Organisation** | Name, Kuerzel, Logo, Adresse |
| **Einheiten** | Kitas, Standorte, Trager-Einheiten |
| **Prozessschritte** | Liste der Vertrag-Steps mit Reihenfolge |
| **Vertragsarten** | Vertragsarten (Combobox-Werte) |
| **Stammdaten** | Optionale Felder pro Vorgang aktivieren |
| **Benutzer** | Nutzer anlegen, Rollen setzen, loeschen |
| **Backup / Export** | JSON-Backup, Restore |

Alle Aenderungen werden erst **beim Speichern** persistiert &ndash;
ein "Verwerfen"-Button kehrt zurueck zum letzten gespeicherten Stand.

## Speichern

- **Speichern**-Button unten rechts.
- Erzeugt einen `config.save`-Eintrag im [Aktivitaetslog](../benutzerhandbuch/aktivitaet.md).
- Client-seitiger Cache wird invalidiert; andere Nutzer sehen die
  Aenderungen nach dem naechsten Reload.

## Wer sollte admin sein?

- Mindestens **eine** Person pro Space &ndash; die die Organisation
  verantwortet.
- Idealerweise **zwei** (Vertretung).
- **Nicht** jeder Sachbearbeiter &ndash; fuer den Alltag reicht Rolle
  `user`.

## Auswirkung von Aenderungen

- Neue Prozessschritte werden bei bestehenden Vorgaengen **hinten**
  angehaengt (Werte leer).
- Umbenennungen wirken sofort &ndash; die Historie im Aktivitaetslog
  behaelt den alten Namen als Freitext.
- Loeschungen sind **nicht sofort** aus alten Vorgaengen entfernt &ndash;
  der Client filtert die Anzeige, die Daten bleiben aber in der DB.
