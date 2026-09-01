---
title: Release
sidebar_position: 3
---

# Release-Prozess

Ein Vertragsboard-Release umfasst Client-Installer, Web-Installer und
optional das Backend-Zip. Der ganze Prozess ist bewusst manuell &ndash;
kein CI-System, aber klar dokumentiert.

## Vorbereitung

1. **Version anheben** in `vertragsboard/__init__.py`:
   ```python
   __version__ = "1.3.0"
   ```
2. **Changelog** aktualisieren:
   `docs/CHANGELOG.md` &ndash; Punkt pro Bugfix/Feature.
3. **Migration** (falls DB-Schema geaendert):
   `php_backend/migrations/1.3.0-XYZ.sql` mit Rueckwaerts-Kommentaren.
4. **Tests** laufen lassen:
   ```bash
   pytest
   ```

## Build

```bash
build.bat
```

Ergibt in `dist/`:

- `Vertragsboard-Setup-1.3.0.exe`
- `Vertragsboard-WebSetup-1.3.0.exe`
- SHA256-Summen (`dist/SHA256SUMS.txt`)

Zusaetzlich Backend:

```bash
cd php_backend && zip -r ../dist/vertragsboard-backend-1.3.0.zip . -x '*.git*'
```

## Manual-Test

Auf einem sauberen Windows-VM (Windows 10 x64):

- Full-Installer &ndash; installiert, Startmenue-Eintrag, App startet.
- Setup-Wizard durchspielen (Server-Modus, Lokal-Modus).
- Neuen Vorgang anlegen, Step-Toggle, PDF-Export.
- Update aus 1.2.x auf 1.3.0 pruefen &ndash; DB bleibt intakt.

## Tag setzen

```bash
git tag -a v1.3.0 -m "Release 1.3.0"
git push origin v1.3.0
```

## GitHub-Release

- Auf GitHub &rarr; Releases &rarr; **Draft new release**
- Tag: `v1.3.0`
- Titel: `Vertragsboard 1.3.0`
- Body: Changelog-Ausschnitt + wichtige Punkte
- Assets anhaengen:
  - `Vertragsboard-Setup-1.3.0.exe`
  - `Vertragsboard-WebSetup-1.3.0.exe`
  - `vertragsboard-backend-1.3.0.zip`
  - `SHA256SUMS.txt`
- Publish

Das Auto-Update laesst Bestandsclients innerhalb von 24 h anspringen.

## Standard-Server updaten

Nur wenn Backend-Aenderungen dabei sind:

1. Wartungsfenster ankuendigen (Portal-Benachrichtigung).
2. Backup vom Prod-Server (DB-Dump + `config.php`).
3. `vertragsboard-backend-1.3.0.zip` entpacken, `config.php`
   uebertragen.
4. Migration einspielen.
5. Symlink flip.
6. `?action=ping` pruefen.

## Rollback

Wenn ein kritischer Bug im Feld auftaucht:

- **Client:** neue **hotfix**-Version 1.3.1 bauen und uploaden. Nutzer
  updaten automatisch.
- **Backend:** alten Code zurueckspielen. Migration ist meist
  rueckwaerts kompatibel (neue Spalten stoeren die alte Version nicht).
- Notfall-Weg: Standard-Server auf Wartung, betroffene Nutzer per
  Portal-Benachrichtigung informieren.

## Post-Release

- Release-Notes auf Docusaurus verlinken.
- Frage-Kanaele beobachten (E-Mail, GitHub-Issues).
- Nach 1&ndash;2 Wochen ohne Incidents: Release als "stable" markieren.
