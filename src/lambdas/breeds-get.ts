import fetch from 'node-fetch'
import { Response } from './types'

interface BreedResponse extends Response {
  body: Array<string>
}

interface DogBreed {
  message: Array<[string, Array<string>]>
  status: string
}

export async function handler(): Promise<BreedResponse> {
  const res = await fetch('https://dog.ceo/api/breeds/list/all')
  const payload: DogBreed = await res.json()
  const lst: Array<string> = []
  Object.entries(payload.message).forEach(([breed, subBreedArr]) => {
    if (subBreedArr.length > 0) subBreedArr.forEach(subBreed => lst.push(`${breed} ${subBreed}`))
    else lst.push(breed)
  })
  return {
    statusCode: 200,
    body: lst,
  }
}
