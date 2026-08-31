import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  to?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Drei Betriebsmodi',
    emoji: '\u{1F310}',
    description: (
      <>
        Standard-Server, eigener PHP-/MariaDB-Server oder rein lokal ueber
        OneDrive &ndash; ein Setup-Wizard fuehrt beim ersten Start durch die
        Auswahl.
      </>
    ),
    to: '/betriebsmodi/uebersicht',
  },
  {
    title: 'Multi-User & Live-Praesenz',
    emoji: '\u{1F465}',
    description: (
      <>
        Mehrere Personen arbeiten gleichzeitig am selben Space. Praesenz-Anzeige,
        optimistische Sperren und ein Aktivitaetsprotokoll halten alles konsistent.
      </>
    ),
    to: '/benutzerhandbuch/live-praesenz',
  },
  {
    title: 'Konfigurierbar ohne Code',
    emoji: '\u{2699}',
    description: (
      <>
        Prozessschritte, Vertragsarten, Kitas/Kostenstellen und Stammdaten-Felder
        pflegen Admins direkt im Dashboard &ndash; nichts ist hart im Code hinterlegt.
      </>
    ),
    to: '/administration/admin-dashboard',
  },
  {
    title: 'PDF-Export & Vertragsauftrag',
    emoji: '\u{1F4C4}',
    description: (
      <>
        Reports als PDF und automatisches Ausfuellen der Original-
        Vertragsauftrags-Formulare des Bistums Limburg via AcroForm.
      </>
    ),
    to: '/benutzerhandbuch/pdf-export',
  },
  {
    title: 'Optionales Web-Portal',
    emoji: '\u{1F5A5}',
    description: (
      <>
        Browserbasiertes Admin-Portal mit Superadmin-Rolle, Impersonate,
        Notifications und Audit-Log. Reines PHP, kein Composer noetig.
      </>
    ),
    to: '/portal/uebersicht',
  },
  {
    title: 'Auto-Update',
    emoji: '\u{1F504}',
    description: (
      <>
        Der Client prueft die GitHub-Releases-API, laedt den passenden Installer
        und startet ihn detached &ndash; ohne administrative Rechte.
      </>
    ),
    to: '/architektur/auto-update',
  },
];

function Feature({title, emoji, description, to}: FeatureItem) {
  const content = (
    <div className={styles.featureCard}>
      <div className={styles.featureEmoji} aria-hidden="true">{emoji}</div>
      <Heading as="h3">{title}</Heading>
      <p>{description}</p>
    </div>
  );
  return (
    <div className={clsx('col col--4')}>
      {to ? <Link to={to} className={styles.featureLink}>{content}</Link> : content}
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
