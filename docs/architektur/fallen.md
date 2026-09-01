---
title: Bekannte Fallen
sidebar_position: 4
---

# Bekannte Fallen

Kurze Sammlung von Punkten, an denen man sich in der Praxis stoessen
kann.

## OneDrive im Lokal-Modus

- Zwei Clients schreiben gleichzeitig &rarr; SQLite-Konflikt =
  `.db-conflict-...`-Datei.
- OneDrive-Sync-Latenz &ndash; Aenderungen sind erst nach 5&ndash;60 s
  auf dem anderen PC sichtbar.
- **Empfehlung:** bei &gt; 2 Nutzern auf Server-Modus wechseln.

## Zeitzonen

- Alle Zeitstempel serverseitig **UTC**.
- Client rechnet auf Systemzeit um.
- Wer den DB-Server auf Berliner Zeit stellt, bekommt bei
  Sommerzeitwechsel Aerger &ndash; **immer** UTC im DB-Server.

## Bearer-Token-Ablauf

- Token 1 h gueltig. Auto-Refresh gibt es **nicht** &ndash; nach Ablauf
  laesst der Client eine Aktion fehlschlagen (401) und zeigt den
  Login-Dialog.
- Wer die App uebers Wochenende offen laesst, bekommt Montag Frueh
  Einloggen.

## Optimistische Sperre

- Ohne `expected_updated_at` schreibt der Client "blind" &ndash; das
  ist ein Bug im Repo-Aufruf. Immer den Wert aus `get_vorgang()`
  weiterreichen.
- Uhrzeit-Diffs auf verschiedenen Maschinen ist **egal**, weil der
  Server sich nur mit sich selbst vergleicht.

## Vertragsauftrag-PDF

- Wenn die Vorlage kein AcroForm hat (statisches PDF), gibt es eine
  Warnung und die Original-Datei wird kopiert &ndash; nichts gefuellt.
- Umlaute in Feldnamen scheitern, wenn die PDF-Vorlage andere Encoding
  benutzt (selten, aber schon vorgekommen).

## PySide6-Version

Vertragsboard erwartet PySide6 6.6+. Aeltere Versionen fehlen einige
QtQuick-Widgets &ndash; die App startet dann nicht oder rendert kaputt.

## Windows-Sonderzeichen im Nutzernamen

Der Nutzer-Ordner enthaelt manchmal Umlaute (`C:\Users\Nicolas`). PySide6
klarkommt, aber SQLite unter bestimmten Windows-Locales stoesst sich
an Umlauten im Pfad. Notfall: `%APPDATA%\Vertragsboard\` haendisch auf
ASCII-Pfad umbiegen (Config-Umgebungsvariable `VB_DATA_DIR`).

## PDF-Reader auf Server

`vertragsauftrag.pdf` wird nur befuellt, nicht "geflattet". Beim
Ausdruck ueber Adobe Acrobat sind die Felder weiterhin editierbar &ndash;
wer das nicht will, oeffnet mit Adobe Acrobat Pro und macht `Datei &rarr;
Vereinheitlichen`. Alternativer PDF-Reader (Foxit, Sumatra): sollte
klappen, aber nicht durchgetestet.

## Aktivitaetslog & Datenschutz

`vb_activity.description` enthaelt Namen. Bei DSGVO-Auskunft/-Loeschung
darf dieser Log **nicht** vergessen werden. Empfohlene Retention:
6&ndash;12 Monate.

## Portal-Cron muss laufen

Wenn `portal/cron.php` nicht regelmaessig aufgerufen wird, verschickt
das Portal **keine** Benachrichtigungen. Uptime-Check auf den Cron-Job
kritischer als auf `?action=ping`.

## Auto-Update im Managed-Umfeld

In Umgebungen mit gesperrter Internet-Verbindung schlaegt der Update-
Check fehl. Log fuellt sich mit Timeouts. **Deaktivieren** via
Registry-Key (siehe [Auto-Update](./auto-update.md)) oder Whitelist
fuer `api.github.com` und `github.com` in der Firewall.
