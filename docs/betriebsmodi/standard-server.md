---
title: Standard-Server
sidebar_position: 2
---

# Standard-Server

Der bequemste Weg fuer Kunden, die keinen eigenen Server betreiben
wollen. Der Client verbindet sich mit der zentralen Instanz, die
Nicolas Greulich unter [backend.nicolasgreulich.de](https://backend.nicolasgreulich.de) betreibt.

## Voraussetzungen

- Zugangsdaten (Benutzername, Passwort, ggf. Space-Code) vom Betreiber.
- Internetverbindung waehrend der Nutzung (Auto-Reload alle 3 Sekunden).

## Einrichtung

1. Vertragsboard starten &rarr; Setup-Wizard.
2. **"Standard-Server (Cloud)"** waehlen.
3. Basis-URL `https://backend.nicolasgreulich.de` ist vorbelegt.
4. **Space-Code**, **Benutzername** und **Passwort** eingeben.
5. Fertig &ndash; das Hauptfenster oeffnet sich.

Beim erfolgreichen Login speichert der Client das Bearer-Token in
`%APPDATA%\Vertragsboard\config.json`. Beim naechsten Start wird das
Token per `me`/`ping` validiert; nur wenn es abgelaufen oder ungueltig
ist, erscheint erneut der Login-Dialog.

## Was der Server macht

- Zentrale MariaDB, Multi-Tenancy ueber `space_id`.
- Passwort-Hash mit Argon2id (Fallback Bcrypt).
- Bearer-Token in `vb_sessions` mit Ablaufdatum (Default: 30 Tage).
- Live-Praesenz und Aktivitaets-Log serverseitig persistent.
- Optional: Web-Admin-Portal fuer Nutzerverwaltung im Browser.

## Kollaboration

- Aenderungen anderer Nutzer werden alle 3 Sekunden automatisch
  nachgeladen (Auto-Reload).
- Speicherversuche mit veralteter Version werden mit einem
  **Konflikt-Dialog** abgefangen (optimistische Sperre).
- Die Statusleiste zeigt eine **Online-Liste** &ndash; klickbar fuer
  Details (Kuerzel, Host, letzte Aktivitaet).

## Grenzen

- **Kein direkter DB-Zugriff** &ndash; nur ueber die App / API.
- **Ausfaelle** liegen ausserhalb der Kontrolle des Kunden;
  Betriebsstatus siehe [Support](../support.md).
- **Passwort-Reset**: Selbstservice geht nur ueber das Web-Admin-Portal
  (E-Mail-Link). Ohne Portal muss ein Admin das Passwort direkt setzen.

## Wechsel weg vom Standard-Server

Ist ein spaeterer Umzug auf einen eigenen Server geplant: Daten koennen
vom Betreiber per MySQL-Dump exportiert werden. Der Zielserver benoetigt
das gleiche Schema (`schema.sql` aus dem PHP-Backend-Paket).
