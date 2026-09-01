---
title: Portal-Rollen
sidebar_position: 3
---

# Portal-Rollen

Das Portal kennt drei Rollen, die **unabhaengig** von den Rollen im
Client-Space vergeben werden.

## Uebersicht

| Rolle | Spaces sehen | Nutzer verwalten | Spaces anlegen | Impersonate | Global-Config |
|---|:-:|:-:|:-:|:-:|:-:|
| **Superadmin** | alle | alle | ja | ja | ja |
| **Space-Admin** | nur zugeteilte | in eigenen Spaces | nein | nein | nein |
| **Support** | alle (nur lesend) | nein | nein | ja | nein |

## Superadmin

- Vollzugriff auf alles.
- Sinnvoll: 1&ndash;2 Personen im IT-Team.
- Anlage nur via CLI (`create_superadmin.php`) &ndash; nicht in der
  Web-Oberflaeche, damit ein kompromittierter Portal-Account nicht
  selbst einen zweiten Superadmin anlegen kann.

## Space-Admin

- Wird beim Anlegen eines Space durch den Superadmin nominiert.
- Kann in "seinem" Space alles, was auch der Client-Admin kann &ndash;
  plus Portal-spezifische Funktionen wie Benachrichtigungen.
- Kann weitere Space-Admins innerhalb seines Space nominieren.

## Support

- Nur-Lese-Blick auf alle Spaces &ndash; ohne Aenderungen.
- **Impersonate** erlaubt: temporaer als beliebiger Client-Nutzer
  einloggen, um ein Problem am Bildschirm nachzustellen.
- Sinnvoll fuer externen Dienstleister oder Zentral-Support.

## Impersonate

- Portal &rarr; Nutzer auswaehlen &rarr; **Als Nutzer einloggen**
- Erzeugt ein Session-Cookie mit `impersonated_by`-Feld.
- Wird im [Aktivitaetslog](../benutzerhandbuch/aktivitaet.md) als
  `impersonate.start` / `impersonate.stop` protokolliert.
- Aktionen im Client zeigen den impersonierten Kuerzel &ndash; sind
  aber vollstaendig als Impersonate erkennbar (Log).

:::warning
Impersonate umgeht die normale Nachvollziehbarkeit ("wer hat was
geaendert?"). Nur mit klarer Support-Vereinbarung nutzen.
:::

## Rollen entziehen

- Portal &rarr; Nutzer &rarr; Rolle aendern oder Nutzer deaktivieren.
- Bestehende Sessions werden **nicht** sofort beendet &ndash; sie
  laufen bis zum naechsten Reload/Ablauf.

## Selbst-Registrierung?

Portal hat **kein** Self-Signup. Neue Portal-Nutzer werden immer durch
Superadmin oder Space-Admin angelegt. Grund: Zugriff auf
personenbezogene Daten &ndash; keine "wer kommt, kommt"-Situation.
