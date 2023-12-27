// import modules
import fastify from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'

// import controllers
import ocrController from './controllers/ocrController'

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

  // register routes
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
