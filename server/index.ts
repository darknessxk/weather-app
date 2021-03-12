import next from 'next'
import Koa from 'koa'
import Router from 'koa-router'
import bodyparser from 'koa-bodyparser'
import compress from 'koa-compress'
import convert from 'koa-convert'
import cors from 'koa-cors'
import logger from 'koa-logger'
import http from 'http'
import http2 from 'http2'
import fs from 'fs'
import dotenv from 'dotenv'
import path from 'path'
import {PHASE_DEVELOPMENT_SERVER} from 'next/constants'

if (process.argv.length < 2) {
    console.log('Missing arguments');
    process.exit(1);
}

dotenv.config();

const mainFunction = async () => {
    console.log('Starting main server...');

    const customServer = true;
    const port = parseInt(process.env.DEFAULT_PORT || "80", 10);
    const securePort = parseInt(process.env.SECURE_PORT || "443", 10);
    const dev = process.env.NODE_ENV !== 'production';
    const dir = process.argv[2];

    const devConfig = async () => {
        const fn = (await import(path.join(__dirname, '..', 'next.config.js'))).default;
        return fn(PHASE_DEVELOPMENT_SERVER, {});
    }

    const conf = {...dev ? await devConfig() : {}};

    console.log('Initializing next');
    const app = next({
        customServer,
        dev,
        dir,
        conf
    });

    console.log('Preparing next\'s request handler');
    const handle = app.getRequestHandler()

    console.log('Next is preparing application...');
    app.prepare()
        .then(() => {
            console.log('Next application is ready');
            try {
                console.log('Initializing Koa');
                const application = new Koa();
                const router = new Router();

                // logger
                application.use(async (ctx, next) => {
                    await next();
                    const rt = ctx.response.get('X-Response-Time');
                    console.log(`${ctx.method} ${ctx.url} - ${rt}ms`);
                });

                // x-response-time
                application.use(async (ctx, next) => {
                    const start = Date.now();
                    await next();
                    const ms = Date.now() - start;
                    ctx.set('X-Response-Time', `${ms}ms`);
                });

                router.all('(.*)', async (ctx) => {
                    await handle(ctx.req, ctx.res);
                    ctx.respond = false;
                });

                application.use(async (ctx, next) => {
                    ctx.res.statusCode = 200;
                    await next();
                });

                application.use(router.routes());

                application.use(compress({threshold: 2048}));
                application.use(convert(cors()));
                application.use(bodyparser());
                application.use(convert(logger()));
                application.use(router.routes());

                http.createServer({}, application.callback())
                    .listen(port,
                        () => {
                            console.log(`HTTP/1.1 non secure server is listening to: ${port}`)
                        }
                    )

                http2.createSecureServer({
                    key: fs.readFileSync(process.env.SERVER_CRT_KEY || ''),
                    cert: fs.readFileSync(process.env.SERVER_CRT_PEM || ''),
                    allowHTTP1: true,
                    minVersion: "TLSv1.2"
                }, application.callback()).listen(securePort, () => {
                    console.log(`HTTP/2 secure server is listening to: ${securePort}`)
                })

                return application;
            } catch (e) {
                console.error(e);
            }
        })
};

mainFunction().then().catch(console.error);
