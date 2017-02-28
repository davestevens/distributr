# Distributr

Manage your enterprise/development apps.

Creates a sturcture to allow management of Apps with the ability to assign password protected segments to Apps to give a user group access to many Apps.

Builds download links based on the App type, Android returns the uploaded version which can then be installed, iOS uses `itms-services` and auto-generates a plist with IPA download. (NB: Must be run using TLS).

Two views are available;
The default view is the Segment view, this lists available Apps and allows downloading.
`/admin` runs an [admin-on-rest](https://github.com/marmelab/admin-on-rest) view which allows management of all data.

## Setup

1. Copy `.env.example` to `.env`, update values.
2. Copy `config/config.json.example` to `config/config.json`, update database options.
3. Migrate database `npm run migrate`.
4. Seed database `npm run seed`. Creates a User (user@example.com:password).

## Running

### Development

```npm run migrate```
```npm start```

### Production

```NODE_ENV=production npm run migrate```
```NODE_ENV=production npm start```

NB: You can use an [ngrok](https://ngrok.com/) tunnel to allow downloading of iOS applications.

## Test

`npm test`

## API

### Segments

| Route                  | Method | Description                                                       |
| ---------------------- + ------ + ----------------------------------------------------------------- |
| /api/segments/session  | POST   | Log in as a `Segment`. `{ username: String, passphrase: String }` |
| /api/segments/apps     | GET    | Lists available Apps.                                             |
| /api/segments/apps/:id | GET    | Shows App.                                                        |

### Admin

| Route                  | Method | Description                                                |
| ---------------------- + ------ + ---------------------------------------------------------- |
| /api/admin/session     | POST   | Log in as an `User`. `{ email: String, password: String }` |

Includes CRUD for all Models (`App`:/api/admin/apps, `AppSegment`:/api/admin/app-segments, `Segment`:/api/admin/segments, `User`/api/admin/users, `Version`/api/admin/versions) using [Epilogue](https://github.com/dchester/epilogue).
