---
title: Prozessschritte konfigurieren
sidebar_position: 4
---

# Prozessschritte konfigurieren

Jeder Vorgang durchlaeuft einen definierten **Prozess-Ablauf** &ndash;
etwa "Antrag eingegangen &rarr; Vertrag erstellt &rarr; MAV informiert
&rarr; unterschrieben &rarr; abgelegt". Diese Schritte legt der Admin
im Space fest.

## Standard: Preset "bonifatius"

Beim ersten Einrichten uebernimmt der Wizard 9 Standard-Schritte:

1. Vertrag angefordert
2. Datenblatt vollstaendig
3. Vertrag erstellt
4. MAV informieren
5. Vertrag zur Unterschrift
6. Vertrag unterschrieben
7. Vertrag versendet
8. Personalakte angelegt
9. Abgeschlossen

Alternativ das Preset **"leer"** &ndash; nur ein einziger Schritt
"Bearbeitung", zum freien Konfigurieren.

## Anlegen / Aendern

- Admin-Dashboard &rarr; Tab "Prozessschritte"
- **Neu**: fuegt einen Schritt ans Ende
- **Doppelklick**: umbenennen
- **Drag & Drop**: Reihenfolge aendern
- **Loeschen**: entfernt aus dem Preset (bestehende Vorgaenge behalten
  Werte in der DB, sie werden aber nicht mehr angezeigt)

## Felder pro Schritt

| Feld | Bedeutung |
|---|---|
| **Label** | Anzeigetext im Vorgang, im PDF und im Aktivitaetslog |
| **Position** | Reihenfolge (per Drag & Drop) |
| **Aktiv** | Optional &ndash; deaktivierte Schritte werden ausgeblendet |

Weitere Attribute (Farbe, Verpflichtend, Bearbeiter-Rolle) sind aktuell
**nicht** konfigurierbar. Feature-Request willkommen.

## Auswirkung bei bestehenden Vorgaengen

- **Neuer Schritt hinten:** Wert ist zunaechst leer, Nutzer haken bei
  Bedarf ab &rarr; Datum wird gesetzt.
- **Schritt entfernt:** Verschwindet aus dem Detail-Panel, Wert bleibt
  in der DB (zur Historisierung).
- **Umbenannt:** Das neue Label erscheint sofort ueberall &ndash; auch
  im Aktivitaetslog zukuenftiger Aenderungen.

## Reset auf Preset

- Admin-Dashboard &rarr; Tab "Prozessschritte" &rarr; **Auf Standard
  zuruecksetzen**
- Ueberschreibt die aktuelle Konfiguration mit "bonifatius"
- Warnung: bestehende Zusatz-Schritte gehen verloren.
