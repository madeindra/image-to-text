// import modules
import fastify from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifyStatic } from '@fastify/static'
import { fastifyView } from '@fastify/view'
import { Eta } from 'eta'
import path from 'path'

// import controllers
import homepageController from './controllers/homepage'
import ocrController from './controllers/recognize'

// import utilities
import { getHost, getPort } from './utils/env'

const app = fastify({ logger: true })

// initialize fastify with plugins
async function init (): Promise<void> {
  // register plugins
  await app.register(fastifyMultipart, {
    limits: {
      files: 1, // limit to 1 file
      fileSize: 1024 * 1024 * 5 // limit size to 5 MB
    }
  })

  // register static files for homepage assets
  await app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/'
  })

  // register template engine
  await app.register(fastifyView, {
    // eslint-disable-next-line
    engine: { eta: new Eta() },
    templates: path.join(__dirname, '../templates')
  })

  // register routes
  await app.register(homepageController)
  await app.register(ocrController)

  await app.ready()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init()

// start the server
async function start (): Promise<void> {
  try {
    await app.listen({ port: getPort(), host: getHost() })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()
