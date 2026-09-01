---
title: Support
sidebar_position: 101
---

# Support

Vertragsboard ist ein kleines Projekt &ndash; keine 24/7-Hotline, aber
Fragen und Probleme werden ernst genommen.

## Kanaele

| Kanal | Wofuer | Antwort-Zeit |
|---|---|---|
| **GitHub Issues** | Bug-Reports, Feature-Requests, oeffentliche Diskussion | 1&ndash;3 Werktage |
| **E-Mail** | Vertrauliches (Datenschutz, Sicherheitsluecken) | 1&ndash;5 Werktage |
| **Standard-Server-Support** | Nutzer der offiziellen Instanz | siehe Vertrag |

## GitHub Issues

- Repo: [github.com/nicigrv/vertragsboard/issues](https://github.com/nicigrv/vertragsboard/issues)
- **Bug-Template** benutzen (App-Version, Windows-Version, Repro-Schritte).
- **Feature-Request-Template** benutzen (Use-Case, was funktioniert
  heute, was fehlt).

## E-Mail

- Adresse: `support@nicolasgreulich.de`
- Bitte in der Betreffzeile: `[Vertragsboard]`.
- **Anhang PDF/DB-Dump nur, wenn keine personenbezogenen Daten drin**
  oder mit vorheriger Absprache.

## Vor dem Melden

Diese Checks sparen Zeit auf beiden Seiten:

1. **Neueste Version?** `?action=ping` (Server) oder Client-About-Dialog.
2. **Log gelesen?**
   - Client: `%APPDATA%\Vertragsboard\vertragsboard.log`
   - Backend: PHP-error_log
3. **Reproduzierbar?** Wie oft, unter welchen Umstaenden?
4. **[FAQ](./faq.md)** durchgelesen?

## Sicherheitsluecken

Bitte **nicht** oeffentlich auf GitHub melden. Stattdessen:

- E-Mail an `security@nicolasgreulich.de`
- Detail-Bericht, gerne mit CVE-Vorschlag
- 90-Tage-Disclosure-Fenster nach Coordinated-Fix

## Standard-Server

Nutzer des Standard-Servers (`backend.nicolasgreulich.de`) haben zusaetzliche
Support-Wege:

- Portal &rarr; **Support kontaktieren** (im Fussbereich)
- Impersonate-Sitzung anfordern &ndash; wir schauen mit Ihnen zusammen
  auf das Problem, alles im Aktivitaetslog protokolliert.

## Was NICHT von Support abgedeckt ist

- Netzwerk-/Windows-/OneDrive-Probleme unabhaengig von Vertragsboard.
- Individuelle Excel-Migrationen.
- SLA-Zusagen: keine formalen SLAs. Best-Effort.

## Community

Aktuell keine Chat-Gruppe. Wenn Bedarf besteht, gerne per Issue
melden &ndash; dann richten wir Discussions oder Matrix-Raum ein.

## Beitragen

Antworten auf FAQs, Doku-Korrekturen und Uebersetzungen sehr willkommen &ndash;
Pull-Request gegen dieses Repo:
[github.com/nicigrv/vertragsboard](https://github.com/nicigrv/vertragsboard).
