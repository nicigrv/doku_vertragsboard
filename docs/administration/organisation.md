---
title: Organisation
sidebar_position: 2
---

# Organisation

Die **Organisation** ist die oberste Ebene eines Space. Sie erscheint
im PDF-Kopf, in der Statusleiste und bei der Anmeldung.

## Felder

| Feld | Bedeutung |
|---|---|
| **Name** | Voller Name des Traegers, z. B. "Katholische Kirchengemeinde Sankt Bonifatius" |
| **Kurzname** | Kuerzel fuer Titelleiste und Reports (max. 40 Zeichen) |
| **Adresse** | Freitext-Anschrift, optional im PDF |
| **Logo** | PNG/JPG, wird im PDF-Report oben rechts eingebettet |

## Logo hochladen

- Datei &rarr; Bild auswaehlen &rarr; Vorschau.
- Empfohlen: **PNG mit transparentem Hintergrund**, min. 300 px hoch.
- Wird als Base64 in der `space_config`-Tabelle abgelegt (Server-Modus)
  oder in `vertragsboard.db` (Lokal).

:::tip
Fuer schnellen Ausdruck reicht ein 300&times;300 px-Logo. Groessere
Bilder blasen die Datenbank auf, ohne die PDF-Qualitaet spuerbar zu
verbessern.
:::

## Auswirkungen

- **Titelleiste** der App: `Vertragsboard - <Kurzname>`
- **PDF-Report**: Logo oben rechts, Name in Kopfzeile
- **Vertragsauftrag-PDF**: nur die Feld-Werte, die im Original-PDF
  vorgesehen sind (Organisation wird i. d. R. **nicht** ins Formular
  gedruckt).

## Mehrere Organisationen?

Ein Space = eine Organisation. Wer mehrere Traeger parallel verwalten
muss, legt **mehrere Spaces** an (siehe [Web-Admin-Portal](../portal/uebersicht.md)).
