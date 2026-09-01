---
title: Installation
sidebar_position: 2
---

# Installation eigenes Backend

## 1. Voraussetzungen pruefen

```bash
php -v         # >= 7.4
mysql -V       # MariaDB >= 10.3 oder MySQL >= 8.0
```

Empfohlene PHP-Extensions: `pdo_mysql`, `json`, `mbstring`, `curl`,
`openssl`.

## 2. Verzeichnis anlegen

```bash
mkdir -p /var/www/vertragsboard
cd /var/www/vertragsboard
git clone https://github.com/nicigrv/vertragsboard.git .
# Nur den php_backend Ordner brauchen wir:
cp -r php_backend/. .
rm -rf .git
```

Oder direkt aus dem Release-Zip `vertragsboard-backend-<version>.zip`
entpacken.

## 3. Datenbank vorbereiten

```sql
CREATE DATABASE vertragsboard
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER 'vertragsboard'@'localhost'
  IDENTIFIED BY 'SICHERES_PASSWORT';

GRANT ALL PRIVILEGES ON vertragsboard.* TO 'vertragsboard'@'localhost';
FLUSH PRIVILEGES;
```

Schema einspielen:

```bash
mysql -u vertragsboard -p vertragsboard < schema.sql
```

## 4. `config.php` erstellen

```bash
cp config.example.php config.php
chmod 640 config.php
```

Editieren:

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'vertragsboard');
define('DB_USER', 'vertragsboard');
define('DB_PASS', 'SICHERES_PASSWORT');

define('PRESENCE_STALE_SECONDS', 300);
define('CORS_ORIGIN', '*'); // oder eigene Domain
```

Siehe [Konfiguration](./konfiguration.md) fuer alle Optionen.

## 5. Webserver konfigurieren

### Apache

```apache
<VirtualHost *:443>
    ServerName backend.example.com
    DocumentRoot /var/www/vertragsboard

    <Directory /var/www/vertragsboard>
        AllowOverride All
        Require all granted
    </Directory>

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/backend.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/backend.example.com/privkey.pem
</VirtualHost>
```

### nginx

```nginx
server {
    listen 443 ssl http2;
    server_name backend.example.com;
    root /var/www/vertragsboard;
    index api.php;

    ssl_certificate     /etc/letsencrypt/live/backend.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/backend.example.com/privkey.pem;

    location / {
        try_files $uri /api.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    }

    location ~ /\.(?!well-known) { deny all; }
}
```

## 6. Erst-Verbindung testen

Vom eigenen PC aus:

```bash
curl -sSf https://backend.example.com/api.php?action=ping
```

Erwartete Antwort:

```json
{"ok":true,"version":"1.2.0"}
```

## 7. Ersten Space anlegen

Zwei Wege:

- **Ueber Web-Admin-Portal** &ndash; siehe [Portal-Installation](../portal/installation.md).
- **Direkt per SQL:**
  ```sql
  INSERT INTO vb_spaces (space_id, name) VALUES ('meintraeger', 'Mein Traeger');
  INSERT INTO vb_users (space_id, kuerzel, name, pw_hash, role)
    VALUES ('meintraeger', 'ADM', 'Administrator',
            '<bcrypt-hash>', 'admin');
  ```
  Bcrypt-Hash erzeugen: `php -r "echo password_hash('MeinPasswort', PASSWORD_BCRYPT);"`

## 8. Client verbinden

- Setup-Wizard &rarr; "Eigener Server" &rarr; URL + Space-ID +
  Kuerzel/Passwort eingeben.
- Bei erfolgreicher Anmeldung sind alle Preset-Steps geladen.
