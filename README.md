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

- Build images and start containers. Run

```
docker compose up app -d --build

```

- Occasionally, the app takes some time to start insided the docker container, please wait a little if you encounter "socket hang up" error during tests (you can check the container's log in docker desktop to make sure that the app has started).

### Prisma - optional - only if you encounter errors

- after starting the container, generate PrismaClient for Linux inside the container:

```
docker-compose -f docker-compose.yml exec app npx prisma generate
```

Then run

```
docker-compose -f docker-compose.yml exec app npx prisma migrate dev

```

- if necessary, reset the database:

```
docker-compose -f docker-compose.yml exec app npx prisma migrate reset

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

- Occasionally, the app takes some time to start insided the docker container, please wait a little if you encounter "socket hang up" error during tests (you can check the container's log in docker desktop to make sure that the app has started)

### Auto-fix and format

- Please ignore eslint warnings, for now

```
npm run lint
```

```
npm run format
```

-- if you have any questions please contact me at halavach@protonmail.com or Discord (@dhalavach)

### Docker Hub

--- the images are available on Docker Hub. Please search for kopfmann/kopfmann/nodejs2023q2-service-app and kopfmann/nodejs2023q2-service-postgres
--- Please use the images you have built for testing, Docker Hub upload is only to fulfil the task requirement, I have not tested them

### Vulnerabilities scan

-- After you have built the images with docker compose up app -d --build
you can scan them for vulnerabiities and recommendations using Docker Scout. Run

```
npm run docker:scan
```
