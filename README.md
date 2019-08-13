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

## Overview

This application is made of two applications : client and server side. Both are running using Typescript, and webpack

### API

- Express
- Sequelize
- MongoDB

#### Database

MongoDB with schema modelization using Sequelize.

### Client

- Vue.js

### Testing

- jest
- ts-jest

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

### Linters & Git hooks

- tslint
- husky
- commitlint

Husky and Commitlint provide additional convention for commits.