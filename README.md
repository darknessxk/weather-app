# Weather App

> Project based into Next.js Typescript template created by darknessxk @ katsuhiro.gg



Deploy using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/darknessxk/job-evaluation-builders)

## Getting Started

In baby steps to you just install and use the project.

First of all you should run ```npm install``` or ```yarn install``` depending on your package manager preference

After that you simply run ```npm run dev``` or  ```yarn dev``` wait for the complete initialization you will see a few messages like this output

```log
[nodemon] 2.0.7
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): server/**/*
[nodemon] watching extensions: js,ts
[nodemon] starting `ts-node --project tsconfig.server.json server/index.ts`
Starting main server...
Loading next configuration...
Development mode
Initializing next
Preparing next's request handler
Next is preparing application...
info  - Loaded env from /home/darknessxk/Sources/BuildersTest/.env
event - compiled successfully
Development mode
Next application is ready
Initializing Koa
HTTP/1.1 non secure server is listening to: 3000
HTTP/2 secure server is listening to: 3001
```

After you see `Listening to: [port number]` you will be able to navigate to the server pages




## Environment

There are a few files `.env.example` and `.env.local.example` that you can as your base env files

Currently we use only 2 required env variables



Meaning: 

**\*** Means required



File **.env.local**

Variables

* WEATHER_API (OpenWeather API Token) *
* NEXT_PUBLIC_GOOGLE_MAPS_API (Google Maps Places API) *



File **.env**

Variables

* DEFAULT_PORT (HTTP Port)
* SECURE_PORT (HTTP/2 Secure port)
* SERVER_CRT_KEY (Path to server certificate REQUIRED for secure port)
* SERVER_CRT_PEM (Path to server pem certificate REQUIRED for secure port)