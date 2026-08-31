---
title: Lokal / OneDrive
sidebar_position: 4
---

# Lokal / OneDrive

Kein Server. Die Daten liegen in einer einzigen **SQLite-Datei**
(`vertragsboard.db`). Wenn diese Datei in einem OneDrive-Ordner liegt,
koennen mehrere PCs sie abwechselnd verwenden &ndash; synchronisiert wird
ueber OneDrive.

## Wann sinnvoll?

- Ein-Personen-Betrieb.
- Zwei bis drei Personen, die nie gleichzeitig arbeiten (z. B.
  Buero-Tag pro Person).
- Wechsel zwischen Buero-PC und Homeoffice-PC ueber OneDrive.

## Wann **nicht** sinnvoll?

- **Gleichzeitig arbeiten mehrere Personen.** SQLite ist auf einen
  Schreibprozess pro Zeit ausgelegt, OneDrive-Sync ist nicht
  transaktional &ndash; im schlimmsten Fall bekommt OneDrive Konfliktdateien
  vom Typ `vertragsboard-Rechner-1.db`.
- **Grosse Datenmengen** (viele tausend Vorgaenge) &ndash; SQLite skaliert
  gut, aber OneDrive braucht dann pro Sync einen kompletten Datei-Push.

Wenn dir eines davon zutrifft: [Standard-Server](./standard-server.md) oder
[Eigenen Server](./eigener-server.md) verwenden.

## Setup

1. Vertragsboard starten &rarr; Setup-Wizard.
2. **"Lokal (SQLite auf diesem PC oder in OneDrive)"** waehlen.
3. **Datenordner** angeben. Vorschlag: `<OneDrive>\Vertragsboard`.
   - Der Wizard schlaegt automatisch den ersten gefundenen
     OneDrive-Ordner vor (Persoenlich, Business oder Consumer).
   - Alternative: beliebiger Ordner auf der Festplatte.
4. **Preset** waehlen:
   - **Standard-Kita (9 Prozessschritte)** &ndash; sofort startklar mit 9
     Schritten und 8 Vertragsarten.
   - **Leer (selbst konfigurieren)** &ndash; alles manuell im Admin-Dashboard.
5. Ersten **Admin-User** anlegen (Benutzer, Kuerzel, Passwort).
6. Optional: Beispieldaten aus Excel einspielen (~35 Vorgaenge).
7. Fertig.

## Dateien im Datenordner

| Datei | Bedeutung |
|---|---|
| `vertragsboard.db` | Die eigentliche SQLite-DB. Enthaelt Nutzer, Vorgaenge, Aktivitaets-Log. |
| `vertragsboard.lock` | Live-Praesenz &ndash; welcher Nutzer bearbeitet gerade aktiv. Aktualisiert im 2-Minuten-Takt. |
| `settings.json` | Optionale Einstellungen (Legacy). |

Alle drei Dateien gehoeren zusammen &ndash; bitte immer den ganzen Ordner sichern.

## OneDrive-Feinschliff

- **Files On-Demand:** die App markiert `vertragsboard.db` per
  `attrib +P -U` als "immer verfuegbar". So laedt OneDrive die Datei
  nicht bei jedem Zugriff nach.
- **Wechseln der Datei:** waehrend die App die DB haelt, bitte nicht per
  OneDrive-Ordner-Freigabe umziehen. Erst App schliessen.
- **Konfliktdateien:** wenn OneDrive doch mal einen Konflikt erkennt,
  landen `vertragsboard-<PC>.db` im Ordner. Nicht einfach loeschen &ndash;
  eine davon enthaelt die aktuellen Aenderungen. Im Zweifel Support.

## Auto-Reload

Das Hauptfenster prueft alle 3 Sekunden, ob sich die
`vertragsboard.db`-Datei geaendert hat (Modification-Time). Bei Aenderung
wird die Liste neu geladen. So wird eine per OneDrive-Sync eingespielte
Aenderung sichtbar, ohne dass der Nutzer F5 druecken muss.

## Live-Praesenz

Datei-basierter Presence-Manager schreibt regelmaessig in
`vertragsboard.lock`. Der Eintrag enthaelt Kuerzel, Hostname und
Zeitstempel des letzten Herzschlags. Faellt ein PC aus, verschwindet
sein Eintrag nach 30 Minuten (`LOCK_STALE_MINUTES`).

## Backup

Einfach den ganzen Datenordner regelmaessig kopieren. OneDrive erledigt
das ohnehin, aber ein zusaetzliches wochentliches Backup auf einen
zweiten Datentraeger schadet nie.
