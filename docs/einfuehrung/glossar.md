---
title: Glossar
sidebar_position: 2
---

# Glossar

Zentrale Begriffe, die in dieser Dokumentation immer wieder auftauchen.

## Anwendung & Datenmodell

**Vorgang**
: Zentraler Datensatz: eine geplante oder abgeschlossene Einstellung.
  Enthaelt Person (Name, Vertragsart, Funktion), Vertragsdaten,
  Stammdaten und die Prozessschritte.

**Prozessschritt / Step**
: Ein definierter Meilenstein eines Vorgangs, z. B. *"Info an MAV"*.
  Trackt Datum, Bearbeiter-Kuerzel, Zeitpunkt und Notiz.

**Bereich**
: `aktiv` (laufend) oder `archiv` (abgeschlossen). Vorgaenge wandern
  per Klick zwischen beiden Bereichen.

**Kita / Einheit**
: Organisationseinheit mit Code und Anzeige-Name. Der Admin definiert,
  ob "Einheit" als "Kita", "Kostenstelle" o. ae. bezeichnet wird
  (Feld `unit_label`).

**Vertragsart**
: Klartext-Bezeichnung des Vertrags (Arbeitsvertrag, Ausbildungsvertrag,
  FSJ, BFD, ...). Wird im Admin-Dashboard gepflegt.

**Stammdaten-Felder**
: Zehn optionale Felder pro Vorgang (E-Mail, Telefon, Adresse, PLZ, Ort,
  Geburtstag, Konfession, Geschlecht, Befristung, Notiz). Sichtbarkeit
  pro Space konfigurierbar.

**Warnung**
: Ein pro Prozessschritt hinterlegbarer Hinweistext (z. B. *"noch kein
  Ausdruck erhalten"*). Vorgaenge mit Warnungen lassen sich filtern.

## Multi-Tenancy

**Space**
: Mandant. Eine Datenbank kann mehrere Spaces enthalten, jeder Nutzer
  gehoert zu genau einem Space (Feld `default_space`). Beim eigenen
  Server ist typischerweise nur **ein** Space sinnvoll (Code: `default`).

**Space-Code**
: Kurzer eindeutiger Bezeichner, den der Client beim Login mitschickt
  (z. B. `default`, `bonifatius`, `kita-xyz`).

## Rollen

**admin**
: Volle Rechte inkl. Admin-Dashboard, Nutzerverwaltung, Konfiguration.

**user**
: Vorgaenge anlegen/bearbeiten/loeschen, Warnungen, PDF-Export.

**readonly**
: Nur lesen, keine Speicher-Buttons.

**Superadmin** *(nur Portal)*
: Setzt der Betreiber der Instanz ein. Verwaltet **alle** Organisationen,
  kann Nutzer impersonieren. Unabhaengig von der Rolle im Client
  (`TINYINT vb_users.superadmin`).

## Backends & Betriebsmodi

**Backend**
: Aus Sicht des Clients: die Datenquelle. Zwei Implementierungen:
  `SqliteRepo` (lokal) und `ApiRepo` (HTTP gegen PHP-Backend).

**Standard-Server**
: Vorkonfigurierte Basis-URL &ndash; die zentral gehostete Instanz von
  Nicolas Greulich unter <https://backend.nicolasgreulich.de>.

**Eigener Server**
: Der Kunde installiert die `Vertragsboard-PHP-Backend.zip` auf seinem
  eigenen Webhosting.

**Lokal-Modus**
: Datenhaltung als SQLite-Datei, entweder rein lokal oder in einem
  OneDrive-Ordner (fuer den Wechsel zwischen mehreren PCs).

## Auth

**Bearer-Token**
: Opaker 64-Hex-String, den der Server bei erfolgreichem Login ausstellt.
  Der Client schickt ihn zusaetzlich als `X-Auth-Token`-Header (fuer
  Shared-Hoster, die den `Authorization`-Header strippen).

**PORTAL_SECRET**
: 64 Hex-Zeichen langer Schluessel in `config.php`. HMAC-Signatur fuer
  Unsubscribe- und Password-Reset-Tokens.

**PORTAL_CRON_KEY**
: Auth-Key fuer `portal/cron.php`. Verhindert, dass beliebige Aufrufer
  die Mail-Queue triggern.

## Preset

**bonifatius**
: Interner Key fuer das "Standard-Kita"-Preset (9 Prozessschritte, 8
  Vertragsarten, 2 Beispiel-Kitas). Historischer Name; die UI zeigt
  *"Standard-Kita (9 Prozessschritte)"*.

**leer**
: Preset ohne Schritte/Arten/Einheiten &ndash; der Admin pflegt alles selbst.

## Technische Begriffe

**AcroForm**
: PDF-Standard fuer ausfuellbare Formulare. Vertragsboard fuellt die
  AcroForm-Felder der Vertragsauftrag-PDFs des Bistums Limburg via `pypdf`.

**Optimistische Sperre**
: `expected_updated_at` wird beim Speichern mitgeschickt; weicht sie vom
  Server-Wert ab, gibt es HTTP 409. Der Client zeigt einen Konfliktdialog.

**Impersonate**
: Superadmin uebernimmt Session eines anderen Users (TTL 1h, orange
  Warnleiste sichtbar, im Audit-Log dokumentiert).
