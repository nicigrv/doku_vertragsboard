---
title: Live-Praesenz
sidebar_position: 9
---

# Live-Praesenz

Damit klar ist, wer gerade **online** am selben Space arbeitet, zeigt
die Statusleiste die aktuell aktiven Nutzer.

## Anzeige

- Statusleiste, zweite Position: **"Online: 3"**.
- Klick oeffnet einen Dialog mit Liste:
  - Kuerzel
  - Voller Benutzername
  - Hostname des PCs
  - Zeitpunkt der Anmeldung
  - Letzter Herzschlag

## Wie funktioniert das?

### Server-Modus

- Der Client schickt alle **60 Sekunden** einen POST an
  `?action=presence.beat` mit dem eigenen Hostname.
- Serverseitige Tabelle `vb_presence` (Schluessel: `space_id + user_id +
  host`) wird upsertet.
- Ab `PRESENCE_STALE_SECONDS` (Default 300 s = 5 min) ohne Herzschlag
  verschwindet der Eintrag aus der Praesenz-Anzeige.
- Endpoint `presence` liefert die aktuellen Eintraege.

### Lokal-Modus (OneDrive)

- Datei `vertragsboard.lock` im Datenordner.
- Jeder Client schreibt alle 2 Minuten (`LOCK_HEARTBEAT_SECONDS`) einen
  Eintrag mit Kuerzel + Hostname + Timestamp.
- Nach 30 Minuten (`LOCK_STALE_MINUTES`) ohne Herzschlag wird der
  Eintrag als "stale" ignoriert.
- OneDrive synchronisiert die Datei &ndash; deshalb sind die Angaben
  jeweils leicht verzoegert (Sync-Latenz zaehlt).

## Warum ueberhaupt?

- **Konflikte vermeiden:** wenn du siehst, dass eine Kollegin gerade am
  gleichen Vorgang arbeitet, kurz melden &ndash; statt spaeter ueber den
  Konflikt-Dialog stolpern.
- **Support:** bei Fragen sofort erkennen, wer noch drin ist.

## Grenzen

- **Nicht der Vorgang, nur die Person:** Vertragsboard zeigt nicht an,
  *welchen* Vorgang jemand gerade bearbeitet. Nur, ob sie im Space
  online ist.
- **Kein Chat.** Wer schnell kommunizieren will, benutzt Teams/Slack.

## Deaktivieren?

Die Praesenz-Anzeige laesst sich aktuell nicht abschalten. Sie ist
funktional wichtig, um Konflikte zu erkennen. Falls du sie stoerend
findest, feedback willkommen.
