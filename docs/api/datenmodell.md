---
title: Datenmodell
sidebar_position: 6
---

# Datenmodell

Das Backend legt Daten in MariaDB ab. Kernstueck ist `vb_vorgaenge`
mit den beiden Kindtabellen `vb_steps` und `vb_notes`.

## Tabellen im Ueberblick

| Tabelle | Zweck |
|---|---|
| `vb_spaces` | Mandanten (`space_id`, Name) |
| `vb_users` | Nutzer eines Space |
| `vb_units` | Kitas/Einheiten pro Space |
| `vb_vorgaenge` | Kern-Objekt (ein Zeile = ein Vertragsvorgang) |
| `vb_steps` | Prozessschritte pro Vorgang |
| `vb_notes` | Freitext-Notizen an Steps (Warnungen) |
| `vb_space_config` | Space-Konfig (JSON-Blob) |
| `vb_activity` | Aktivitaets-Log |
| `vb_presence` | Live-Praesenz |
| `vb_revoked_tokens` | Token-Blacklist (fuer Logout) |
| `vb_portal_*` | Portal-Tabellen (nur wenn Portal aktiv) |

## Schema (verkuerzt)

### `vb_vorgaenge`

```sql
CREATE TABLE vb_vorgaenge (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  space_id VARCHAR(64) NOT NULL,
  area ENUM('active','archive') NOT NULL DEFAULT 'active',

  name VARCHAR(255) NOT NULL,
  kita BIGINT UNSIGNED NULL,
  art VARCHAR(64) NULL,
  funktion VARCHAR(128) NULL,
  beginn DATE NULL,
  bu VARCHAR(32) NULL,

  email VARCHAR(255) NULL,
  telefon VARCHAR(64) NULL,
  adresse TEXT NULL,
  plz VARCHAR(16) NULL,
  ort VARCHAR(128) NULL,
  geburtstag DATE NULL,
  konfession VARCHAR(32) NULL,
  geschlecht CHAR(1) NULL,
  befristung DATE NULL,
  notiz TEXT NULL,

  kommentar TEXT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(8) NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(8) NOT NULL,

  INDEX (space_id, area),
  INDEX (space_id, updated_at)
);
```

### `vb_steps`

```sql
CREATE TABLE vb_steps (
  vorgang_id BIGINT UNSIGNED NOT NULL,
  step_index INT NOT NULL,
  value TINYINT NOT NULL DEFAULT 0,
  date DATE NULL,
  by_kuerzel VARCHAR(8) NULL,
  toggled_at DATETIME NULL,

  PRIMARY KEY (vorgang_id, step_index),
  FOREIGN KEY (vorgang_id) REFERENCES vb_vorgaenge(id) ON DELETE CASCADE
);
```

### `vb_notes`

```sql
CREATE TABLE vb_notes (
  vorgang_id BIGINT UNSIGNED NOT NULL,
  step_index INT NOT NULL,
  note TEXT NOT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (vorgang_id, step_index),
  FOREIGN KEY (vorgang_id) REFERENCES vb_vorgaenge(id) ON DELETE CASCADE
);
```

### `vb_activity`

```sql
CREATE TABLE vb_activity (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  space_id VARCHAR(64) NOT NULL,
  by_kuerzel VARCHAR(8) NULL,
  kind VARCHAR(32) NOT NULL,
  vorgang_id BIGINT UNSIGNED NULL,
  description TEXT NULL,

  INDEX (space_id, at),
  INDEX (vorgang_id)
);
```

### `vb_users`

```sql
CREATE TABLE vb_users (
  space_id VARCHAR(64) NOT NULL,
  kuerzel VARCHAR(8) NOT NULL,
  name VARCHAR(128) NOT NULL,
  pw_hash VARCHAR(255) NOT NULL,
  role ENUM('admin','user','readonly') NOT NULL DEFAULT 'user',
  active TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (space_id, kuerzel)
);
```

### `vb_presence`

```sql
CREATE TABLE vb_presence (
  space_id VARCHAR(64) NOT NULL,
  kuerzel VARCHAR(8) NOT NULL,
  host VARCHAR(64) NOT NULL,
  login_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_beat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (space_id, kuerzel, host)
);
```

## Multi-Tenancy

- Jede Zeile trag `space_id`. Queries des Clients enthalten immer
  `WHERE space_id = ?`.
- **Keine Cross-Space-Constraints** &ndash; ein Vorgang aus Space A
  kann keine Kita aus Space B referenzieren.

## Optimistische Sperre

Der Client sendet bei `update`/`delete` das `expected_updated_at`.
Serverseitig:

```sql
UPDATE vb_vorgaenge
   SET ...
 WHERE id = ?
   AND updated_at = ?
```

Wenn 0 Zeilen betroffen sind &rarr; Konflikt (HTTP 409). Der Client
laedt die aktuelle Version und zeigt Merge-Dialog.

## SQLite (Lokal-Modus)

Gleiche Tabellenstruktur wie MariaDB &ndash; Typen sind SQLite-typischer
(`INTEGER PRIMARY KEY AUTOINCREMENT` statt `BIGINT AUTO_INCREMENT`).
`vertragsboard.db` liegt im OneDrive-Ordner.
