# Home Library Service - Prisma, Postgres, and Docker (part 2)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js LTS version](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## Downloading

```
git clone git@github.com:dhalavach/nodejs2023Q2-service.git
```

switch to auth branch:

```
git checkout auth
```

## Installing node modules

Node modules are necessary for running tests. To install, run:

```
npm install
```
in the unlikely event of error during the installation process, run:

```
npm install --force
```

### Docker

download, install, and launch Docker

### Docker Hub

To build images and start containers, run:
```
npm run docker:build
```


After starting the app on port (5000 by default) you can open a separate terminal window and run the tests (please make sure that nothing else is running on port 5000 - other container or some app, such as Mac Os Control Center which often uses this port)

## Testing

After installing the dependencies, pulling or building the images, and starting the containers, open new terminal and run:

```
npm run test:auth
```

ATTENTION: Occasionally, the app takes some time to start inside the docker container, please wait if you encounter "socket hang up" error during tests (you can check the container's log in docker desktop to make sure that the app has started). However, if you are on M1 Mac, system and Docker restart might be requirered to fix this error. A variation of this error is when "Favorites" tests fail - it also means that the app has not fully started insided the container. Simply wait a little and all tests will pass! 


### Linter

To check for warnings and errors run

```
npm run lint
```

NB: false positive eslint warning with nest are a known bug, no-unused-vars gives an unneccessary warning in nest constructors

### Errors

if you encounter errors, consider pruning the system and then pull or build images again

```
docker system prune -a --volumes
```

WARNING: this will delete your unused images/containers and networks! run the command above only if you know what you are doing

if you have any questions please contact me at halavach@protonmail.com or RS School Node.js Discord (@dhalavach). Cheers!
