---
title: Funktionsumfang
sidebar_position: 1
---

# Funktionsumfang

Vertragsboard bildet den kompletten Lebenszyklus einer Personaleinstellung
in einem KITA-Traeger ab &ndash; vom Anlegen des Vorgangs ueber die einzelnen
Prozessschritte (MAV informieren, Vertrag vom Rechtsamt, Unterschrift,
Rueckversand) bis zur Archivierung.

## Kernfunktionen

### Vorgangsverwaltung

- Tabelle mit allen laufenden Vorgaengen (Bereich **Aktiv**) und
  abgeschlossenen Vorgaengen (Bereich **Archiv**).
- Master-Detail-Ansicht: links Liste + Filter, rechts Detail-Panel mit
  Prozess-Tab und Vertragsdaten-Tab.
- Sortierung ueber Spalten, Filter nach Warnungen, Volltextsuche.
- Verschieben zwischen Aktiv/Archiv per Klick (`Aktiv&rarr;Archiv` und zurueck).

### Konfigurierbare Prozessschritte

Jeder Schritt hat pro Bereich (Aktiv/Archiv) ein eigenes Label,
Sortierindex und Sichtbarkeits-Flag. Standardauslieferung fuer das Preset
**Standard-Kita** enthaelt 9 Schritte:

| Key | Label (Aktiv) | Label (Archiv) |
|---|---|---|
| `mav` | Info an MAV | MAV informieren |
| `vrk` | VRK-Tabelle | *(nicht sichtbar im Archiv)* |
| `vaDigital` | VA digital | VA digital |
| `vaOriginal` | VA Original ans RA | VA Original |
| `vertragRA` | Vertrag vom RA | Vertrag vom RA & Ausdruck |
| `versandKita` | Versand an Kita / MA | Versand zur Unterschrift |
| `unterschrift` | Unterschrift KK & WO | Unterschrift KK & WO |
| `versandRA` | Versand mit allen U. an RA | Versand mit allen U. an RA |
| `eingangRA` | Eingang (genehmigt) vom RA | Eingang (gesiegelt) vom RA |

Admins koennen Schritte umbenennen, umsortieren, deaktivieren oder neue hinzufuegen.

### Vertragsdaten

Pro Vorgang gepflegt:

- **Vertragsdaten:** Kita/Kostenstelle, Vertragsart, Funktion, Beginn, Beschaeftigungsumfang, Kommentar.
- **Stammdaten:** E-Mail, Telefon, Adresse, PLZ, Ort, Geburtstag, Konfession, Geschlecht, Befristung, freier Notiz-Text. Welche Felder sichtbar sind, entscheidet der Admin pro Space.

### PDF-Export

- **Vorgangs-Report** als PDF (reportlab).
- **Vertragsauftrag** &ndash; die AcroForm-Felder der Original-PDFs des
  Bistums Limburg werden automatisch mit den Vorgangsdaten befuellt
  (`assets/vertragsauftrag/arbeit.pdf`, `praktikant.pdf`).

### Multi-User

- **Live-Praesenz:** wer ist aktuell im Space online.
- **Optimistische Sperre:** speichern zwei Personen denselben Vorgang
  gleichzeitig, wird der zweite Speichervorgang mit einem Konfliktdialog
  abgefangen (Vergleich `expected_updated_at`).
- **Aktivitaetsprotokoll:** wer hat wann welchen Vorgang geaendert.

### Warnungen & Notizen

- Pro Prozessschritt kann eine **Warnung** (mit Text) hinterlegt werden.
- Vorgaenge mit offenen Warnungen sind in der Liste per Filter aufrufbar.

### Auto-Update

- Der Client prueft die GitHub-Releases-API und bietet neuere Versionen
  im Dialog zum Download an.
- Der Installer wird detached gestartet, sodass sich die laufende EXE
  beim Update sauber ersetzen laesst.

### Optionales Web-Portal

- Superadmin (Hoster) verwaltet alle Organisationen.
- Org-Admins pflegen ihre Konfiguration und erhalten opt-in
  E-Mail-Benachrichtigungen bei Aenderungen.
- Impersonate-Feature (Superadmin uebernimmt zeitbegrenzt die Sitzung
  eines Org-Nutzers) mit Audit-Log.

## Was Vertragsboard *nicht* macht

- Kein Ersatz fuer eine vollstaendige Personalverwaltung (Zeiterfassung, Abrechnung).
- Kein DMS (Dokumenten-Management-System). Vorgangs-PDFs werden generiert, aber nicht archiviert.
- Keine Anbindung an DATEV oder HR-Systeme.
- Keine mobile App &ndash; Zielgeraet ist Windows 11 am Buero-Arbeitsplatz.
