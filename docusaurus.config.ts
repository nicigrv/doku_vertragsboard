import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Vertragsboard',
  tagline: 'Einstellungs- und Vertragsprozesse fuer KITA-Traeger',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://vertragsboard.docs.example.com',
  baseUrl: '/',

  organizationName: 'nicigrv',
  projectName: 'vertragsboard',

  onBrokenLinks: 'warn',

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nicigrv/vertragsboard/edit/main/docs/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Vertragsboard',
      logo: {
        alt: 'Vertragsboard',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Dokumentation',
        },
        {
          to: '/api/uebersicht',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/nicigrv/vertragsboard',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://github.com/nicigrv/vertragsboard/releases/latest',
          label: 'Download',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentation',
          items: [
            {label: 'Einfuehrung', to: '/'},
            {label: 'Installation', to: '/installation/schnellstart'},
            {label: 'Benutzerhandbuch', to: '/benutzerhandbuch/erster-start'},
            {label: 'Administration', to: '/administration/admin-dashboard'},
          ],
        },
        {
          title: 'Server & API',
          items: [
            {label: 'PHP-Backend', to: '/server-backend/uebersicht'},
            {label: 'Web-Admin-Portal', to: '/portal/uebersicht'},
            {label: 'HTTP-API', to: '/api/uebersicht'},
          ],
        },
        {
          title: 'Projekt',
          items: [
            {
              label: 'Releases',
              href: 'https://github.com/nicigrv/vertragsboard/releases',
            },
            {
              label: 'Issues',
              href: 'https://github.com/nicigrv/vertragsboard/issues',
            },
            {
              label: 'greylo.de',
              href: 'https://greylo.de',
            },
          ],
        },
      ],
      copyright: `Copyright &copy; ${new Date().getFullYear()} Nicolas Greulich &middot; greylo.de. Dokumentation gebaut mit Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'php', 'python', 'json', 'sql', 'ini', 'apacheconf'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
