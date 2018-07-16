# Node Skeleton

A boilerplate to help start Node.js projects quickly and effectively. Packaged with Typescript, Docker, PM2, Eslint, VSCode config, Winston, etc.

## Deployment instructions

### Normal Installation

1. Install node.js and git
2. Add them to path if not already in path.
3. Install typescript globally with `npm install typescript -g`
4. Run npm install to get all the dependencies installed
5. cd to the project directory and run tsc to build using typescript
6. Run `npm run-script start-dev`

### Running with Docker

1. Install Docker and Docker Compose
2. Run `docker-compose up` to get the containers installed and started.

### Running via PM2

1. Install node.js and pm2
2. Run `pm2 start pm2-dev.json` to start the development cluster

## Building the code

1. Run `npm run build` to build the typescript code, copy relevant files

## Logging Middleware

Winston logging can be added by using the winston library.
`logger.log('error', 'Internal server error - ' + err.stack, err);`

### Contributors

1. <a href="https://github.com/tvvignesh">Vignesh T.V.</a>

### License

MIT