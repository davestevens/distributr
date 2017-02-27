# Distributr

Manage your enterprise/development apps.

## Setup

1. Copy `.env.example` to `.env`, update values.
2. Copy `config/config.json.example` to `config/config.json`, update values.

## Running

`npm start`

## Test

`npm test`

## API

### Segments

| Route                  | Method | Description                                                       |
| ---------------------- + ------ + ----------------------------------------------------------------- |
| /api/segments/session  | POST   | Log in as a `Segment`. `{ username: String, passphrase: String }` |
| /api/segments/apps     | GET    | Lists available Apps.                                             |
| /api/segments/apps/:id | GET    | Shows App.                                                        |
