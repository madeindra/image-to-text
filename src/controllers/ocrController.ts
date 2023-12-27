import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { createWorker } from 'tesseract.js'

export default function ocrController (
  app: FastifyInstance,
  options: unknown,
  done: () => void
): void {
  app.post(
    '/recognize',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const data = await req.file()
      if (data === undefined) {
        return await reply.code(400).send({
          error: 'Bad Request',
          message: 'No file uploaded'
        })
      }

      let buffer: Buffer
      try {
        buffer = await data.toBuffer()
      } catch (err) {
        return await reply.code(400).send({
          error: 'Bad Request',
          message: 'File size exceeded the limit of 5MB'
        })
      }

      const worker = await createWorker('eng')
      const { data: { text } } = await worker.recognize(buffer)
      await worker.terminate()

      return await reply.code(200).send({
        message: 'Recognized text successfully',
        data: {
          text
        }
      })
    }
  )

  done()
}
