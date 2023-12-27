// import modules
import fastify from 'fastify'
import { fastifyMultipart } from '@fastify/multipart'

// import utilities
import { getHost, getPort } from './utils/env'

const app = fastify({ logger: true })

// initialize fastify with plugins
async function init (): Promise<void> {
  await app.register(fastifyMultipart, {
    limits: {
      files: 1, // limit to 1 file
      fileSize: 1024 * 1024 * 5 // limit size to 5 MB
    }
  })

  await app.ready()
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init()

// routes definition
app.get('/', (_request, reply) => {
  return reply.send({ status: 'ok' })
})

app.post('/', async (req, reply) => {
  const data = await req.file()
  if (data === undefined) {
    return await reply.send({ status: 'error', message: 'No file uploaded' })
  }

  try {
    const buffer = await data.toBuffer()
    return await reply.send({ buffer })
  } catch (err) {
    return await reply.send({ status: 'error', message: 'File size exceeded the limit of 5MB' })
  }
})

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
