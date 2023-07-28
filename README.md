# Home Library Service - Prisma, Docker, and Postgres (part 2)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker

## Downloading

```
git clone git@github.com:dhalavach/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

- in the unlikely event of error during the installation process, run:

```
npm install --force
```

### Docker

- download, install, and launch Docker

- run

```
docker compose up app -d

```

### Prisma

- run

```
npx prisma generate
npx prisma migrate dev

```

- if necessary, reset the database:

```
npx prisma migrate reset

```

## Running application

```
npm start
```

After starting the app on port (5000 by default) you can open a separate terminal window and run the tests

## Testing

Start the app, open new terminal and enter:

```
npm run test
```

### Auto-fix and format

- Please ignore eslint warnings, for now

```
npm run lint
```

```
npm run format
```

-- if you have any questions please contact me at halavach@protonmail.com or Discord (@dhalavach)
