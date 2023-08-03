# Home Library Service - Prisma, Postgres, and Docker (part 2)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js LTS version](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

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
npm run docker

```


After starting the app on port (5000 by default) you can open a separate terminal window and run the tests

## Testing

After installing the dependencies, building the images, and starting the containers, open new terminal and run:

```
npm run test
```

- Occasionally, the app takes some time to start inside the docker container, please wait a little if you encounter "socket hang up" error during tests (you can check the container's log in docker desktop to make sure that the app has started)

### Linter

- To check for warnings and errors run

```
npm run lint
```

- NB: false positive eslint warning with nest are a known bug, no-unused-vars gives an unneccessary warning in nest constructors


### Docker Hub

--- the images are available on Docker Hub. Please search for kopfmann/kopfmann/nodejs2023q2-service-app and kopfmann/nodejs2023q2-service-postgres
--- Please use the images you have built for testing, Docker Hub upload is only to fulfil the task requirement, I have not tested them

### Vulnerabilities scan

-- After you have built the images with docker compose up app -d --build
you can scan them for vulnerabiities and recommendations using Docker Scout. Run

```
npm run docker:scan
```


-- if you have any questions please contact me at halavach@protonmail.com or RS School Node.js Discord (@dhalavach). Cheers!
