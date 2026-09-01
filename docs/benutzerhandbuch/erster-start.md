---
title: Erster Start
sidebar_position: 1
---

# Erster Start

Der erste Start unterscheidet sich davon, ob der Setup-Wizard bereits
gelaufen ist oder nicht.

## Wenn noch keine Konfiguration existiert

Es gibt keine `%APPDATA%\Vertragsboard\config.json`. Der
[Setup-Wizard](../installation/schnellstart.md#erste-anmeldung) startet
in drei Schritten:

1. **Backend waehlen** &ndash; Standard-Server, Eigener Server oder Lokal.
2. **Anmeldung / Ersteinrichtung** &ndash; je nach Modus Login-Formular
   oder Datenordner-Auswahl.
3. **Fertig** &ndash; Zusammenfassung, "Fertig" klicken, Hauptfenster oeffnet sich.

Danach existiert `config.json` und der Wizard wird nicht mehr angezeigt.

## Regulaerer Start (Konfiguration vorhanden)

- **Splash-Screen** &ndash; kurz sichtbar, laedt die Konfiguration.
- **Server-Modus:** Token wird per `me` validiert. Wenn ok, direkt weiter;
  sonst Login-Dialog.
- **Lokal-Modus:** Login-Dialog gegen die lokale SQLite-DB.
- **Hauptfenster** oeffnet sich mit der Vorgangsliste im Bereich *Aktiv*.
- **Auto-Update-Check** laeuft im Hintergrund. Nur wenn ein Update
  verfuegbar ist, oeffnet sich der Update-Dialog.

## Login-Dialog

- **Benutzername** &ndash; Klein-/Grossschreibung wird ignoriert.
- **Passwort** &ndash; Klartext-Feld, Enter startet den Login.
- Vergessenes Passwort?
  - **Standard-Server:** Reset per Web-Admin-Portal (E-Mail-Link).
  - **Eigener Server** ohne Portal: Admin setzt das Passwort direkt.
  - **Lokal:** Admin ueber Windows-Konto mit Zugriff auf die
    DB setzt Passwort via SQL neu (oder loeschen &amp; neu anlegen).

## Was tun bei Fehlermeldungen?

| Meldung | Ursache | Loesung |
|---|---|---|
| *"Backend nicht erreichbar"* | Server offline, DNS-/Firewall-Problem | Basis-URL testen: `curl -i https://.../api.php?action=me` sollte HTTP 401 liefern |
| *"Benutzername oder Passwort ist falsch"* | Tippfehler / geaendertes Passwort | Neu eingeben oder Admin fragen |
| *"Session abgelaufen"* | Token > 30 Tage alt | Erneut anmelden |
| *"Vorgang wurde inzwischen geaendert"* | Konflikt (jemand anderes hat schneller gespeichert) | Konflikt-Dialog: entweder Aenderungen des anderen uebernehmen oder eigene "erzwingen" |

## Konfiguration zuruecksetzen

Um den Setup-Wizard erneut zu erzwingen (z. B. um den Betriebsmodus zu
wechseln):

```bash
del "%APPDATA%\Vertragsboard\config.json"
```

**Achtung:** dabei geht das gespeicherte Token verloren &ndash; beim
naechsten Start erscheint der komplette Wizard.
