---
title: Uebersicht
sidebar_position: 1
---

# Server-Backend Uebersicht

Das **PHP-Backend** ist der zentrale HTTP-Endpunkt, den der Vertragsboard-
Client im **Server-Modus** anspricht. Es kapselt die MariaDB und
implementiert Auth, Optimistische Sperre, Praesenz und Aktivitaetslog.

## Bestandteile

| Datei/Ordner | Zweck |
|---|---|
| `api.php` | Single-Endpoint fuer alle Actions (`?action=...`) |
| `config.php` | DB-Zugang und Konstanten (aus `config.example.php`) |
| `schema.sql` | Datenbank-Schema (MariaDB / MySQL) |
| `portal/` | Optionales Web-Admin-Portal, siehe [Portal](../portal/uebersicht.md) |
| `README.md` | Betreiber-Doku im Repo |

## Voraussetzungen

- **PHP 7.4+** (empfohlen: 8.1)
- **MariaDB 10.3+** oder MySQL 8.0+
- **PDO_MySQL**, **JSON**, **mbstring** (i. d. R. Standard)
- Webserver: **Apache** oder **nginx** mit PHP-FPM
- **HTTPS** &ndash; Vertragsboard-Client warnt bei http-URLs

## Betriebsmodell

- Ein **Server** = ein Betreiber (z. B. Ihre IT-Abteilung).
- Ein Server kann beliebig viele **Spaces** (Mandanten) hosten.
- Client entscheidet ueber `space_id`, welchen Space er ansprechen will.

## Standard-Instanz

Anthropic betreibt eine Referenz-Instanz unter
`https://backend.nicolasgreulich.de`. Aufnahme in diese Instanz
erfolgt manuell nach Absprache &ndash; siehe [Standard-Server](../betriebsmodi/standard-server.md).

## Alternative: eigener Server

Wer die Datenhoheit vollstaendig behalten will, hostet das PHP-Backend
selbst &ndash; siehe [Installation](./installation.md).

## Kein API-Betrieb noetig?

Fuer Ein-Personen-Betrieb oder kleine Teams mit gemeinsamer
Datei-Ablage genuegt der [Lokal/OneDrive-Modus](../betriebsmodi/lokal-onedrive.md).
Kein Server, keine PHP-Kenntnisse, keine DB-Administration.
