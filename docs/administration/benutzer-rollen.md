---
title: Benutzer & Rollen
sidebar_position: 7
---

# Benutzer & Rollen

Ein Space kennt drei Rollen: **admin**, **user**, **readonly**. Die
Superadmin-Rolle existiert nur im [Web-Admin-Portal](../portal/uebersicht.md).

## Uebersicht

| Rolle | Vorgaenge lesen | Vorgaenge anlegen/aendern | Loeschen | Admin-Dashboard | Nutzer anlegen |
|---|:-:|:-:|:-:|:-:|:-:|
| **admin** | ja | ja | ja | ja | ja |
| **user** | ja | ja | ja (eigene) | nein | nein |
| **readonly** | ja | nein | nein | nein | nein |

## Anlegen

- Admin-Dashboard &rarr; Tab "Benutzer" &rarr; **Neu**
- Felder:
  - **Kuerzel** (max. 3 Zeichen, eindeutig im Space)
  - **Voller Name** (Anzeige in Aktivitaetslog, PDF)
  - **Passwort** (min. 8 Zeichen, wird beim ersten Login geaendert)
  - **Rolle**
  - **Aktiv** (Checkbox)

## Passwort zuruecksetzen

- Nur Admin kann Passwoerter aendern.
- **Neues Passwort** setzen, an Nutzer weitergeben, Nutzer wird beim
  naechsten Login zum Aendern aufgefordert.
- Server-Modus: Passwoerter werden mit **PHP `password_hash()`** (bcrypt)
  gespeichert.
- Lokal-Modus: hier existieren keine Passwoerter, Nutzung ueber
  Windows-Anmeldung.

## Deaktivieren vs. Loeschen

| Aktion | Wirkung | Anwendungsfall |
|---|---|---|
| **Deaktivieren** | Login gesperrt, Kuerzel bleibt in Historie | Elternzeit, temporaerer Weggang |
| **Loeschen** | Nutzer weg, Kuerzel im Aktivitaetslog bleibt als Text | dauerhafter Austritt |

**Empfehlung:** immer erst deaktivieren, spaeter loeschen (z. B. nach
1 Jahr). Damit gibt es keine Zeit, in der noch offene Sitzungen ins
Leere laufen.

## Rollen aendern

- Doppelklick in der Nutzerliste
- Aenderung wirkt ab dem naechsten Login (bestehende Sessions
  behalten ihre alte Rolle bis Ablauf des Bearer-Tokens).

## Admin verlieren

Wenn der letzte Admin geloescht/deaktiviert wird, laesst sich der
Space nicht mehr konfigurieren. **Notfall-Recovery**:

- **Server-Modus:** SQL-Update in `vb_users` (`role='admin'` fuer einen
  Bestandsnutzer) oder ueber [Web-Admin-Portal](../portal/uebersicht.md).
- **Lokal-Modus:** Anwender ist immer Admin des lokalen Space &ndash;
  betrifft nur Server-Modus.

## Passwort-Regeln

- Min. 8 Zeichen
- Keine Klartext-Speicherung
- Login-Fehlversuche: aktuell **kein Rate-Limit** in Vertragsboard
  selbst (siehe [Sicherheit](../server-backend/sicherheit.md) fuer
  Vorschlaege auf Webserver-Ebene).
