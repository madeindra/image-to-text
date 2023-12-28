import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest
} from 'fastify'

export default function homepageController (
  fastify: FastifyInstance,
  _options: unknown,
  done: () => void
): void {
  fastify.get('/', async (_req: FastifyRequest, reply: FastifyReply) => {
    // set template file name
    const templateFile = 'index.ejs'

    // send index.ejs
    return await reply.view(templateFile)
  })

  done()
}
