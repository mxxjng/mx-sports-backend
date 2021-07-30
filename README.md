<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://i.imgur.com/Tk2c1Xf.png" width="320" alt="Nest Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

copy env.example to .env and customize

## Setting up the Database

```bash
$ docker-compose up
```

## Migrating the Database

```bash
# run migration
$ npm run prisma:migrate

# generate prisma client
$ npx prisma generate
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
