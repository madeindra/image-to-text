import { createWorker } from 'tesseract.js'

// do ocr with worker
export async function recognize (lang: string, image: string | Buffer): Promise<string> {
  // create worker
  const worker = await createWorker(lang)

  // recognize the text from the image
  const { data: { text } } = await worker.recognize(image)

  // for single image, it should be safe to terminate the worker
  await worker.terminate()

  // return the recognized text
  return text
}
