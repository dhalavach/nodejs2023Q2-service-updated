# Home Library Service - Prisma, Postgres, and Docker (part 2)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js LTS version](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## Downloading

```
git clone git@github.com:dhalavach/nodejs2023Q2-service.git
```

switch to prisma-docker branch:

```
git checkout prisma-docker
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

### Environment variable

Please have .env file in the app folder with the environment variables as specified in the .env.example (or simply use the included .env file)

### Docker

download, install, and launch Docker

### Docker Hub

the images are available on Docker Hub. Please search for kopfmann/homelibservice-app and kopfmann/homelibservice-db . To test the app using Docker Hub images, pull the images and start the containers by running:

```
npm run docker:pull
```

then, open repo folder in terminal, install dependencies if you have not already and run

```
npm run test
```

### Vulnerabilities scan

After you have built the images with npm run docker:build
you can scan them for vulnerabiities and recommendations using Docker Scout. Run

```
npm run docker:scan
```

### Building images

To build images yourself,first stop the containers you have pulled and started (so that port 5000 is free). Then run:

```
npm run docker:build

```

After starting the app on port (5000 by default) you can open a separate terminal window and run the tests

## Testing

After installing the dependencies, pulling or building the images, and starting the containers, open new terminal and run:

```
npm run test
```

Occasionally, the app takes some time to start inside the docker container, please wait a little if you encounter "socket hang up" error during tests (you can check the container's log in docker desktop to make sure that the app has started)

### Live reload

The app inside the docker container reloads automatically after changes in your local src folder (try changing console.log statement inside track.service.ts)

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

if you have any questions please contact me at halavach@protonmail.com or RS School Discord (@dhalavach). Cheers!

### API Description

after cloning the repository and pulling/building docker images and starting the application, the API can be tested using Postman or analogous tool. By default, the app runs on 5000 port (for example, http://localhost:5000/user) but it can be customized in the .env file

The API has the following endpoints:

### /user

| Method |  Endpoint  |                         Description |
|--------|:----------:|------------------------------------:|
| GET	   |   /user    |                   Get all the users |
| GET    | 	/user/:id |            	Get a single user by ID |
| POST   |   	/user   |  	Create a new user in the database |
| PUT    | 	/user/:id |                	Update a user by ID |
| DELETE | 	/user/:id |                	Delete a user by ID |


### /track

| Method |  Endpoint   |                          Description |
|--------|:-----------:|-------------------------------------:|
| GET	   |   /track    |                       Get all tracks |
| GET    | 	/track/:id |            	Get a single track by ID |
| POST   |   	/track   |  	Create a new track in the database |
| PUT    | 	/track/:id |                	Update a track by ID |
| DELETE | 	/track/:id |                	Delete a track by ID |

### /album

| Method |  Endpoint   |                          Description |
|--------|:-----------:|-------------------------------------:|
| GET	   |   /album    |                        Get all albums |
| GET    | 	/album/:id |            	Get a single album by ID |
| POST   |   	/album   |  	Create a new album in the database |
| PUT    | 	/album/:id |                	Update a album by ID |
| DELETE | 	/album/:id |                	Delete a album by ID |

### /artist

| Method |   Endpoint   |                           Description |
|--------|:------------:|--------------------------------------:|
| GET	   |   /artist    |                       Get all artists |
| GET    | 	/artist/:id |            	Get a single artist by ID |
| POST   |   	/artist   |  	Create a new artist in the database |
| PUT    | 	/artist/:id |                	Update a artist by ID |
| DELETE | 	/artist/:id |                	Delete a artist by ID |

### /favs

| Method |     Endpoint      |                                  Description |
|--------|:-----------------:|---------------------------------------------:|
| GET	   |       /favs       |                           Get all favorites  |
| GET    | 	/favs/track/:id  |     	Get a single track from favorites by ID |
| GET    | 	/favs/album/:id  |     	Get a single album from favorites by ID |
| GET    | 	/favs/artist/:id |     Get a single artist from favorites by ID |
| POST   | 	/favs/track/:id  |   Add new track to favorites in the database |
| POST   | 	/favs/album/:id  |   Add new album to favorites in the database |
| POST   | 	/favs/artist/:id | 	Add new artist to favorites in the database |
| DELETE | 	/favs/track/:id  |         	Delete a track by ID from favorites |
| DELETE | 	/favs/album/:id  |         	Delete a album by ID from favorites |
| DELETE | 	/favs/artist/:id |         Delete a artist by ID from favorites |


## Response examples

**GET /users

```json
[
  {
    "id": "62a13ccf-6de5-46ae-81dd-81a81301071d",
    "login": "login",
    "version": 1,
    "createdAt": 134312412342134,
    "updatedAt": 8410072081506
  },
  {
    "id": "2d2f65be-73af-40d2-842e-4514fc86c664",
    "login": "loeegin",
    "version": 2,
    "createdAt": 1710072083360,
    "updatedAt": 1710072913111
  },
  {
    "id": "9fcd76d7-4d5b-45a0-9937-0b7cc9007e52",
    "login": "loeegin",
    "version": 1,
    "createdAt": 1710072084156,
    "updatedAt": 1710072084156
  },
  {
    "id": "0d411947-0d1d-495d-aa64-04fe4a9e0549",
    "login": "loeegin",
    "version": 1,
    "createdAt": 1710072084910,
    "updatedAt": 1710072084910
  }
]
```

**GET /users/:id Error response when the user is not found**

```json
{
  "message": "User not found!",
  "error": "Not Found",
  "statusCode": 404
}
```

