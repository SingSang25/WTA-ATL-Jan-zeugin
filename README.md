# Backend für den Blog

Mit diesem Projekt wird ein Backend für einen Blog erstellt. Es wird eine REST-API bereitgestellt, um Blog-Posts zu erstellen, zu bearbeiten und zu löschen. Die Daten werden in einer MongoDB-Datenbank gespeichert.

## Einsatzbereich

Dieses Projekt ist für die Verwendung in einem Blog vorgesehen. Es kann als Backend für ein Blog-Frontend verwendet werden. Es kann auch als Backend für eine Blog-App verwendet werden.

## Installation

1. Repository klonen
2. `npm install` ausführen
3. `docker compose up -d` ausführen, um die Datenbank zu erstellen (Docker muss installiert sein)
4. Generiere die secrets mit dem Powershell-Skript `./generate-secrets.ps1` oder `./generate-secrets.sh`

## Starten

1. Datenbank starten mit `docker compose up -d`
2. `npm run dev` ausführen
3. Die API kann unter `http://localhost:3000/` erreicht werden
4. Der default User ist `admin@localhost.ch` mit dem Passwort `admin`
5. Ändere der default Account sein Passwort (Über das Frontend)
6. Das Frontend kann nun gestartet werden

## API

### Index

- `GET /` - Gibt ein `I'm alive!` zurück

### Authentifizierung

- `POST /auth/login` - Loggt den Benutzer ein
- `POST /auth/register` - Registriert einen neuen Benutzer

### User

- `GET /user` - Gibt alle Benutzer zurück
- `GET /user/:id` - Gibt einen Benutzer zurück
- `POST /user` - Erstellt einen neuen Benutzer
- `PUT /user/:id` - Aktualisiert einen Benutzer
- `DELETE /user/:id` - Löscht einen Benutzer

### Post

- `GET /post` - Gibt alle Posts zurück
- `GET /post/:id` - Gibt einen Post zurück
- `POST /post` - Erstellt einen neuen Post
- `PUT /post/:id` - Aktualisiert einen Post
- `DELETE /post/:id` - Löscht einen Post

### Kommentare

- `GET /comment/:blogId/` - Gibt alle Kommentare zurück
- `POST /comment/:blogId/` - Erstellt einen neuen Kommentar
- `PUT /comment/:blogId/:id` - Aktualisiert einen Kommentar
- `DELETE /comment/:blogId/:id` - Löscht einen Kommentar

## Das Frontend

Das Frontend für diesen Blog kann [hier](https://github.com/SingSang25/WTA-ATL-Frontend-Jan-zeugin) gefunden werden.

## Lizenz

MIT License - siehe [LICENSE](LICENSE)
