---
title: Vertragsboard
sidebar_position: 1
---

# Vertragsboard

**Vertragsboard** ist eine Windows-Desktop-Anwendung fuer die Verwaltung
von Einstellungs- und Vertragsprozessen bei **KITA-Traegern**. Mehrere
Personen arbeiten gleichzeitig &ndash; entweder gemeinsam ueber einen
zentralen PHP-/MariaDB-Server oder lokal via OneDrive.

- **Herausgeber:** Nicolas Greulich &middot; [greylo.de](https://greylo.de) &middot; nicolas.greulich@greylo.de
- **Repository / Releases:** [github.com/nicigrv/vertragsboard](https://github.com/nicigrv/vertragsboard)
- **Aktuelle Version:** siehe [Release-Seite](https://github.com/nicigrv/vertragsboard/releases/latest)

## Fuer wen ist diese Dokumentation?

| Zielgruppe | Empfohlener Einstieg |
|---|---|
| **Anwender:innen** (Kita-Buero, Personalverwaltung) | [Installation](./installation/schnellstart.md) &rarr; [Benutzerhandbuch](./benutzerhandbuch/erster-start.md) |
| **Admins** (Nutzerverwaltung, Konfiguration) | [Admin-Dashboard](./administration/admin-dashboard.md) &rarr; [Benutzer & Rollen](./administration/benutzer-rollen.md) |
| **IT / Hoster** (eigenen Server betreiben) | [Server-Backend](./server-backend/uebersicht.md) &rarr; [Web-Admin-Portal](./portal/uebersicht.md) |
| **Entwickler:innen / Integratoren** | [HTTP-API](./api/uebersicht.md) &rarr; [Architektur](./architektur/uebersicht.md) |

## In drei Saetzen

- Ein **Vorgang** ist eine Einstellung (Person + Kita + Vertragsart);
  daran haengen definierte **Prozessschritte** mit Datum, Notiz und
  Bearbeiter-Kuerzel.
- Alle Prozessschritte, Vertragsarten und Einheiten (Kitas) werden im
  **Admin-Dashboard** frei konfiguriert &ndash; nichts ist hart im Code.
- Datenhaltung ist ein Betriebsmodus: **zentral gehosteter Server**,
  **eigener PHP-/MariaDB-Server** oder **lokal (SQLite / OneDrive)**.

## Betriebsmodi in Kurzform

| Modus | Wann sinnvoll |
|---|---|
| **Standard-Server** | Zugang zu einer gehosteten Instanz vorhanden. Mehrere Nutzer gleichzeitig live. |
| **Eigener Server** | Das PHP-/MariaDB-Backend wird selbst betrieben. Standard-Webhosting reicht. |
| **Lokal / OneDrive** | Einzelperson oder wechselnder Zugriff mehrerer PCs ueber OneDrive-Sync. |

Der Setup-Wizard beim ersten Start fuehrt durch die Auswahl.

## Rollen

- **admin** &ndash; volle Rechte, Admin-Dashboard, Nutzerverwaltung, Konfiguration
- **user** &ndash; Vorgaenge anlegen, bearbeiten, loeschen
- **readonly** &ndash; nur lesen

## Was diese Doku *nicht* ist

- **Kein Marketing-Prospekt.** Sie richtet sich an Personen, die die
  Anwendung installieren, betreiben oder pflegen.
- **Keine API-Referenz auf Byte-Ebene.** Der [API-Vertrag](./api/uebersicht.md)
  ist das Original; diese Doku fasst zusammen und verlinkt.
- **Kein Code-Repository.** Der Client-Code liegt lokal beim Herausgeber;
  das GitHub-Repo enthaelt nur `README.md` und die Release-Assets.
