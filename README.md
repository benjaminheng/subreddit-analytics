# Subreddit Analytics

Data visualization for the /r/Singapore subreddit.

In progress.

## Setup

**Install prerequisites**

- [Node.js 4.x](https://nodejs.org/en/)

**Install necessary packages**

```
$ npm install
```

## Usage

##### `npm run start`

> Runs the server. If `NODE_ENV=production` is not set, the server is run in development mode.

##### `npm run start:dev`

> Same as `npm run start` but also enables nodemon for automatic reloading of the server when server files are changed. This is the recommended mode for development.

##### `npm run build`

> Bundles source files into the `dist/static/` directory.

##### `npm run test`

> Runs the unit tests.