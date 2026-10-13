import { makeRequest } from './makeRequest'

describe('makeRequest', () => {
  test('Should ask for JSON by default', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({}))

    await makeRequest('/devices')

    expect(fetchSpy).toHaveBeenCalledWith('/devices', { headers: { Accept: 'application/json' } })
  })

  test('Should pass options and extra headers through', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({}))

    await makeRequest('/devices', { method: 'POST', headers: { 'X-Trace': '1' } })

    expect(fetchSpy).toHaveBeenCalledWith('/devices', {
      method: 'POST',
      headers: { Accept: 'application/json', 'X-Trace': '1' },
    })
  })

  test('Should resolve with the response', async () => {
    const response = Response.json({ devices: [] })
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(response)

    await expect(makeRequest('/devices')).resolves.toBe(response)
  })
})
