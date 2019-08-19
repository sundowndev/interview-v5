# interview-v5

[![Build Status](https://img.shields.io/travis/sundowndev/interview-v5/master.svg?style=flat-square)](https://travis-ci.org/sundowndev/interview-v5)

Another technical interview. Read [CdCF.md](CdCF.md) (FR).

## Usage

```
npm install # install main dev dependencies (lerna, tsc ...)
npm run bootstrap # Install local packages dependencies
npm run build # Build applications
npm run test:coverage # Run tests and collect coverage from files
```

Run everything inside containers :

```
docker-compose -f ./support/docker/docker-compose.test.yml up -d --build
# Or...
docker-compose -f ./support/docker/docker-compose.yml up -d --build
```

## Overview

This application is made of two applications : client and server side. Both were built with Typescript.

```shell
$ tree . -d -I 'node_modules'  
.
├── docs
│   └── api
├── packages
│   ├── client
│   │   ├── public
│   │   └── src
│   │       ├── components
│   │       ├── static
│   │       ├── __tests__
│   │       └── views
│   └── server
│       └── src
│           ├── controllers
│           ├── entity
│           ├── middlewares
│           ├── response
│           ├── routes
│           ├── __tests__
│           │   └── fixtures
│           ├── types
│           ├── utils
│           └── validators
└── support
    └── docker

32 directories
```

### API

- Express
- TypeORM
- MongoDB

#### Database

MongoDB with schema modelization using TypeORM.

### Client

- Vue.js
- Vuex
- Axios
- Webpack

### Testing

- jest
- ts-jest

### Linters & Git hooks

- tslint (typescript linter)
- husky (git hook)
- commitlint (commit linter)

### Continuous Integration

Travis configuration, that runs lint, build then test scripts for each application :

```
language: node_js
dist: trusty
os: linux

node_js:
  - '8'
  - '10'
  - '11'

stages:
  - lint
  - build
  - test
```

See [Travis dashboard](https://circleci.com/gh/sundowndev/interview-v5/tree/master).
