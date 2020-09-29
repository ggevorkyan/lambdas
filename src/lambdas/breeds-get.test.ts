import fetch from 'node-fetch'
import { handler } from './breeds-get'

const mockedFetch: jest.Mock = fetch as any

jest.mock('node-fetch')

describe('breeds-get handler mock test', () => {
  const mockPayload = {
    message: {
      affenpinscher: [],
      australian: ['shepherd'],
      buhund: ['norwegian'],
    },
  }
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockPayload
      },
    })
  })

  it('returns payload from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({
      body: ['affenpinscher', 'australian shepherd', 'buhund norwegian'],
    })
  })
})

describe('breeds-get handler timeout test', () => {
  const mockPayload = {
    message: {
      affenpinscher: [],
      australian: ['shepherd'],
      buhund: ['norwegian'],
    },
  }
  beforeEach(() => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        setTimeout(() => { }, 1000)
        return mockPayload
      },
    })
  })

  it('times out from fetch request', async () => {
    const response = await handler()
    expect(response).toMatchObject({ statusCode: 200, body: {} })
  }, 500)
})
