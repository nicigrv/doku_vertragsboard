---
title: Prozessschritte
sidebar_position: 4
---

# Prozessschritte

Pro Vorgang gibt es die im Admin-Dashboard definierten Prozessschritte
(**Steps**). Standard-Preset "Standard-Kita" bringt 9 Schritte mit, andere
Presets oder eigene Konfigurationen koennen abweichen.

## Anatomie eines Schritts

Jeder Schritt hat:

- **Datum** &ndash; typischer Fall: das Erledigungsdatum.
- **Kuerzel** &ndash; wer hat den Schritt erledigt.
- **Zeitstempel** &ndash; wann wurde die Aenderung gespeichert.
- **Warnung/Notiz** &ndash; freier Text, optional (siehe [Warnungen](./warnungen.md)).

## Schritte im Detail-Panel

- Tab **Prozess**.
- Fuer jeden konfigurierten Step gibt es eine Zeile mit:
  - Farbigem Statuspunkt (`open`, `unclear`, `done`).
  - Beschriftung (Label aus der Config, unterscheidet Aktiv/Archiv).
  - Eingabefeld fuer das Datum.
  - Info "erledigt von EM am 18.08.2026" wenn gesetzt.
  - Warnungs-Button (Ausrufezeichen), oeffnet einen Popover fuer die Notiz.

## Datum eintragen

- Format `TT.MM.JJJJ` oder `JJJJ-MM-TT`. Wird intern zu ISO normalisiert.
- Sonderwert `X` steht fuer *"erledigt, kein konkretes Datum"* &ndash; wird
  in der Anzeige zu **"erledigt"**.
- Sonderzeichen `?` markiert einen unsicheren Wert (Status **unclear**).
- Enter uebernimmt und tabbt weiter zum naechsten Feld.

## Toggle-Aktion

Manche Schritte lassen sich per Klick auf den Statuspunkt togglen &ndash;
setzt/leert den Wert und traegt automatisch das heutige Datum und dein
Kuerzel ein. Praktisch fuer Ja/Nein-Schritte.

## Sortierung

- **Aktiv-Bereich:** `sort_aktiv` in der Step-Definition.
- **Archiv-Bereich:** `sort_archiv` (getrennt konfigurierbar &ndash; im Archiv
  bietet sich eine andere Reihenfolge an, etwa "VA digital" oben).
- Steps mit `show_in_aktiv = false` bzw. `show_in_archiv = false` werden
  im jeweiligen Bereich ausgeblendet (`VRK-Tabelle` z. B. nur im Aktiv).

## Status-Heuristik

Aus den gesetzten Steps leitet die App einen fachlichen Status ab (nur
fuer das Preset "Standard-Kita" relevant):

| Regel | Status |
|---|---|
| `eingangRA` gesetzt &amp; ohne `?` | **fertig** (Genehmigt) |
| `versandRA` gesetzt | **ra** (Beim Rechtsamt) |
| `unterschrift` oder `versandKita` gesetzt | **unterschrift** (In Unterschrift) |
| `vertragRA` gesetzt | **unterschrift** (Vertrag liegt vor) |
| `vaDigital`/`vaOriginal` gesetzt | **erstellt** (VA eingereicht) |
| sonst | **offen** (Offen) |

Bei benutzerdefinierten Schritten sind einige Keys evtl. nicht vorhanden
&ndash; dann bleibt der Status "offen".

## Speichern

- Aenderungen an Steps werden **zusammen mit den Vertragsdaten** beim
  Speichern des Vorgangs geschrieben.
- Ausnahme: Warnungen (Step-Notizen) und Toggle werden **sofort**
  gespeichert (separater `step.note` / `step.toggle`-Aufruf), damit
  kurze Kommentare nicht verloren gehen.

## Warum Kuerzel statt vollem Namen?

- **Kompakt** &ndash; ein zwei-Buchstaben-Kuerzel passt auch in schmale
  Listenspalten.
- **Konsistent** &ndash; Kollegen erkennen sich an Kuerzeln, weil der
  volle Name in Kita-Traegern nicht immer eindeutig ist.
- Das Kuerzel wird beim Anlegen eines Users festgelegt und laesst sich
  vom Admin aendern (max. 16 Zeichen).
