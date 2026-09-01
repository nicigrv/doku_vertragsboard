---
title: Uebersicht
sidebar_position: 1
---

# Architektur

Vertragsboard ist eine **Desktop-App mit austauschbarem Backend**. Der
Client bleibt gleich, egal ob die Daten in einer lokalen SQLite-Datei
oder auf einem PHP-Server liegen.

## Grober Aufbau

```
+-----------------------------------+
| Vertragsboard-Client (PySide6)    |
|                                   |
|  UI  ->  Controller  ->  Repo     |
+-----------------|-----------------+
                  |
         +--------+--------+
         |                 |
  +-----------+     +--------------+
  | SqliteRepo|     |  ApiRepo     |
  | (lokal)   |     |  (HTTP/JSON) |
  +-----------+     +--------------+
         |                 |
   vertragsboard.db    api.php + MariaDB
```

## Zentrale Idee: Repo-Abstraktion

Alle Persistenz-Logik hinter einem einzigen Interface `Repo`
(`vertragsboard/backend/base.py`).

```python
class Repo(ABC):
    def list_vorgaenge(self, area: str) -> list[Vorgang]: ...
    def get_vorgang(self, id: int) -> Vorgang: ...
    def create_vorgang(self, data: dict) -> int: ...
    def update_vorgang(self, id, fields, expected_updated_at) -> None: ...
    def delete_vorgang(self, id, expected_updated_at) -> None: ...
    def toggle_step(self, vorgang_id, step_index, value) -> None: ...
    ...
```

Zwei Implementierungen:

- **`SqliteRepo`** &ndash; direkt gegen die lokale DB.
- **`ApiRepo`** &ndash; sendet POSTs an `api.php` und mapped die
  Antworten.

Die UI kennt diesen Unterschied nicht.

## Modus-Auswahl

Beim Start liest `main.py` die Konfiguration und laesst
`backend/factory.py` das passende Repo bauen. Modi:

- **`sqlite:<path>`** &ndash; Lokal/OneDrive
- **`api:<url>:<space_id>`** &ndash; Server

## Wichtige Verzeichnisse

| Pfad | Zweck |
|---|---|
| `vertragsboard/ui/` | Fenster, Dialoge, Widgets (PySide6) |
| `vertragsboard/backend/` | Repos, Factory, Presets |
| `vertragsboard/pdf/` | PDF-Export, Vertragsauftrag |
| `vertragsboard/config.py` | App-Konstanten, Pfade |
| `vertragsboard/updater.py` | Auto-Update Logik |
| `php_backend/` | Server-Backend (PHP) |

## Datenfluesse

1. **Nutzer klickt Statuspunkt** &rarr; UI ruft `repo.toggle_step(...)`.
2. **SqliteRepo:** direktes `UPDATE`, `at`+`by` mitgeschrieben.
3. **ApiRepo:** POST `?action=step.toggle`, wartet auf Antwort.
4. **UI** aktualisiert das Widget lokal.
5. Aktivitaets-Log wird serverseitig gepflegt (SqliteRepo: lokal, ApiRepo: durch api.php).

## Threading

- UI-Thread: nur Anzeige und User-Interaktion.
- Netzwerk-Thread: `ApiRepo` benutzt einen Worker-Thread, damit die
  UI nicht friert.
- Presence-Beat: eigener Timer, alle 60 s.

## Erweiterungen

- **Docs**: dieses Docusaurus-Repo, unter `docu_boni/`
- **Portal**: `php_backend/portal/`
- **Auto-Update**: `updater.py` prueft GitHub-Releases &ndash; siehe
  [Auto-Update](./auto-update.md).

Weiter:

- [Client-Architektur](./client.md)
- [Auto-Update](./auto-update.md)
- [Bekannte Fallen](./fallen.md)
