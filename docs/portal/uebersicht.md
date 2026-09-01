---
title: Uebersicht
sidebar_position: 1
---

# Web-Admin-Portal

Das **Portal** ist eine optionale Web-Oberflaeche, mit der ein Betreiber
mehrere Vertragsboard-Spaces verwaltet, ohne pro Space einen Desktop-
Client zu installieren.

## Wozu?

- **Spaces anlegen** (Mandanten-Verwaltung)
- **Nutzer verwalten** ueber Spaces hinweg
- **Benachrichtigungen** (E-Mail bei bestimmten Ereignissen)
- **Impersonate**: als Nutzer eines Space einloggen, um Support zu leisten
- **Uebersicht:** Aktivitaet, Login-Historie, DB-Groesse pro Space

## Zielgruppe

- **IT-Team** eines Traegers, das mehrere Kirchengemeinden hostet
- **Anthropic**-Betrieb der Standard-Instanz
- Nicht gedacht fuer den einzelnen Anwender im Alltag

## Rollen im Portal

| Rolle | Rechte |
|---|---|
| **Superadmin** | Vollzugriff auf alle Spaces, kann Spaces anlegen/loeschen |
| **Space-Admin** | Nur "sein" Space, wie im Client-Dashboard, plus Benachrichtigungen konfigurieren |
| **Support** | Kann impersonaten, aber nichts anlegen/loeschen |

Die Rolle **Superadmin** existiert **nur** im Portal &ndash; im Client
gibt es sie nicht.

## Technik

- **PHP 7.4+**, kein Framework, Templates in `portal/templates/`
- **Session-basiert** (kein Bearer-Token wie in der API)
- **Optional aktiv** &ndash; Backend laeuft auch ohne Portal
- Datei-Basis: `php_backend/portal/`

## Wann brauche ich das Portal?

- **Kleiner Traeger, ein Space:** nein &ndash; der Client-Admin-Dashboard
  reicht.
- **Kirchenkreis mit 5+ Gemeinden:** ja &ndash; sonst wird
  Multi-Space-Admin muehsam.
- **Hoster/Dienstleister:** ja &ndash; Impersonate & zentrale
  Aktivitaet ist unbezahlbar fuer Support.

## Weiter

- [Installation](./installation.md)
- [Rollen im Portal](./rollen.md)
- [Benachrichtigungen](./benachrichtigungen.md)
- [Sicherheit](./sicherheit.md)
