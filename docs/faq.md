---
title: FAQ
sidebar_position: 100
---

# FAQ

Haeufige Fragen &ndash; sortiert nach Zielgruppe.

## Anwender

### Warum kann ich meine Aenderung nicht speichern?

Wahrscheinlich hat jemand parallel den gleichen Vorgang bearbeitet
(Optimistische Sperre). Ein Konflikt-Dialog erscheint &ndash; siehe
[Vorgaenge](./benutzerhandbuch/vorgaenge.md). Server-Version pruefen,
Aenderungen zusammenfuehren, erneut speichern.

### Ich sehe eine "Online: 5"-Anzeige. Was heisst das?

Fuenf Kolleg:innen sind gerade im gleichen Space online. Klick auf die
Anzeige oeffnet die Liste &ndash; siehe [Live-Praesenz](./benutzerhandbuch/live-praesenz.md).

### Wie exportiere ich einen Vorgang als PDF?

`Ctrl+P` oder **Datei &rarr; PDF exportieren...** &ndash; siehe
[PDF-Export](./benutzerhandbuch/pdf-export.md).

### Kann ich einen alten Vorgang wieder in "Aktiv" holen?

Ja: im Archiv-Bereich Vorgang auswaehlen, **Bearbeiten &rarr; Nach Aktiv
verschieben** oder Kontextmenue. Steps und Historie bleiben erhalten.

### Meine Warnung ist weg &ndash; was ist passiert?

Warnungen loeschen sich, wenn der Textinhalt geloescht wird. Historisch
sichtbar im [Aktivitaetslog](./benutzerhandbuch/aktivitaet.md) (`step.note`).

## Administration

### Ich habe versehentlich alle Admins geloescht.

**Server-Modus:** Notfall-Recovery ueber
[Web-Admin-Portal](./portal/uebersicht.md) oder direkt per SQL:

```sql
UPDATE vb_users SET role='admin' WHERE kuerzel='NG';
```

**Lokal-Modus:** Der Windows-Nutzer ist immer Admin des lokalen Space.

### Neue Kita hinzufuegen &ndash; muessen bestehende Vorgaenge geaendert werden?

Nein. Neue Einheit erscheint sofort in Combobox neu anzulegender
Vorgaenge. Alte Vorgaenge behalten ihre Einheit.

### Was passiert bei einem Neu-Sprint der Prozessschritte?

Neue Schritte werden bei bestehenden Vorgaengen **hinten** angehaengt,
Werte leer. Umbenennungen sind sofort sichtbar.

## Betriebsmodi

### Server-Modus oder Lokal-Modus &ndash; was ist besser?

- **1&ndash;2 Nutzer, gemeinsamer OneDrive:** Lokal-Modus reicht.
- **3+ Nutzer oder Multi-Standort:** Server-Modus.
- **Kein eigener Server verfuegbar:** Standard-Server.

Details: [Betriebsmodi Uebersicht](./betriebsmodi/uebersicht.md).

### Kann ich vom Lokal- zum Server-Modus wechseln?

Ja &ndash; Admin-Dashboard &rarr; Backup &rarr; Export als JSON. Neuer
Space im Server anlegen, JSON importieren. Kein Zurueck-Weg
automatisiert, aber JSON auf Lokal-Space importierbar.

### Wo liegen meine Daten im Lokal-Modus?

`OneDrive\Vertragsboard\vertragsboard.db` (siehe [Lokal/OneDrive](./betriebsmodi/lokal-onedrive.md)).

## Server-Betrieb

### Welche PHP-Version?

7.4 minimum, 8.1+ empfohlen.

### Kann ich MySQL statt MariaDB nutzen?

Ja &ndash; ab MySQL 8.0 getestet.

### Wie gross wird die Datenbank?

Grobe Richtwerte in [Betrieb & Monitoring](./server-backend/betrieb.md).

### Wie sicher ich?

`mysqldump` + gzip + offsite. Retention 7/4/3. Restore-Test alle
6 Monate. Details: [Backup & Restore](./administration/backup.md).

## Entwicklung

### Wo ist der Quellcode?

[github.com/nicigrv/vertragsboard](https://github.com/nicigrv/vertragsboard).

### Kann ich beitragen?

Ja &ndash; Fork, PR. Vorher gerne ein Issue eroeffnen, damit wir uns
zur Richtung abstimmen. Siehe [Quellcode](./entwicklung/quellcode.md).

### Wieso keine Automatisierung (CI/CD)?

Aktuell zu klein &ndash; ein Wartender, manueller Build/Release
funktioniert. Feature-Request "GitHub-Actions-Pipeline" offen.

## Weiteres

### Wie kontaktiere ich den Support?

Siehe [Support](./support.md).

### Wo finde ich die Release-Notes?

[GitHub Releases](https://github.com/nicigrv/vertragsboard/releases).
