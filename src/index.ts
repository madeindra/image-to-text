// import modules
import fastify from 'fastify'

// import utilities
import { getHost, getPort } from './utils/env'

const app = fastify({ logger: true })

// initialize fastify with plugins
async function init (): Promise<void> {
  app.get('/', (_request, reply) => {
    return reply.send({ status: 'ok' })
  })

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
