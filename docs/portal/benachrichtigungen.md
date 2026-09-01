---
title: Benachrichtigungen
sidebar_position: 4
---

# Benachrichtigungen

Das Portal kann bei bestimmten Ereignissen **E-Mails** verschicken.
Nutzung: Fristen im Blick behalten ohne den Client dauerhaft offen zu
halten.

## Regel-Typen

| Ereignis | Ausloeser |
|---|---|
| **Neuer Vorgang** | `vorgang.create` im Aktivitaetslog |
| **Vertragsende bevorsteht** | `vorgang.befristung` erreicht Vorlauf (z. B. 30 Tage) |
| **Warnung ungeloest** | Step-Note ist &ge; N Tage alt |
| **Kein Fortschritt** | Vorgang &ge; N Tage in gleichem Step |
| **Login-Anomalie** | 5+ fehlgeschlagene Logins innerhalb 1 h |

## Anlegen

- Portal &rarr; Space &rarr; Tab "Benachrichtigungen" &rarr; **Neue Regel**
- Felder:
  - **Name** (freier Text)
  - **Ereignis-Typ** (siehe Tabelle)
  - **Bedingung** (z. B. Vorlauf in Tagen)
  - **Empfaenger** (Portal-Nutzer oder freie E-Mail-Adresse)
  - **Aktiv** (Checkbox)

## Ablauf

- Regeln liegen in `vb_portal_notifications`.
- Cron-Job (`portal/cron.php`, alle 5 min) prueft:
  - `SELECT` auf `vb_activity` und `vb_vorgaenge`
  - Ergebnis-Zeilen mit `vb_portal_notifications` matchen
  - Fuer Treffer: Eintrag in `vb_portal_notify_queue`
  - Queue abarbeiten, `send_mail()` &rarr; SMTP oder `mail()`
- **Deduplizierung:** jede Regel/Vorgang-Kombination verschickt max.
  1 Mail pro 24 h.

## E-Mail-Inhalt

- **Betreff:** `[Vertragsboard/<Space>] <Regelname>`
- **Body:** Text-Zusammenfassung mit Link ins Portal (Impersonate)
- **HTML** aktuell nicht &ndash; Plaintext ist bewusst gewaehlt fuer
  weniger Spam-Bewertung.

## Testen

Portal &rarr; Regel &rarr; **Test-Mail senden**. Verschickt eine
Beispiel-Mail an die konfigurierte Adresse mit Dummy-Werten.

## Abmelden

- Empfaenger kann per Portal (falls Portal-Nutzer) die Regel
  deaktivieren.
- Externe Empfaenger: an Space-Admin melden &ndash; keine 1-Klick-Abmelde-URL
  in der Mail (Feature offen).

## Datenschutz

- E-Mails enthalten Namen und ggf. Vorgangsstatus &ndash; wie ein
  interner Bericht. Nicht an Extern schicken.
- SMTP-Zugang liegt in `config.php` (siehe [Portal-Installation](./installation.md)).
- Alle Ausgangs-Mails werden 30 Tage in `vb_portal_mail_log` protokolliert
  (nur Header, kein Body).

## Fehlerfaelle

- SMTP-Ausfall: Queue-Eintrag bleibt liegen, wird beim naechsten
  Cron-Lauf erneut versucht (max. 5 Retries, dann Fehler).
- Portal &rarr; Tab "Log" zeigt den Status jeder Regel-Ausfuehrung.
