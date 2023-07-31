# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:dhalavach/nodejs2023Q2-service.git
```

## Switch to task1 branch

```
git checkout task1
```

### Create .env

- rename .env.example to .env

## Installing NPM modules

```
npm install
```

- in case of error during the installation of NPM modules please run

```
npm install --force
```

## Running application

```
npm start
```

After starting the app on port (5000 as default) you can test the app

## Testing~

- After running npm start, open a new terminal to run tests

- To run all tests

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Swagger

- open in browser http://localhost:5000/doc/
- replace 5000 in the address above with your .env port, if necessary
