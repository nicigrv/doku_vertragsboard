import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Einfuehrung',
      collapsed: false,
      items: [
        'einfuehrung/funktionsumfang',
        'einfuehrung/glossar',
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        'installation/schnellstart',
        'installation/installer-varianten',
        'installation/updates',
        'installation/deinstallation',
      ],
    },
    {
      type: 'category',
      label: 'Betriebsmodi',
      items: [
        'betriebsmodi/uebersicht',
        'betriebsmodi/standard-server',
        'betriebsmodi/eigener-server',
        'betriebsmodi/lokal-onedrive',
      ],
    },
    {
      type: 'category',
      label: 'Benutzerhandbuch',
      items: [
        'benutzerhandbuch/erster-start',
        'benutzerhandbuch/oberflaeche',
        'benutzerhandbuch/vorgaenge',
        'benutzerhandbuch/prozessschritte',
        'benutzerhandbuch/stammdaten',
        'benutzerhandbuch/warnungen',
        'benutzerhandbuch/pdf-export',
        'benutzerhandbuch/vertragsauftrag',
        'benutzerhandbuch/live-praesenz',
        'benutzerhandbuch/aktivitaet',
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        'administration/admin-dashboard',
        'administration/organisation',
        'administration/einheiten',
        'administration/prozessschritte',
        'administration/vertragsarten',
        'administration/stammdaten-felder',
        'administration/benutzer-rollen',
        'administration/backup',
      ],
    },
    {
      type: 'category',
      label: 'Server-Backend (PHP)',
      items: [
        'server-backend/uebersicht',
        'server-backend/installation',
        'server-backend/konfiguration',
        'server-backend/updates',
        'server-backend/sicherheit',
        'server-backend/betrieb',
      ],
    },
    {
      type: 'category',
      label: 'Web-Admin-Portal',
      items: [
        'portal/uebersicht',
        'portal/installation',
        'portal/rollen',
        'portal/benachrichtigungen',
        'portal/sicherheit',
      ],
    },
    {
      type: 'category',
      label: 'HTTP-API',
      items: [
        'api/uebersicht',
        'api/authentifizierung',
        'api/endpoints',
        'api/objekte',
        'api/fehler',
        'api/datenmodell',
      ],
    },
    {
      type: 'category',
      label: 'Architektur',
      items: [
        'architektur/uebersicht',
        'architektur/client',
        'architektur/auto-update',
        'architektur/fallen',
      ],
    },
    {
      type: 'category',
      label: 'Entwicklung',
      items: [
        'entwicklung/quellcode',
        'entwicklung/build',
        'entwicklung/release',
      ],
    },
    'faq',
    'support',
  ],
};

export default sidebars;
