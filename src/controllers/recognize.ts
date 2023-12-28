import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { recognize } from '../utils/ocr'

export default function ocrController (
  app: FastifyInstance,
  _options: unknown,
  done: () => void
): void {
  app.post('/recognize', async (req: FastifyRequest, reply: FastifyReply) => {
    // read the file from the request
    const data = await req.file()
    if (data === undefined) {
      return await reply.code(400).send({
        error: 'Bad Request',
        message: 'No file uploaded'
      })
    }

    // convert the file to buffer
    let buffer: Buffer
    try {
      buffer = await data.toBuffer()
    } catch (err) {
      return await reply.code(400).send({
        error: 'Bad Request',
        message: 'File size exceeded the limit of 5MB'
      })
    }

    // recognize the text
    const text = await recognize('eng', buffer)

    // send the response
    return await reply.code(200).send({
      message: 'Image to text conversion completed',
      data: {
        text
      }
    })
  })

  done()
}
