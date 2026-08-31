# Vertragsboard - Dokumentation

Docusaurus-Projekt fuer die Dokumentation der Vertragsboard-Anwendung
(Windows-Desktop, PHP-Backend, Web-Admin-Portal).

Der Anwendungs-Quellcode selbst liegt in `C:\Users\nicol\Documents\boni_v15`
und wird nicht committet; oeffentlich verfuegbar sind nur die Releases unter
<https://github.com/nicigrv/vertragsboard>.

## Lokal entwickeln

```bash
npm install
npm run start
```

Startet einen Dev-Server unter <http://localhost:3000>. Aenderungen an
Markdown-/MDX-Dateien werden live nachgeladen.

## Statische Site bauen

```bash
npm run build
npm run serve
```

## Aufbau

- `docs/` &ndash; die eigentliche Dokumentation (Sidebar-Reihenfolge siehe `sidebars.ts`).
- `src/pages/index.tsx` &ndash; Startseite.
- `src/components/HomepageFeatures/` &ndash; Feature-Kacheln auf der Startseite.
- `docusaurus.config.ts` &ndash; Site-Konfiguration.
